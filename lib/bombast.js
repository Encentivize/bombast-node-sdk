//*********************************************************************************************************************************************************************
//requires
var _baseUrl=null;

var _environment =  process.env.NODE_ENV || 'development';
if (_environment=="development") {
    _baseUrl="http://localhost:1337";
}else if (_environment=="qa") {
    _baseUrl="http://bombast-api-qa.azurewebsites.net";
}else{
    _baseUrl= "https://api.bombast.me";
}


//_baseUrl="http://bombast-api-qa.azurewebsites.net";

_restService=require("kwaai-restcall")({
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

}



var api=
{
    messageTemplates:messageTemplates,
    masterTemplates:masterTemplates,
    messages:messages
}


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

