import nodemailer from 'nodemailer';

// Create Email Sender Function
const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  // Create Email transporter that sends email to the user
  const transporter = nodemailer.createTransport({
    // service: "Gmail",
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Options for sending Email
  const options = {
    from: 'Clineflix support<support@Clineflix.com>',
    // form: sent_from,
    to: send_to,
    reployTo: reply_to,
    subject: subject,
    html: message,
  };

  // Send Email
  await transporter.sendMail(options, function (err, infos) {
    if (err) {
      console.log(err);
    } else {
      console.log(infos);
    }
  });
};

export default sendEmail;
