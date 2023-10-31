import nodemailer from 'nodemailer';

// Create Email Sender Function
const sendEmail = async (options) => {
  // Create Email transporter that sends email to the user
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Options for sending Email
  const emailOptions = {
    from: process.env.EMAIL_SENDER,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  // Send Email
  await transporter.sendMail(emailOptions, function (err, infos) {
    if (err) {
      console.log(err);
    } else {
      console.log(infos);
    }
  });
};

export default sendEmail;
