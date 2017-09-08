"use strict";
exports.__esModule = true;
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: 'zmy@foreverz.cn',
    pass: 'zhvahtfgobmnbfig' // generated ethereal password
  }
});

function sendMail(subject, html) {
  var mailOptions = {
    from: '"剑来" <zmy@foreverz.cn',
    to: 'zmy@foreverz.cn',
    subject: subject,
    html: html // html body
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}
module.exports = sendMail;