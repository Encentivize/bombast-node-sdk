'use strict';

var makeRestRequest = require('../services/bombast-request');

module.exports = {
    getMessageTemplates: function (options, callback) {
        var url = "/{bombaster}/messagetemplates";
        if (options.query) {
            url = url + "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    },
    getMessageTemplate: function (options, callback) {
        var url = "/{bombaster}/messagetemplates/{messageTemplateId}";
        if (options.query) {
            url = url + "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    },
    sendTemplateMessage: function (options, callback) {
        var url = "/{bombaster}/messagetemplates/{messageTemplateId}/messages";
        options.verb = "post";
        options.url = url;
        options.data = options.message;
        makeRestRequest(options, callback);
    },
    addMessageTemplate: function (options, callback) {
        if (!options) throw new Error('options is required');
        if (!options.bombaster) throw new Error('options.bombaster is required');
        if (!options.template) throw new Error('options.template is required');
        if (!options.auth) throw new Error('options.auth is required');

        var req = {
            url: '/{bombaster}/messagetemplates',
            verb: 'post',
            auth: options.auth,
            data: options.template,
            bombaster: options.bombaster
        };
        makeRestRequest(req, callback);
    },
    updateMessateTemplate: function (options, callback) {
        var url = "/{bombaster}/messagetemplates/{messageTemplateId}";
        options.verb = "put";
        options.url = url;
        options.data = options.data;
        makeRestRequest(options, callback);
    }
};