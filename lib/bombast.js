//*********************************************************************************************************************************************************************
//requires
var _baseUrl=null;

var _environment =  process.env.NODE_ENV || 'development';
if (_environment=="development") {
    _baseUrl="http://localhost:1338";
}else if (_environment=="qa") {
    _baseUrl="http://bombast-api-qa.azurewebsites.net";
}else{
    _baseUrl= "https://api.bombast.me";
}


var krc=require("kwaai-restcall");
var _restService=krc({
    headers:{"Content-Type": "application/json"},
    baseUrl:_baseUrl
});

//*********************************************************************************************************************************************************************
//exports
//*********************************************************************************************************************************************************************


var messageTemplates={

    getMessageTemplates:function(options,callback){
        var url="/{bombaster}/messagetemplates";
        if (options.query){url=url+"?" + options.query}
        options.verb="get";
        options.url=url;
        makeRestRequest(options,callback);
    },
    getMessageTemplate:function(options,callback){
        var url="/{bombaster}/messagetemplates/{messageTemplateId}";
        if (options.query){url=url+"?" + options.query}
        options.verb="get";
        options.url=url;
        makeRestRequest(options,callback);
    },

    sendTemplateMessage:function(options,callback){
        var url="/{bombaster}/messagetemplates/{messageTemplateId}/messages";
        options.verb="post";
        options.url=url;
        options.data=options.message;
        makeRestRequest(options,callback);
    },
    addMessageTemplate:function(options,callback){
        if(!options) throw new Error('options is required');
        if(!options.bombaster) throw new Error('options.bombaster is required');
        if(!options.template) throw new Error('options.template is required');
        if(!options.auth) throw new Error('options.auth is required');

        var req = {
            url: '/{bombaster}/messagetemplates',
            verb: 'post',
            auth: options.auth,
            data: options.template,
            bombaster: options.bombaster
        };
        makeRestRequest(req, callback);
    }


}

var masterTemplates={
    getMasterTemplates:function(options,callback){
        var url="/{bombaster}/mastertemplates";
        if (options.query){url=url+"?" + options.query}
        options.verb="get";
        options.url=url;
        makeRestRequest(options,callback);
    },
    getMasterTemplate:function(options,callback){
        var url="/{bombaster}/mastertemplates/{masterTemplateId}";
        if (options.query){url=url+"?" + options.query}
        options.verb="get";
        options.url=url;
        makeRestRequest(options,callback);
    },
    addMasterTemplate:function(options,callback){
        if(!options) throw new Error('options is required');
        if(!options.bombaster) throw new Error('options.bombaster is required');
        if(!options.template) throw new Error('options.template is required');
        if(!options.auth) throw new Error('options.auth is required');

        var req = {
            url: '/{bombaster}/mastertemplates',
            verb: 'post',
            auth: options.auth,
            data: options.template,
            bombaster: options.bombaster
        };
        makeRestRequest(req, callback);
    }
}

var messages={
    getMessages:function(options,callback){
        var url="/{bombaster}/messages";
        if (options.query){url=url+"?" + options.query}
        options.verb="get";
        options.url=url;
        makeRestRequest(options,callback);
    },
    getMessage:function(options,callback){
        var url="/{bombaster}/messages/{messageId}";
        if (options.query){url=url+"?" + options.query}
        options.verb="get";
        options.url=url;
        makeRestRequest(options,callback);
    }

    ,sendMessage:function(options,callback){
        var url="/{bombaster}/messages";
        options.data=options.message;
        options.verb="post";
        options.url=url;
        makeRestRequest(options,callback);
    }

    ,addMessageStatus:function(options,callback){
        var url="/{bombaster}/messages/{messageId}/status";
        options.data=options.status;
        options.verb="post";
        options.url=url;
        makeRestRequest(options,callback);
    }

    ,addMessageSMSStatus:function(options,callback){
        var url="/{bombaster}/messages/{messageId}/status/sms";
        options.data=options.status;
        options.verb="post";
        options.url=url;
        makeRestRequest(options,callback);
    }

    ,addMessageEmailStatus:function(options,callback){
        var url="/{bombaster}/messages/{messageId}/status/email";
        options.data=options.status;
        options.verb="post";
        options.url=url;
        makeRestRequest(options,callback);
    }

}


var bombaster = {
    create: function(options, callback) {
        if(!options) throw new Error("options is required");
        if(!options.auth) throw new Error("options.auth is required");
        if(!options.data) throw new Error("data is required");
        if(!options.data.name) throw new Error("data.name is required");
        if(!options.data.title) throw new Error("data.title is required");
        if(!options.data.description) throw new Error("data.description is required");
        if(!options.data.adminUser) throw new Error("data.adminUser is required");
        if(!options.data.adminUser.email) throw new Error("data.adminUser.email is required");
        if(!options.data.adminUser.password) throw new Error("data.adminUser.password is required");

        var reqOptions = {
            verb: "post",
            url: "/admin/bombasters/",
            data: options.data,
            auth: options.auth
        };
        makeRestRequest(reqOptions, callback);
    }
};


var api=
{
    messageTemplates:messageTemplates,
    masterTemplates:masterTemplates,
    messages:messages,
    bombaster: bombaster
};


module.exports=api;


function makeRestRequest(options,callback){

    if (!options.headers){options.headers={};}

    if (options.token){
        options.headers.externalauthtoken=options.token;
        options.auth={user:options.token,password:"xxxxxx"};
    }if (!options.auth && options.username && options.password){
        options.auth={user:options.username,password:options.password};
    }

    function serviceCalled(err,result){
        return callback(err,result);
    }

    _restService.callRestService(options,serviceCalled);
}

