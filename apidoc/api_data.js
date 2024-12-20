define({ "api": [
  {
    "type": "post",
    "url": "https://ayudamosvalencia.com/api/api/signin",
    "title": "Get the token (and the userId)",
    "name": "signIn",
    "version": "1.0.0",
    "group": "Access_token",
    "description": "<p>This method gets the token and the language for the user. This token includes the encrypt id of the user, token expiration date, role, and the group to which it belongs. The token are encoded using <a href=\"https://en.wikipedia.org/wiki/JSON_Web_Token\" target=\"_blank\">jwt</a></p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "var passwordsha512 = sha512(\"fjie76?vDh\");\nvar formValue = { email: \"aa@aa.com\", password: passwordsha512 };\n this.http.post('https://ayudamosvalencia.com/api/signin',formValue)\n  .subscribe( (res : any) => {\n    if(res.message == \"You have successfully logged in\"){\n      console.log(res.lang);\n      console.log(res.token);\n    }else{\n      this.isloggedIn = false;\n    }\n }, (err) => {\n   this.isloggedIn = false;\n }",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password using hash <a href=\"https://es.wikipedia.org/wiki/SHA-2\" target=\"_blank\">sha512</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"email\": \"example@ex.com\",\n  \"password\": \"f74f2603939a53656948480ce71f1ce46457b6654fd22c61c1f2ccd3e2c96d1cd02d162b560c4beaf1ae45f4574571dc5cbc1ce040701c0b5c38457988aa00fe97f\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>If all goes well, the system should return 'You have successfully logged in'</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>You will need this <strong>token</strong> in the header of almost all requests to the API. Whenever the user wants to access a protected route or resource, the user agent should send the JWT, in the Authorization header using the Bearer schema.</p> <p>The data contained in the token are: encrypted <strong>userId</strong>, expiration token, group, and role. To decode them, you you must use some jwt decoder <a href=\"https://en.wikipedia.org/wiki/JSON_Web_Token\" target=\"_blank\">jwt</a>. There are multiple options to do it, for example for javascript: <a href=\"https://github.com/hokaccha/node-jwt-simple\" target=\"_blank\">Option 1</a> <a href=\"https://github.com/auth0/jwt-decode\" target=\"_blank\">Option 2</a> When you decode, you will see that it has several values, these are:</p> <p> <ul>  <li>sub: the encrypted userId. This value will also be used in many API queries. It is recommended to store only the token, and each time the userId is required, decode the token.</li>  <li>exp: The expiration time claim identifies the expiration time on or after which the JWT must not be accepted for processing.</li>  <li>group: Group to which the user belongs, if it does not have a group, it will be 'None'. </li>  <li>role: Role of the user. Normally it will be 'User'.</li> </ul> </p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lang",
            "description": "<p>Lang of the User.</p>"
          }
        ],
        "Success 202": [
          {
            "group": "Success 202",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Information about the request. The credentials are incorrect or something has gone wrong. One of the following answers will be obtained:</p> <ul> <li>Not found</li> <li>Login failed</li> <li>Account is temporarily locked</li> <li>Account is unactivated</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"message\": \"You have successfully logged in\",\n \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciPgDIUzI1NiJ9.eyJzdWIiOiI1M2ZlYWQ3YjY1YjM0ZTQ0MGE4YzRhNmUyMzVhNDFjNjEyOThiMWZjYTZjMjXkZTUxMTA9OGVkN2NlODMxYWY3IiwiaWF0IjoxNTIwMzUzMDMwLCJlcHAiOjE1NTE4ODkwMzAsInJvbGUiOiJVc2VyIiwiZ3JvdDEiOiJEdWNoZW5uZSBQYXJlbnQgUHJfrmVjdCBOZXRoZXJsYW5kcyJ9.MloW8eeJ857FY7-vwxJaMDajFmmVStGDcnfHfGJx05k\",\n \"lang\": \"en\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/all/user.js",
    "groupTitle": "Access_token"
  },
  {
    "type": "post",
    "url": "https://ayudamosvalencia.com/api/api/newPass",
    "title": "New password",
    "name": "newPass",
    "version": "1.0.0",
    "group": "Account",
    "description": "<p>This method allows you to change the password of an account. It is another way to change the password, but in this case, you need to provide the current and the new password, and it does not require validation through the mail account. In this case, it requires authentication in the header.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "var passwordsha512 = sha512(\"fjie76?vDh\");\nvar newpasswordsha512 = sha512(\"jisd?87Tg\");\nvar formValue = { email: example@ex.com, actualpassword: passwordsha512, newpassword: newpasswordsha512 };\n this.http.post('https://ayudamosvalencia.com/api/newPass',formValue)\n  .subscribe( (res : any) => {\n    if(res.message == \"password changed\"){\n      console.log(\"Password changed successfully\");\n    }else if(res.message == 'Login failed'){\n      console.log('The current password is incorrect');\n    }else if(res.message == 'Account is temporarily locked'){\n      console.log('Account is temporarily locked');\n    }else if(res.message == 'Account is unactivated'){\n      ...\n    }\n }, (err) => {\n   ...\n }",
        "type": "js"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Users unique access-key. For this, go to  <a href=\"#api-Access_token-signIn\">Get token</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"Bearer eyJ0eXAiOiJKV1QiLCJhbGciPgDIUzI1NiJ9.eyJzdWIiOiI1M2ZlYWQ3YjY1YjM0ZTQ0MGE4YzRhNmUyMzVhNDFjNjEyOThiMWZjYTZjMjXkZTUxMTA9OGVkN2NlODMxYWY3IiwiaWF0IjoxNTIwMzUzMDMwLCJlcHAiOjE1NTE4ODkwMzAsInJvbGUiOiJVc2VyIiwiZ3JvdDEiOiJEdWNoZW5uZSBQYXJlbnQgUHJfrmVjdCBOZXRoZXJsYW5kcyJ9.MloW8eeJ857FY7-vwxJaMDajFmmVStGDcnfHfGJx05k\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email. In the link to request a change of password sent to the email, there is an email parameter. The value of this parameter will be the one to be assigned to email.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "actualpassword",
            "description": "<p>Actual password using hash <a href=\"https://es.wikipedia.org/wiki/SHA-2\" target=\"_blank\">sha512</a></p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "newpassword",
            "description": "<p>New password using hash <a href=\"https://es.wikipedia.org/wiki/SHA-2\" target=\"_blank\">sha512</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"email\": \"example@ex.com\",\n  \"actualpassword\": \"f74f2603939a53656948480ce71f1ce46457b6654fd22c61c1f2ccd3e2c96d1cd02d162b560c4beaf1ae45f4574571dc5cbc1ce040701c0b5c38457988aa00fe97f\",\n  \"newpassword\": \"k847y603939a53656948480ce71f1ce46457b4745fd22c61c1f2ccd3e2c96d1cd02d162b560c4beaf1ae45f4574571dc5cbc1ce040701c0b5c38457988aa00fe45t\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Information about the request. If everything went correctly, return 'password changed'</p>"
          }
        ],
        "Success 202": [
          {
            "group": "Success 202",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Information about the request. The credentials are incorrect or something has gone wrong. One of the following answers will be obtained:</p> <ul> <li>Not found</li> <li>Login failed (if the current password is incorrect)</li> <li>Account is temporarily locked</li> <li>Account is unactivated</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"message\": \"password changed\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/all/user.js",
    "groupTitle": "Account"
  },
  {
    "type": "post",
    "url": "https://ayudamosvalencia.com/api/api/recoverpass",
    "title": "Request password change",
    "name": "recoverPass",
    "version": "1.0.0",
    "group": "Account",
    "description": "<p>This method allows you to send a request to change the password. At the end of this call, you need to check the email account to call <a href=\"#api-Account-updatePass\">update password</a>.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "var formValue = { email: \"example@ex.com\"};\nthis.http.post('https://ayudamosvalencia.com/api/recoverpass',formValue)\n .subscribe( (res : any) => {\n   if(res.message == \"Email sent\"){\n     console.log(\"Account recovery email sent. Check the email to change the password\");\n   }\n}, (err) => {\n  if(err.error.message == 'Fail sending email'){\n     //contact with health29\n   }else if(err.error.message == 'user not exists'){\n    ...\n   }else if(err.error.message == 'account not activated'){\n    ...\n   }\n}",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"email\": \"example@ex.com\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Information about the request. If everything went correctly, return 'Email sent'</p>"
          }
        ],
        "Eror 500": [
          {
            "group": "Eror 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Information about the request. The credentials are incorrect or something has gone wrong. One of the following answers will be obtained:</p> <ul> <li>Fail sending email</li> <li>user not exists</li> <li>account not activated</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"message\": \"Email sent\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/all/user.js",
    "groupTitle": "Account"
  },
  {
    "type": "post",
    "url": "https://ayudamosvalencia.com/api/api/signUp",
    "title": "New account",
    "name": "signUp",
    "version": "1.0.0",
    "group": "Account",
    "description": "<p>This method allows you to create a user account in AyudamosValencia</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "var passwordsha512 = sha512(\"fjie76?vDh\");\nvar formValue = { email: \"example@ex.com\", userName: \"Peter\", password: passwordsha512, lang: \"en\", group: \"None\"};\n this.http.post('https://ayudamosvalencia.com/api/signup',formValue)\n  .subscribe( (res : any) => {\n    if(res.message == \"Account created\"){\n      console.log(\"Check the email to activate the account\");\n    }else if(res.message == 'Fail sending email'){\n      //contact with health29\n    }else if(res.message == 'user exists'){\n     ...\n    }\n }, (err) => {\n   ...\n }",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>User name</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password using hash <a href=\"https://es.wikipedia.org/wiki/SHA-2\" target=\"_blank\">sha512</a></p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "lang",
            "description": "<p>Lang of the User. For this, go to  <a href=\"#api-Languages-getLangs\">Get the available languages</a>. We currently have 5 languages, but we will include more. The current languages are:</p> <ul> <li>English: en</li> <li>Spanish: es</li> <li>German: de</li> <li>Dutch: nl</li> <li>Portuguese: pt</li> </ul>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "group",
            "description": "<p>Group to which the user belongs, if it does not have a group or do not know the group to which belongs, it will be 'None'. If the group is not set, it will be set to 'None' by default.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"email\": \"example@ex.com\",\n  \"userName\": \"Peter\",\n  \"password\": \"f74f2603939a53656948480ce71f1ce46457b6654fd22c61c1f2ccd3e2c96d1cd02d162b560c4beaf1ae45f4574571dc5cbc1ce040701c0b5c38457988aa00fe97f\",\n  \"group\": \"None\",\n  \"lang\": \"en\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Information about the request. One of the following answers will be obtained:</p> <ul> <li>Account created (The user should check the email to activate the account)</li> <li>Fail sending email</li> <li>user exists</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"message\": \"Account created\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/all/user.js",
    "groupTitle": "Account"
  },
  {
    "type": "post",
    "url": "https://ayudamosvalencia.com/api/api/updatepass",
    "title": "Update password",
    "name": "updatePass",
    "version": "1.0.0",
    "group": "Account",
    "description": "<p>This method allows you to change the password of an account. Before changing the password, you previously had to make a <a href=\"#api-Account-recoverPass\">request for password change</a>.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "var passwordsha512 = sha512(\"fjie76?vDh\");\nvar param = this.router.parseUrl(this.router.url).queryParams;\nvar formValue = { email: param.email, password: passwordsha512, randomCodeRecoverPass: param.key };\n this.http.post('https://ayudamosvalencia.com/api/updatepass',formValue)\n  .subscribe( (res : any) => {\n    if(res.message == \"password changed\"){\n      console.log(\"Password changed successfully\");\n    }\n }, (err) => {\n   if(err.error.message == 'invalid link'){\n      ...\n    }else if(err.error.message == 'link expired'){\n      console.log('The link has expired after more than 15 minutes since you requested it. Re-request a password change.');\n    }else if(err.error.message == 'Error saving the pass'){\n      ...\n    }\n }",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email. In the link to request a change of password sent to the email, there is an email parameter. The value of this parameter will be the one to be assigned to email.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password using hash <a href=\"https://es.wikipedia.org/wiki/SHA-2\" target=\"_blank\">sha512</a></p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "randomCodeRecoverPass",
            "description": "<p>In the password change request link sent to the email, there is a key parameter. The value of this parameter will be the one that must be assigned to randomCodeRecoverPass.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"email\": \"example@ex.com\",\n  \"password\": \"f74f2603939a53656948480ce71f1ce46457b6654fd22c61c1f2ccd3e2c96d1cd02d162b560c4beaf1ae45f4574571dc5cbc1ce040701c0b5c38457988aa00fe97f\",\n  \"randomCodeRecoverPass\": \"0.xkwta99hoy\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Information about the request. If everything went correctly, return 'password changed'</p>"
          }
        ],
        "Eror 500": [
          {
            "group": "Eror 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Information about the request. The credentials are incorrect or something has gone wrong. One of the following answers will be obtained:</p> <ul> <li>invalid link</li> <li>link expired (The link has expired after more than 15 minutes since you requested it. Re-request a password change.)</li> <li>Account is temporarily locked</li> <li>Error saving the pass</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"message\": \"password changed\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/all/user.js",
    "groupTitle": "Account"
  },
  {
    "type": "put",
    "url": "https://ayudamosvalencia.com/api/requestclin/status/:requestId",
    "title": "Update Status",
    "name": "updateclinicianStatus",
    "description": "<p>This method allows to change the data of a clinician case.</p>",
    "group": "Clinicals",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "var data = {status: 'ontheway'};\nthis.http.put('https://ayudamosvalencia.com/api/requestclin/status/'+requestId, data)\n .subscribe( (res : any) => {\n   console.log('Message: '+ res.message);\n  }, (err) => {\n   ...\n  }",
        "type": "js"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Users unique access-key. For this, go to  <a href=\"#api-Access_token-signIn\">Get token</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"Bearer eyJ0eXAiOiJKV1QiLCJhbGciPgDIUzI1NiJ9.eyJzdWIiOiI1M2ZlYWQ3YjY1YjM0ZTQ0MGE4YzRhNmUyMzVhNDFjNjEyOThiMWZjYTZjMjXkZTUxMTA9OGVkN2NlODMxYWY3IiwiaWF0IjoxNTIwMzUzMDMwLCJlcHAiOjE1NTE4ODkwMzAsInJvbGUiOiJVc2VyIiwiZ3JvdDEiOiJEdWNoZW5uZSBQYXJlbnQgUHJfrmVjdCBOZXRoZXJsYW5kcyJ9.MloW8eeJ857FY7-vwxJaMDajFmmVStGDcnfHfGJx05k\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "requestId",
            "description": "<p>Case unique ID</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "string",
            "allowedValues": [
              "\"new\"",
              "\"contacted\"",
              "\"pending\"",
              "\"ontheway\"",
              "\"contactlost\"",
              "\"helped\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>Status of the case.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>If the case has been updated  correctly, it returns the message 'Updated'.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Updated\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/user/request-clin.js",
    "groupTitle": "Clinicals"
  },
  {
    "type": "get",
    "url": "https://ayudamosvalencia.com/api/group/",
    "title": "Get specific group information",
    "name": "getGroup",
    "description": "<p>This method return the information of one group of health29.</p>",
    "group": "Groups",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "var groupName = \"GroupName\"\nthis.http.get('https://ayudamosvalencia.com/api/group/'+groupName)\n .subscribe( (res : any) => {\n   console.log('result Ok');\n  }, (err) => {\n   ...\n  }",
        "type": "js"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Users unique access-key. For this, go to  <a href=\"#api-Access_token-signIn\">Get token</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"Bearer eyJ0eXAiOiJKV1QiLCJhbGciPgDIUzI1NiJ9.eyJzdWIiOiI1M2ZlYWQ3YjY1YjM0ZTQ0MGE4YzRhNmUyMzVhNDFjNjEyOThiMWZjYTZjMjXkZTUxMTA9OGVkN2NlODMxYWY3IiwiaWF0IjoxNTIwMzUzMDMwLCJlcHAiOjE1NTE4ODkwMzAsInJvbGUiOiJVc2VyIiwiZ3JvdDEiOiJEdWNoZW5uZSBQYXJlbnQgUHJfrmVjdCBOZXRoZXJsYW5kcyJ9.MloW8eeJ857FY7-vwxJaMDajFmmVStGDcnfHfGJx05k\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupName",
            "description": "<p>The name of the group of patients. More info here:  <a href=\"#api-Groups-getGroupsNames\">Get groupName</a></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Group unique ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Group admin email address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "subscription",
            "description": "<p>Type of subscription of the group in Health29</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Group name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "medications",
            "description": "<p>Group medications.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "phenotype",
            "description": "<p>Group symptoms.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "defaultLang",
            "description": "<p>Group default lang.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t  \"_id\" : <id>,\n\t  \"email\" : <admin_email>,\n\t  \"subscription\" : \"Premium\",\n\t  \"name\" : \"GroupName\",\n \t\"medications\" : [ {\n\t\t  \"drugs\" : [\n\t\t\t  {\n\t\t\t\t  \"drugsSideEffects\" : [\n\t\t\t\t\t  \"Cushingoid\",\n\t\t\t\t\t  \"Weight gain\",\n\t\t\t\t\t  \"Growth stunting\",\n\t\t\t\t\t  \"Delayed puberty\",\n\t\t\t\t  \t\"Mood changes\",\n\t\t\t\t  \t\"Fungal infections\",\n\t\t\t  \t\t\"Other dermatologic complications\",\n\t\t\t\t  \t\"Cataract\",\n\t\t\t\t  \t\"Adrenal surpression\",\n\t\t\t\t  \t\"Bone density\"\n\t\t\t  \t],\n\t\t\t  \t\"translations\" : [\n\t\t\t\t\t  {\n\t\t\t\t\t  \t\"name\" : \"Prednisolone\",\n\t\t\t\t\t  \t\"code\" : \"en\"\n\t\t\t\t\t  },\n\t\t\t\t\t  {\n\t\t\t\t\t  \t\"name\" : \"Prednisolone\",\n\t\t\t\t\t  \t\"code\" : \"es\"\n\t\t\t\t  \t},\n\t\t\t\t  \t{\n\t\t\t\t\t  \t\"name\" : \"Corticosteroïden - Prednison\",\n\t\t\t\t\t\t  \"code\" : \"nl\"\n\t\t\t\t\t  }\n\t\t\t\t  ],\n\t\t\t\t  \"name\" : \"Prednisolone\"\n\t\t\t  }\n     ]\n\t\t  \"sideEffects\" : [\n\t\t\t  {\n\t\t\t\t  \"translationssideEffect\" : [\n\t\t\t\t  \t{\n\t\t\t\t\t\t  \"name\" : \"Bone density\",\n\t\t\t\t\t\t  \"code\" : \"en\"\n\t\t\t\t\t  },\n\t\t\t\t\t  {\n\t\t\t\t\t  \t\"name\" : \"Bone density\",\n\t\t\t\t\t\t  \"code\" : \"es\"\n\t\t\t\t\t  },\n\t\t\t\t\t  {\n\t\t\t\t\t\t  \"name\" : \"Botdichtheid\",\n\t\t\t\t\t\t  \"code\" : \"nl\"\n\t\t\t\t\t  }\n\t\t\t\t  ],\n\t\t\t\t  \"name\" : \"Bone density\"\n\t\t\t  }\n\t\t  ],\n\t\t  \"adverseEffects\" : [ ]\n\t  ],\n\t  \"phenotype\" : [\n\t\t  {\n\t\t\t  \"id\" : \"HP:0001250\",\n\t\t\t  \"name\" : \"seizures\"\n\t\t  }\n\t  ],\n\t  \"__v\" : 0,\n\t  \"defaultLang\" : \"es\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/all/group.js",
    "groupTitle": "Groups"
  },
  {
    "type": "get",
    "url": "https://ayudamosvalencia.com/api/groupadmin/",
    "title": "Get administrator email",
    "name": "getGroupAdmin",
    "description": "<p>This method return the email of the administrator of the group.</p>",
    "group": "Groups",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "var groupName = <groupName>\nthis.http.get('https://ayudamosvalencia.com/api/groupadmin/'+groupName)\n .subscribe( (res : any) => {\n   console.log('Get the email of the administrator of the group ok');\n  }, (err) => {\n   ...\n  }",
        "type": "js"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Users unique access-key. For this, go to  <a href=\"#api-Access_token-signIn\">Get token</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"Bearer eyJ0eXAiOiJKV1QiLCJhbGciPgDIUzI1NiJ9.eyJzdWIiOiI1M2ZlYWQ3YjY1YjM0ZTQ0MGE4YzRhNmUyMzVhNDFjNjEyOThiMWZjYTZjMjXkZTUxMTA9OGVkN2NlODMxYWY3IiwiaWF0IjoxNTIwMzUzMDMwLCJlcHAiOjE1NTE4ODkwMzAsInJvbGUiOiJVc2VyIiwiZ3JvdDEiOiJEdWNoZW5uZSBQYXJlbnQgUHJfrmVjdCBOZXRoZXJsYW5kcyJ9.MloW8eeJ857FY7-vwxJaMDajFmmVStGDcnfHfGJx05k\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupName",
            "description": "<p>The name of the group.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n    \"email\":<admin email>\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/all/group.js",
    "groupTitle": "Groups"
  },
  {
    "type": "get",
    "url": "https://ayudamosvalencia.com/api/groups/",
    "title": "Get groups",
    "name": "getGroups",
    "description": "<p>This method return the groups of health29. you get a list of groups, and for each one you have: name, and the symptoms associated with the group.</p>",
    "group": "Groups",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "this.http.get('https://ayudamosvalencia.com/api/groups)\n .subscribe( (res : any) => {\n   console.log('groups: '+ res.groups);\n  }, (err) => {\n   ...\n  }",
        "type": "js"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"name\":\"Duchenne Parent Project Netherlands\",\n    \"data\":[\n      {\"id\":\"HP:0100543\",\"name\":\"Cognitive impairment\"},\n      {\"id\":\"HP:0002376\",\"name\":\"Developmental regression\"}\n    ]\n  },\n  {\n    \"name\":\"None\",\n    \"data\":[]\n  }\n]",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Users unique access-key. For this, go to  <a href=\"#api-Access_token-signIn\">Get token</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"Bearer eyJ0eXAiOiJKV1QiLCJhbGciPgDIUzI1NiJ9.eyJzdWIiOiI1M2ZlYWQ3YjY1YjM0ZTQ0MGE4YzRhNmUyMzVhNDFjNjEyOThiMWZjYTZjMjXkZTUxMTA9OGVkN2NlODMxYWY3IiwiaWF0IjoxNTIwMzUzMDMwLCJlcHAiOjE1NTE4ODkwMzAsInJvbGUiOiJVc2VyIiwiZ3JvdDEiOiJEdWNoZW5uZSBQYXJlbnQgUHJfrmVjdCBOZXRoZXJsYW5kcyJ9.MloW8eeJ857FY7-vwxJaMDajFmmVStGDcnfHfGJx05k\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/all/group.js",
    "groupTitle": "Groups"
  },
  {
    "type": "get",
    "url": "https://ayudamosvalencia.com/api/groupsnames/",
    "title": "Get groups names",
    "name": "getGroupsNames",
    "description": "<p>This method return the groups of health29. you get a list of groups, and for each one you have the name.</p>",
    "group": "Groups",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "this.http.get('https://ayudamosvalencia.com/api/groupsnames)\n .subscribe( (res : any) => {\n   console.log('groups: '+ res.groups);\n  }, (err) => {\n   ...\n  }",
        "type": "js"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"name\":\"Duchenne Parent Project Netherlands\"\n  },\n  {\n    \"name\":\"None\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Users unique access-key. For this, go to  <a href=\"#api-Access_token-signIn\">Get token</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"Bearer eyJ0eXAiOiJKV1QiLCJhbGciPgDIUzI1NiJ9.eyJzdWIiOiI1M2ZlYWQ3YjY1YjM0ZTQ0MGE4YzRhNmUyMzVhNDFjNjEyOThiMWZjYTZjMjXkZTUxMTA9OGVkN2NlODMxYWY3IiwiaWF0IjoxNTIwMzUzMDMwLCJlcHAiOjE1NTE4ODkwMzAsInJvbGUiOiJVc2VyIiwiZ3JvdDEiOiJEdWNoZW5uZSBQYXJlbnQgUHJfrmVjdCBOZXRoZXJsYW5kcyJ9.MloW8eeJ857FY7-vwxJaMDajFmmVStGDcnfHfGJx05k\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/all/group.js",
    "groupTitle": "Groups"
  },
  {
    "type": "get",
    "url": "https://ayudamosvalencia.com/api/langs/",
    "title": "Get languages",
    "name": "getLangs",
    "description": "<p>This method return the languages available in AyudamosValencia. you get a list of languages, and for each one you have the name and the code. We currently have 5 languages, but we will include more. The current languages are:</p> <ul> <li>English: en</li> <li>Spanish: es</li> <li>German: de</li> <li>Dutch: nl</li> <li>Portuguese: pt</li> </ul>",
    "group": "Languages",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "this.http.get('https://ayudamosvalencia.com/api/langs)\n .subscribe( (res : any) => {\n   console.log('languages: '+ res.listLangs);\n  }, (err) => {\n   ...\n  }",
        "type": "js"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"name\": \"English\",\n    \"code\": \"en\"\n  },\n  {\n    \"name\": \"Español,Castellano\",\n    \"code\": \"es\"\n  },\n  {\n    \"name\": \"Deutsch\",\n    \"code\": \"de\"\n  },\n  {\n    \"name\": \"Nederlands,Vlaams\",\n    \"code\": \"nl\"\n  },\n  {\n    \"name\": \"Português\",\n    \"code\": \"pt\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/all/lang.js",
    "groupTitle": "Languages"
  },
  {
    "type": "get",
    "url": "https://ayudamosvalencia.com/api/patients/:patientId",
    "title": "Get patient",
    "name": "getPatient",
    "description": "<p>This method read data of a Patient</p>",
    "group": "Patients",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "this.http.get('https://ayudamosvalencia.com/api/patients/'+patientId)\n .subscribe( (res : any) => {\n   console.log('patient info: '+ res.patient);\n  }, (err) => {\n   ...\n  }",
        "type": "js"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Users unique access-key. For this, go to  <a href=\"#api-Access_token-signIn\">Get token</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"Bearer eyJ0eXAiOiJKV1QiLCJhbGciPgDIUzI1NiJ9.eyJzdWIiOiI1M2ZlYWQ3YjY1YjM0ZTQ0MGE4YzRhNmUyMzVhNDFjNjEyOThiMWZjYTZjMjXkZTUxMTA9OGVkN2NlODMxYWY3IiwiaWF0IjoxNTIwMzUzMDMwLCJlcHAiOjE1NTE4ODkwMzAsInJvbGUiOiJVc2VyIiwiZ3JvdDEiOiJEdWNoZW5uZSBQYXJlbnQgUHJfrmVjdCBOZXRoZXJsYW5kcyJ9.MloW8eeJ857FY7-vwxJaMDajFmmVStGDcnfHfGJx05k\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "patientId",
            "description": "<p>Patient unique ID. More info here:  <a href=\"#api-Patients-getPatientsUser\">Get patientId</a></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"male\"",
              "\"female\""
            ],
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of the Patient.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone1",
            "description": "<p>Phone number of the Patient.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone2",
            "description": "<p>Other phone number of the Patient.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>Country code of residence of the Patient. (<a href=\"https://github.com/astockwell/countries-and-provinces-states-regions\" target=\"_blank\">ISO_3166-2</a>)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "province",
            "description": "<p>Province or region code of residence of the Patient. (<a href=\"https://github.com/astockwell/countries-and-provinces-states-regions\" target=\"_blank\">ISO_3166-2</a>)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of residence of the Patient.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "postalCode",
            "description": "<p>PostalCode of residence of the Patient.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "street",
            "description": "<p>Street of residence of the Patient.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "countrybirth",
            "description": "<p>Country birth of the Patient. (<a href=\"https://github.com/astockwell/countries-and-provinces-states-regions\" target=\"_blank\">ISO_3166-2</a>)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "provincebirth",
            "description": "<p>Province birth of the Patient. (<a href=\"https://github.com/astockwell/countries-and-provinces-states-regions\" target=\"_blank\">ISO_3166-2</a>)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "citybirth",
            "description": "<p>City birth of the Patient.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>Date of birth of the patient.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "patientName",
            "description": "<p>Name of the Patient.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "surname",
            "description": "<p>Surname of the Patient.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "parents",
            "description": "<p>Data about parents of the Patient. The highEducation field can be ... The profession field is a free field</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "siblings",
            "description": "<p>Data about siblings of the Patient. The affected field can be yes or no. The gender field can be male or female</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"patient\":\n  {\n    \"gender\":\"male\",\n    \"phone2\":\"\",\n    \"phone1\":\"\",\n    \"country\":\"NL\",\n    \"province\":\"Groningen\",\n    \"city\":\"narnias\",\n    \"postalCode\":\"\",\n    \"street\":\"\",\n    \"countrybirth\":\"SL\",\n    \"provincebirth\":\"Barcelona\",\n    \"citybirth\":\"narnia\",\n    \"birthDate\":\"1984-06-13T00:00:00.000Z\",\n    \"surname\":\"aa\",\n    \"patientName\":\"aa\",\n    \"parents\":[{\"_id\":\"5a6f4b71f600d806044f3ef5\",\"profession\":\"\",\"highEducation\":\"\"}],\n    \"siblings\":[{\"_id\":\"5a6f4b71f600d806044f3ef4\",\"affected\":null,\"gender\":\"\"}]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/user/patient.js",
    "groupTitle": "Patients"
  },
  {
    "type": "get",
    "url": "https://ayudamosvalencia.com/api/patients-all/:userId",
    "title": "Get patient list of a user",
    "name": "getPatientsUser",
    "description": "<p>This method read the patient list of a user. For each patient you have, you will get: patientId, name, and last name.</p>",
    "group": "Patients",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "this.http.get('https://ayudamosvalencia.com/api/patients-all/'+userId)\n .subscribe( (res : any) => {\n   console.log('patient list: '+ res.listpatients);\n   if(res.listpatients.length>0){\n     console.log(\"patientId\" + res.listpatients[0].sub +\", Patient Name: \"+ res.listpatients[0].patientName+\", Patient surname: \"+ res.listpatients[0].surname);\n   }\n  }, (err) => {\n   ...\n  }",
        "type": "js"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Users unique access-key. For this, go to  <a href=\"#api-Access_token-signIn\">Get token</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"Bearer eyJ0eXAiOiJKV1QiLCJhbGciPgDIUzI1NiJ9.eyJzdWIiOiI1M2ZlYWQ3YjY1YjM0ZTQ0MGE4YzRhNmUyMzVhNDFjNjEyOThiMWZjYTZjMjXkZTUxMTA9OGVkN2NlODMxYWY3IiwiaWF0IjoxNTIwMzUzMDMwLCJlcHAiOjE1NTE4ODkwMzAsInJvbGUiOiJVc2VyIiwiZ3JvdDEiOiJEdWNoZW5uZSBQYXJlbnQgUHJfrmVjdCBOZXRoZXJsYW5kcyJ9.MloW8eeJ857FY7-vwxJaMDajFmmVStGDcnfHfGJx05k\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User unique ID. More info here:  <a href=\"#api-Access_token-signIn\">Get token and userId</a></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "listpatients",
            "description": "<p>You get a list of patients (usually only one patient), with your patient id, name, and surname.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"listpatients\":\n {\n  \"sub\": \"1499bb6faef2c95364e2f4tt2c9aef05abe2c9c72110a4514e8c4c3fb038ff30\",\n  \"patientName\": \"Jhon\",\n  \"surname\": \"Doe\"\n },\n {\n  \"sub\": \"5499bb6faef2c95364e2f4ee2c9aef05abe2c9c72110a4514e8c4c4gt038ff30\",\n  \"patientName\": \"Peter\",\n  \"surname\": \"Tosh\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/user/patient.js",
    "groupTitle": "Patients"
  },
  {
    "type": "put",
    "url": "https://ayudamosvalencia.com/api/patients/:patientId",
    "title": "Update Patient",
    "name": "updatePatient",
    "description": "<p>This method allows to change the data of a patient.</p>",
    "group": "Patients",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "var patient = {patientName: '', surname: '', street: '', postalCode: '', citybirth: '', provincebirth: '', countrybirth: null, city: '', province: '', country: null, phone1: '', phone2: '', birthDate: null, gender: null, siblings: [], parents: []};\nthis.http.put('https://ayudamosvalencia.com/api/patients/'+patientId, patient)\n .subscribe( (res : any) => {\n   console.log('patient info: '+ res.patientInfo);\n  }, (err) => {\n   ...\n  }",
        "type": "js"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Users unique access-key. For this, go to  <a href=\"#api-Access_token-signIn\">Get token</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"Bearer eyJ0eXAiOiJKV1QiLCJhbGciPgDIUzI1NiJ9.eyJzdWIiOiI1M2ZlYWQ3YjY1YjM0ZTQ0MGE4YzRhNmUyMzVhNDFjNjEyOThiMWZjYTZjMjXkZTUxMTA9OGVkN2NlODMxYWY3IiwiaWF0IjoxNTIwMzUzMDMwLCJlcHAiOjE1NTE4ODkwMzAsInJvbGUiOiJVc2VyIiwiZ3JvdDEiOiJEdWNoZW5uZSBQYXJlbnQgUHJfrmVjdCBOZXRoZXJsYW5kcyJ9.MloW8eeJ857FY7-vwxJaMDajFmmVStGDcnfHfGJx05k\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "patientId",
            "description": "<p>Patient unique ID. More info here:  <a href=\"#api-Patients-getPatientsUser\">Get patientId</a></p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "string",
            "allowedValues": [
              "\"male\"",
              "\"female\""
            ],
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of the Patient.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "phone1",
            "description": "<p>Phone number of the Patient.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "phone2",
            "description": "<p>Other phone number of the Patient.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>Country code of residence of the Patient. (<a href=\"https://github.com/astockwell/countries-and-provinces-states-regions\" target=\"_blank\">ISO_3166-2</a>)</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "province",
            "description": "<p>Province or region code of residence of the Patient. (<a href=\"https://github.com/astockwell/countries-and-provinces-states-regions\" target=\"_blank\">ISO_3166-2</a>)</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of residence of the Patient.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "postalCode",
            "description": "<p>PostalCode of residence of the Patient.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "street",
            "description": "<p>Street of residence of the Patient.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "countrybirth",
            "description": "<p>Country birth of the Patient. (<a href=\"https://github.com/astockwell/countries-and-provinces-states-regions\" target=\"_blank\">ISO_3166-2</a>)</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "provincebirth",
            "description": "<p>Province birth of the Patient. (<a href=\"https://github.com/astockwell/countries-and-provinces-states-regions\" target=\"_blank\">ISO_3166-2</a>)</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "citybirth",
            "description": "<p>City birth of the Patient.</p>"
          },
          {
            "group": "body",
            "type": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>Date of birth of the patient.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "patientName",
            "description": "<p>Name of the Patient.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "surname",
            "description": "<p>Surname of the Patient.</p>"
          },
          {
            "group": "body",
            "type": "Object",
            "optional": true,
            "field": "parents",
            "description": "<p>Data about parents of the Patient. The highEducation field can be ... The profession field is a free field</p>"
          },
          {
            "group": "body",
            "type": "Object",
            "optional": true,
            "field": "siblings",
            "description": "<p>Data about siblings of the Patient. The affected field can be yes or no. The gender field can be male or female</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "patientInfo",
            "description": "<p>patientId, name, and surname.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>If the patient has been created correctly, it returns the message 'Patient updated'.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"patientInfo\":\n {\n  \"sub\": \"1499bb6faef2c95364e2f4tt2c9aef05abe2c9c72110a4514e8c4c3fb038ff30\",\n  \"patientName\": \"Jhon\",\n  \"surname\": \"Doe\"\n },\n\"message\": \"Patient updated\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/user/patient.js",
    "groupTitle": "Patients"
  },
  {
    "type": "put",
    "url": "https://ayudamosvalencia.com/api/patient/status/:patientId",
    "title": "Update Status",
    "name": "updatePatientStatus",
    "description": "<p>This method allows to change the data of a patient.</p>",
    "group": "Patients",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "var data = {status: 'ontheway'};\nthis.http.put('https://ayudamosvalencia.com/api/patient/status/'+patientId, data)\n .subscribe( (res : any) => {\n   console.log('Message: '+ res.message);\n  }, (err) => {\n   ...\n  }",
        "type": "js"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Users unique access-key. For this, go to  <a href=\"#api-Access_token-signIn\">Get token</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"Bearer eyJ0eXAiOiJKV1QiLCJhbGciPgDIUzI1NiJ9.eyJzdWIiOiI1M2ZlYWQ3YjY1YjM0ZTQ0MGE4YzRhNmUyMzVhNDFjNjEyOThiMWZjYTZjMjXkZTUxMTA9OGVkN2NlODMxYWY3IiwiaWF0IjoxNTIwMzUzMDMwLCJlcHAiOjE1NTE4ODkwMzAsInJvbGUiOiJVc2VyIiwiZ3JvdDEiOiJEdWNoZW5uZSBQYXJlbnQgUHJfrmVjdCBOZXRoZXJsYW5kcyJ9.MloW8eeJ857FY7-vwxJaMDajFmmVStGDcnfHfGJx05k\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "patientId",
            "description": "<p>Patient unique ID. More info here:  <a href=\"#api-Patients-getPatientsUser\">Get patientId</a></p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "string",
            "allowedValues": [
              "\"new\"",
              "\"contacted\"",
              "\"pending\"",
              "\"ontheway\"",
              "\"contactlost\"",
              "\"helped\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>Status of the Patient.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>If the patient has been updated  correctly, it returns the message 'Updated'.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Updated\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/user/patient.js",
    "groupTitle": "Patients"
  },
  {
    "type": "get",
    "url": "https://ayudamosvalencia.com/api/users/:id",
    "title": "Get user",
    "name": "getUser",
    "version": "1.0.0",
    "group": "Users",
    "description": "<p>This methods read data of a User</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "this.http.get('https://ayudamosvalencia.com/api/users/'+userId)\n .subscribe( (res : any) => {\n   console.log(res.userName);\n}, (err) => {\n  ...\n}",
        "type": "js"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Users unique access-key. For this, go to  <a href=\"#api-Access_token-signIn\">Get token</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"Bearer eyJ0eXAiOiJKV1QiLCJhbGciPgDIUzI1NiJ9.eyJzdWIiOiI1M2ZlYWQ3YjY1YjM0ZTQ0MGE4YzRhNmUyMzVhNDFjNjEyOThiMWZjYTZjMjXkZTUxMTA9OGVkN2NlODMxYWY3IiwiaWF0IjoxNTIwMzUzMDMwLCJlcHAiOjE1NTE4ODkwMzAsInJvbGUiOiJVc2VyIiwiZ3JvdDEiOiJEdWNoZW5uZSBQYXJlbnQgUHJfrmVjdCBOZXRoZXJsYW5kcyJ9.MloW8eeJ857FY7-vwxJaMDajFmmVStGDcnfHfGJx05k\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User unique ID. More info here:  <a href=\"#api-Access_token-signIn\">Get token and userId</a></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>UserName of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lang",
            "description": "<p>lang of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "group",
            "description": "<p>Group of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "signupDate",
            "description": "<p>Signup date of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"user\":\n {\n  \"email\": \"John@example.com\",\n  \"userName\": \"Doe\",\n  \"lang\": \"en\",\n  \"group\": \"nameGroup\",\n  \"signupDate\": \"2018-01-26T13:25:31.077Z\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n    {\n      \"error\": \"UserNotFound\"\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/all/user.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "https://ayudamosvalencia.com/api/users/:id",
    "title": "Update user",
    "name": "updateUser",
    "version": "1.0.0",
    "description": "<p>This method allows to change the user's data</p>",
    "group": "Users",
    "examples": [
      {
        "title": "Example usage:",
        "content": "this.http.put('https://ayudamosvalencia.com/api/users/'+userId, this.user)\n .subscribe( (res : any) => {\n   console.log('User update: '+ res.user);\n  }, (err) => {\n   ...\n  }",
        "type": "js"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Users unique access-key. For this, go to  <a href=\"#api-Access_token-signIn\">Get token</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"Bearer eyJ0eXAiOiJKV1QiLCJhbGciPgDIUzI1NiJ9.eyJzdWIiOiI1M2ZlYWQ3YjY1YjM0ZTQ0MGE4YzRhNmUyMzVhNDFjNjEyOThiMWZjYTZjMjXkZTUxMTA9OGVkN2NlODMxYWY3IiwiaWF0IjoxNTIwMzUzMDMwLCJlcHAiOjE1NTE4ODkwMzAsInJvbGUiOiJVc2VyIiwiZ3JvdDEiOiJEdWNoZW5uZSBQYXJlbnQgUHJfrmVjdCBOZXRoZXJsYW5kcyJ9.MloW8eeJ857FY7-vwxJaMDajFmmVStGDcnfHfGJx05k\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User unique ID. More info here:  <a href=\"#api-Access_token-signIn\">Get token and userId</a></p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "userName",
            "description": "<p>UserName of the User.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "lang",
            "description": "<p>lang of the User.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>UserName of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lang",
            "description": "<p>lang of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "group",
            "description": "<p>Group of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "signupDate",
            "description": "<p>Signup date of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"user\":\n {\n  \"email\": \"John@example.com\",\n  \"userName\": \"Doe\",\n  \"lang\": \"en\",\n  \"group\": \"nameGroup\",\n  \"signupDate\": \"2018-01-26T13:25:31.077Z\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n    {\n      \"error\": \"UserNotFound\"\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/all/user.js",
    "groupTitle": "Users"
  }
] });
