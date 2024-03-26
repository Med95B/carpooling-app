import nodemailer from 'nodemailer';

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "34e265d1634b3e",
      pass: "4d4147843901f6"
    }
  });

export default transport;

