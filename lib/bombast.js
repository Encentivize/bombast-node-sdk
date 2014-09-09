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

_restService=require("kwaai-restcall")({
    headers:{"Content-Type": "application/json"},
    baseUrl:_baseUrl
});


//*********************************************************************************************************************************************************************
//exports
//*********************************************************************************************************************************************************************


var messageTemplates={


}

var masterTemplates={

}

var messages={


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

