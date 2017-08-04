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
