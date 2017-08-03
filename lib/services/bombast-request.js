'use strict';

var request = require('request');
var async = require('async');

var _baseUrl = null;
var _environment = process.env.NODE_ENV || 'development';

if (process.env.BOMBAST_BASE_URL) {
    _baseUrl = process.env.BOMBAST_BASE_URL;
} else {
    if (_environment === 'development') {
        _baseUrl = 'http://localhost:1338';
    } else if (_environment === 'qa') {
        _baseUrl = 'http://bombast-api-qa.encentivize.co.za';
    } else {
        _baseUrl = 'https://api.bombast.me';
    }
}

module.exports = callBombastApi;

function callBombastApi(options, callback) {
    options.verb = options.verb.toUpperCase();

    var requestOptions = {
        method: options.verb,
        headers: {
            'Content-Type': 'application/json'
        },
        json: true,
        gzip: true
    };

    if (options.socketPool) {
        requestOptions.pool = options.socketPool;
    }

    var username = (options.auth ? options.auth.username : null) || options.username || (options.auth ? options.auth.user : null) || options.user;
    var password = (options.auth ? options.auth.password : null) || options.password || (options.auth ? options.auth.pass : null) || options.pass;
    if (username && password) {
        requestOptions.auth = {
            user: username,
            pass: password
        };
    } else {
        if (options.token) {
            requestOptions.headers.externalauthtoken = options.token;
            requestOptions.auth = {
                user: options.token,
                pass: 'xxxxxx'
            };
        } else {
            // make this an async error
            throw new Error('Invalid auth credentials, username (' + username + ') & password (' + password + ') must both have a value or a token (' + options.token + ') must be provided');
        }
    }

    if (options.data) {
        requestOptions.body = options.data;
    }

    requestOptions.url = _baseUrl + parseUrl(options.url, options);

    async.retry({
            times: 5,
            interval: function (retryCount) {
                return 500 * Math.pow(2, retryCount);
            }
        },
        async.apply(retryableCallApi, requestOptions, options),
        async.apply(apiCallComplete, requestOptions, options, callback));
}

function retryableCallApi(requestOptions, options, callback) {
    var alwaysRetryableStatusCodes = [502, 503, 504];
    var retryableVerbs = ['GET', 'PUT'];
    try {
        request[options.verb.toLowerCase()](requestOptions, function (error, response, body) {
            var result = {
                error: error,
                response: response,
                body: body
            };
            if (response && alwaysRetryableStatusCodes.indexOf(response.statusCode) >= 0) {
                console.warn(response.statusCode + ' error while attempting to call bombast, retrying. Response body : ' + JSON.stringify(body));
                return callback(result);
            }
            if (error || response.statusCode === 500) {
                if (retryableVerbs.indexOf(options.verb) >= 0) {
                    if (error) {
                        console.warn('Error on bombast call, retrying. Error : ' + error.message);
                    } else {
                        console.warn('500 error on bombast call, retrying. Response body : ' + JSON.stringify(body));
                    }
                    return callback(result);
                }
            }
            return callback(null, result);
        });
    } catch (error) {
        //this error is before a connection is made, normally had to do with incorrectly formatted requests.
        var result = {
            error: error,
            response: null,
            body: null
        };
        return callback(null, result);
    }
}

function apiCallComplete(requestOptions, options, callback, error, result) {
    if (error) {
        if (error.message && error.stack) {
            return callback('Error with request object : ' + options.verb + ' : ' + requestOptions.url + ' : ' + error.message + ' .' + error.stack);
        }
        result = {
            error: error.error,
            response: error.response,
            body: error.body
        };
    }
    if (result.error) {
        return callback('Error connecting to api : ' + options.verb + ' : ' + requestOptions.url + ' : ' + result.error.message + ' .' + result.error.stack);
    }
    return parseResult(result.response, result.body, async.apply(responseParsed, options, callback));
}

function responseParsed(options, callback, error, jsonBody) {
    if (!error && !jsonBody && options.errorIfNoResult) {
        error = {
            message: 'Expecting body but none returned',
            status: 500
        };
    }

    return callback(error, jsonBody);
}

function parseUrl(url, options) {
    var replaceUrl = url;

    for (var property in options) {
        if (options.hasOwnProperty(property)) {
            replaceUrl = replaceUrl.replace('{' + property + '}', options[property]);
        }
    }
    return replaceUrl;
}

function parseResult(response, body, callback) {
    var code = response.statusCode;
    var jsonBody = null;
    if (typeof body === 'string' || body instanceof String) {
        try {
            jsonBody = JSON.parse(body);
        } catch (error) {
            jsonBody = {
                message: body
            };
        }
    } else {
        jsonBody = body;
    }

    if (code >= 200 && code < 300) {
        return callback(null, jsonBody);
    }

    if (jsonBody && jsonBody.message) {
        if (!jsonBody.status) {
            jsonBody.status = code;
        }
        return callback(jsonBody, jsonBody);
    }
    var error = {
        status: code,
        message: body
    };
    return callback(error, jsonBody);
}
