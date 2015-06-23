#bombast

Node wrapper for bombast messaging service.
This is a node module you can include in your application and give it the ability to use the *bombast messaging system*.
The *Bombast messaging system* will need to be running at a specific server and the Bombast SDK needs to point to it.

## Principle

The principle of the Bombast SDK is brocken into:

  - **The API Call to**
    - **bombaster**: This is used to create bombaster users who will have access to the *Bombast messaging system*
      - **create**: The create method require an administrator that has full access.
    - **messages**: This is used to send sms/email messages directly. This is has the following method 
      - **getMessages**: Get all messages that have been sent up to 50 message. 
      - **getMessage**: Get a single message
      - **sendMessage**: Send a message through the *Bombast messaging system*
      - **addMessageStatus**: Change/Add the status of a single message that has been sent
      - **addMessageSMSStatus**: Add the sms status
      - **addMessageEmailStatus**: Add the email status
    - **masterTemplates**: A general top level template used by messages and templates
      - **getMasterTemplates**: Get all the master template created 
      - **getMasterTemplate**: Get a single master template specified by the Id
      - **addMasterTemplate**: Add a new master template
    - **messageTemplates**: message template, used to send messages with a formated template
      - **getMessageTemplates**: Gets all the message templates
      - **getMessageTemplate**: Gets a single message template, specified by an Id
      - **sendTemplateMessage**: Send a message with a template
      - **addMessageTemplate**: Add a new message template

## Install

`npm install https://github.com/Encentivize/bombast-node-sdk.git ---save`

