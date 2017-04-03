'use strict';

var bombaster = require('../lib/routes/bombaster');
var masterTemplates = require('../lib/routes/master-templates');
var messageTemplates = require('../lib/routes/message-templates');
var messages = require('../lib/routes/messages');

module.exports = {
    messageTemplates: messageTemplates,
    masterTemplates: masterTemplates,
    messages: messages,
    bombaster: bombaster
};

// function makeRestRequest(options, callback) {
//     if (!options.headers) {
//         options.headers = {};
//     }
//
//     if (options.token) {
//         options.headers.externalauthtoken = options.token;
//         options.auth = {
//             user: options.token,
//             password: "xxxxxx"
//         };
//     }
//     if (!options.auth && options.username && options.password) {
//         options.auth = {
//             user: options.username,
//             password: options.password
//         };
//     }
//
//     function serviceCalled(err, result, statusCode, resLocation) {
//         if (statusCode === 401 || statusCode === 403) {
//             console.error("Auth error for bombast base url " + _baseUrl + " on environment " + _environment);
//         }
//         return callback(err, result);
//     }
//
//     _restService.callRestService(options, serviceCalled);
// }

