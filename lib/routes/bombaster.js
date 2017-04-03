'use strict';

var makeRestRequest = require('../services/bombast-request');

module.exports = {
    create: function (options, callback) {
        if (!options) throw new Error("options is required");
        if (!options.auth) throw new Error("options.auth is required");
        if (!options.data) throw new Error("data is required");
        if (!options.data.name) throw new Error("data.name is required");
        if (!options.data.title) throw new Error("data.title is required");
        if (!options.data.description) throw new Error("data.description is required");
        if (!options.data.adminUser) throw new Error("data.adminUser is required");
        if (!options.data.adminUser.email) throw new Error("data.adminUser.email is required");
        if (!options.data.adminUser.password) throw new Error("data.adminUser.password is required");

        var reqOptions = {
            verb: "post",
            url: "/admin/bombasters/",
            data: options.data,
            auth: options.auth
        };
        makeRestRequest(reqOptions, callback);
    },
    getBombasters: function (options, callback) {
        var url = "/admin/bombasters";
        options.verb = "get";

        if (options.query) {
            url = url + "?" + options.query;
        }
        options.url = url;
        makeRestRequest(options, callback);
    }
};