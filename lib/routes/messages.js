'use strict';

var makeRestRequest = require('../services/bombast-request');

module.exports = {
    getMessages: function (options, callback) {
        var url = "/{bombaster}/messages";
        if (options.query) {
            url = url + "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    },
    getMessage: function (options, callback) {
        var url = "/{bombaster}/messages/{messageId}";
        if (options.query) {
            url = url + "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    },
    sendMessage: function (options, callback) {
        var url = "/{bombaster}/messages";
        options.data = options.message;
        options.verb = "post";
        options.url = url;
        makeRestRequest(options, callback);
    },
    addMessageStatus: function (options, callback) {
        var url = "/{bombaster}/messages/{messageId}/status/{statusName}";
        options.data = options.status;
        options.verb = "post";
        options.url = url;
        makeRestRequest(options, callback);
    },
    addMessageSMSStatus: function (options, callback) {
        var url = "/{bombaster}/messages/{messageId}/status/sms";
        options.data = options.status;
        options.verb = "post";
        options.url = url;
        makeRestRequest(options, callback);
    },
    addMessageEmailStatus: function (options, callback) {
        var url = "/{bombaster}/messages/{messageId}/status/email";
        options.data = options.status;
        options.verb = "post";
        options.url = url;
        makeRestRequest(options, callback);
    },
    reSendMessage: function (options, callback) {
        var url = "/{bombaster}/messages/{messageId}/resend";
        options.data = {};
        options.verb = "post";
        options.url = url;
        makeRestRequest(options, callback);
    },
    updateMessages: function (options, callback) {
        var url = "/{bombaster}/messages/{messageId}";
        options.verb = "put";
        options.url = url;
        options.data = options.data;
        makeRestRequest(options, callback);
    }
};