import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'zmy@foreverz.cn', // generated ethereal user
    pass: 'zhvahtfgobmnbfig'  // generated ethereal password
  }
})


function sendMail(subject: string, html: string) {

  const mailOptions = {
    from: '"剑来" <zmy@foreverz.cn', // sender address
    to: 'zmy@foreverz.cn', // list of receivers
    subject: subject, // Subject line
    html: html // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

export default sendMail;