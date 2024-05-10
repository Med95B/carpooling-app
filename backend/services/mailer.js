import nodemailer from 'nodemailer';

//configuration mailtrap
/*
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "34e265d1634b3e",
      pass: "4d4147843901f6"
    }
  });

export default transport;
*/

//configuration gmail
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  service: process.env.SMTP_SERVICE,
  auth:{
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
  },
});

export default transporter
