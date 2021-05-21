const nodemailer = require('nodemailer');
require('custom-env').env();

const sendMail = (contentMail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: 'mail@mail.com',
          clientId: '',
          clientSecret: '',
          refreshToken: '',
          accessToken: '',
        }
      });

      let mailOptions = {
        from: contentMail.from,
        to: contentMail.to,
        subject: contentMail.subject,
        html: contentMail.html,
      };

      if (contentMail.img) {
        mailOptions.attachments = [{
          filename: 'img.jpg',
          content: contentMail.img.split("base64,")[1],
          encoding: 'base64'
        }]
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error + " " + "000");
        } else {
          console.log('Email sent: ' + info.response);
          resolve(info.response)
        }
      });

    } catch (err) {
      reject(err)
    }
  })



}

module.exports = sendMail;
