'use strict'

const { TRANSPORTER_OPTIONS, client_server} = require('../config')
const nodemailer = require('nodemailer')
var hbs = require('nodemailer-express-handlebars')

var options = {
     viewEngine: {
         extname: '.hbs',
         layoutsDir: 'views/email/',
         defaultLayout : 'template'
     },
     viewPath: 'views/email/',
     extName: '.hbs'
 };

 var transporter = nodemailer.createTransport(TRANSPORTER_OPTIONS);
 transporter.use('compile', hbs(options));

function sendMailVerifyEmail (email, userName, randomstring, lang, group){

  var subjectlang='AyudamosValencia - Activate the account';
  if(lang=='es'){
    subjectlang='AyudamosValencia - Activa la cuenta';
  }else if(lang=='uk'){
    subjectlang='AyudamosValencia - Активуйте обліковий запис';
  }
  const decoded = new Promise((resolve, reject) => {
    var maillistbcc = [
      TRANSPORTER_OPTIONS.auth.user,
      "maria.larrabe@foundation29.org"
    ];

    var mailOptions = {
      to: email,
      from: TRANSPORTER_OPTIONS.auth.user,
      bcc: maillistbcc,
      subject: subjectlang,
      template: 'verify_email/_'+lang,
      context: {
        client_server : client_server,
        email : email,
        userName : userName,
        key : randomstring
      }
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        sendMailFailSend(email)
        reject({
          status: 401,
          message: 'Fail sending email'
        })
      } else {
        resolve("ok")
      }
    });

  });
  return decoded
}

function sendMailFailSend (email){
    var maillistbcc = [
      TRANSPORTER_OPTIONS.auth.user,
      "maria.larrabe@foundation29.org"
    ];

    var emailToFinal = 'support@foundation29.org'
    var mailOptions = {
      to: emailToFinal,
      from: TRANSPORTER_OPTIONS.auth.user,
      bcc: maillistbcc,
      subject: 'Message for support. Fail email AyudamosValencia: '+ email,
      template: 'mail_support/fail',
      context: {
        email : email
      }
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('send ok');
      }
    });

  
}

function sendMailRecoverPass (email, userName, randomstring, lang){
  var subjectlang='AyudamosValencia - Account Recovery';
  if(lang=='es'){
    subjectlang='AyudamosValencia - Recuperación de la cuenta';
  }else if(lang=='uk'){
    subjectlang='AyudamosValencia - Відновлення облікового запису';
  }
  const decoded = new Promise((resolve, reject) => {

    var maillistbcc = [
      TRANSPORTER_OPTIONS.auth.user,
      "maria.larrabe@foundation29.org"
    ];

    var mailOptions = {
      to: email,
      from: TRANSPORTER_OPTIONS.auth.user,
      bcc: maillistbcc,
      subject: subjectlang,
      template: 'recover_pass/_'+lang,
      context: {
        client_server : client_server,
        email : email,
        key : randomstring,
        userName: userName
      }
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        sendMailFailSend(email)
        reject({
          status: 401,
          message: 'Fail sending email'
        })
      } else {
        resolve("ok")
      }
    });

  });
  return decoded
}

function sendMailSupport (email, lang, role, supportStored, emailTo){
  const decoded = new Promise((resolve, reject) => {
    var maillistbcc = [
      TRANSPORTER_OPTIONS.auth.user,
      "maria.larrabe@foundation29.org"
    ];

    var emailToFinal = 'support@foundation29.org'
    if(emailTo!=null){
      emailToFinal = emailTo;
    }

    var mailOptions = {
      to: emailToFinal,
      from: TRANSPORTER_OPTIONS.auth.user,
      bcc: maillistbcc,
      subject: 'Message for support. AyudamosValencia Id: '+ supportStored._id,
      template: 'mail_support/_en',
      context: {
        email : email,
        lang : lang,
        info: supportStored
      }
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        sendMailFailSend(email)
        reject({
          status: 401,
          message: 'Fail sending email'
        })
      } else {
        resolve("ok")
      }
    });

  });
  return decoded
}

module.exports = {
	sendMailVerifyEmail,
  sendMailRecoverPass,
  sendMailSupport
}