One of the way you can include the api into your project is:

     var bombast=require("bombast");
 
     app.post("/:bombaster/callapi",
        function (req, res, next) {

            var api = req.body.api;
            var call= req.body.call;
            var opt = req.body.options;
            bombast[api][call](opt,callback);
            function callback(err,result){
                if(err){
                    var msg = err;
                    console.log(msg);
                    return next();
                }
                console.log(result);
                res.send(result);
            }
        }

##API

Using either *curl* or chorme extension *advance rest client*, you can make request calls to your api where the **bombast-sdk** is running.
The post body will need to consist of the following basic body (but not necessarily)

    {
    "api":"messageTemplates",
    "call":"sendTemplateMessage",
    "options":{
          "username":"xxxx@xxxxx.co.za",
          "password":"*********",
          "baseUrl":"http://localhost:1337",
          "bombaster":"testbombaster"
       }
    }
**These are all minimum required fields**
- *api*: The name of api you want to call
- *call*: The method you want to call
- *options*: the configuration data required to make the call. 
  - username is usually an email.
  - baseUrl the url where the Bombast message system is running
  - bombaster the username of the admin user that will be used to log in the bombast message system


#####getMessages

    {
        "api":"messages",
        "call":"getMessages",
        "options":{
           "username":"xxxx@xxxx.co.za",
           "password":"*******",
           "baseUrl":"http://localhost:1337",
           "bombaster":"testbombaster"
        }
    }

#####getMessage

Requires: messageId

    {
    "api":"messages",
    "call":"getMessage",
    "options":{
          "username":"xxxxx@test.co.za",
          "password":"********",
          "baseUrl":"http://localhost:1337",
          "bombaster":"testbombaster",
          "messageId":"5587be4a68f6d89d0281d027"
       }
    }

#####sendMessage

Requires: toAddress, fromAddress, subject and a body

    {
    "api":"messages",
    "call":"sendMessage",
    "options":{
          "username":"xxxxx@test.co.za",
          "password":"******",
          "baseUrl":"http://localhost:1337",
          "bombaster":"testbombaster",
          "message":{
            "toAddress":"fredtma@gmail.com",
            "fromAddress":"tshimanga@gmail.com",
            "subject":"test",
            "body":"body"
          }
       }
    }

#####addMessageStatus

Requires: status and statusName

    {
    "api":"messages",
    "call":"addMessageStatus",
    "options":{
          "username":"xxxx@xxxx.co.za",
          "password":"********",
          "baseUrl":"http://localhost:1337",
          "bombaster":"testbombaster",
          "messageId":"55881d8257255a0b61ab1c80",
          "status":{"status":"hello"},
          "statusName":"defining moments"
       }
    }

#####bombaster create

Requires: admin details (username & password), `data` of the user to be created (name, title, description, adminUser: email & password)

    {
    "api":"bombaster",
    "call":"create",
    "options":{
          "username":"xxxx@xxxx.co.za",
          "password":"*******",
          "baseUrl":"http://localhost:1337",
          "bombaster":"testbombaster",
          "auth":{
            "username":"xxxx@xxxx.co.za",
            "password":"*****"
          },
          "data":{
            "name":"forgive", 
            "title":"forgiveness",
            "description":"learn to forgive",
            "adminUser":{
              "email":"forgive@other.com",
              "password":"qwerty"
            }
          }
       }
    }

#####getMasterTemplate

Requires: masterTemplateId

    {
    "api":"masterTemplates",
    "call":"getMasterTemplate",
    "options":{
          "username":"xxxx@test.co.za",
          "password":"******",
          "baseUrl":"http://localhost:1337",
          "bombaster":"testbombaster",
          "masterTemplateId":"555473e236d96a6f6ddb76af"
       }
    }

#####addMasterTemplate

Requires: `template`: name, title, description, templates: sms or email body

    {
    "api":"masterTemplates",
    "call":"addMasterTemplate",
    "options":{
          "username":"xxxx@xxxx.co.za",
          "password":"******",
          "baseUrl":"http://localhost:1337",
          "bombaster":"testbombaster",
          "template":{
            "name":"testingSDK",
            "title":"testing SDK",
            "description":"SDK",
            "templates":{
              "sms":{
                "body":"message {{data}}"
              }
            }
          },
          "auth":{
            "password":"******",
            "username":"xxxx@xxxx.co.za"
          }
       }
    }

#####getMessageTemplates


    {
    "api":"messageTemplates",
    "call":"getMessageTemplates",
    "options":{
          "username":"xxxx@xxxx.co.za",
          "password":"******",
          "baseUrl":"http://localhost:1337",
          "bombaster":"testbombaster"
       }
    }

#####getMessageTemplate

Requires: messageTemplateId

    {
    "api":"messageTemplates",
    "call":"getMessageTemplate",
    "options":{
          "username":"xxxx@xxxx.co.za",
          "password":"******",
          "baseUrl":"http://localhost:1337",
          "bombaster":"testbombaster",
          "messageTemplateId":"5585b1a44fce4d9ec3d9017c"
       }
    }


#####addMessageTemplate

Requires: `template`: name, title, description, templates: sms or email body

    {
    "api":"messageTemplates",
    "call":"addMessageTemplate",
    "options":{
          "username":"xxxx@xxxx.co.za",
          "password":"******",
          "baseUrl":"http://localhost:1337",
          "bombaster":"testbombaster",
          "template":{
            "name":"AnSDKTemplate",
            "title":"SDK template",
            "description":"this is from the SDK",
            "templates":{
              "sms":{
                "body":"message {{body}}}"
              }
            },
            "priority":"Normal"
          },
          "auth":{
            "username":"xxxx@xxxx.co.za",
            "password":"******"
          }
       }
    }

#####sendTemplateMessage

Requires: messageTemplateId, message: data, message: sms or email toNumber or toAddress

    {
    "api":"messageTemplates",
    "call":"sendTemplateMessage",
    "options":{
          "username":"xxxx@xxxx.co.za",
          "password":"******",
          "baseUrl":"http://localhost:1337",
          "bombaster":"testbombaster",
          "messageTemplateId":"55883215c6381a216777cf02",
          "message":{
            "data":{
              "body":"of LOVE"
            },
            "message":{
              "sms":{
                "toNumber":"0782000470"
              }
            }
          }
       }
    }