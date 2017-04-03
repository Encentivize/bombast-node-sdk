'use strict';

var makeRestRequest = require('../services/bombast-request');

module.exports = {
    getMasterTemplates: function (options, callback) {
        var url = "/{bombaster}/mastertemplates";
        if (options.query) {
            url = url + "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    },
    getMasterTemplate: function (options, callback) {
        var url = "/{bombaster}/mastertemplates/{masterTemplateId}";
        if (options.query) {
            url = url + "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    },
    addMasterTemplate: function (options, callback) {
        if (!options) throw new Error('options is required');
        if (!options.bombaster) throw new Error('options.bombaster is required');
        if (!options.template) throw new Error('options.template is required');
        if (!options.auth) throw new Error('options.auth is required');

        var req = {
            url: '/{bombaster}/mastertemplates',
            verb: 'post',
            auth: options.auth,
            data: options.template,
            bombaster: options.bombaster
        };
        makeRestRequest(req, callback);
    },
    updateMasterTemplate: function (options, callback) {
        var url = "/{bombaster}/mastertemplates/{masterTemplateId}";
        options.verb = "put";
        options.url = url;
        options.data = options.data;
        makeRestRequest(options, callback);
    }
};