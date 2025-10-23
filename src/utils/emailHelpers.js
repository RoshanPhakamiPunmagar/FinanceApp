import nodemailer from "nodemailer";

export const sendMail = async (to, subject, body) => {
  const mailerObject = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(mailerObject);

  // send email
  const info = await transporter.sendMail({
    from: `"FT ADMIN" <${process.env.SMTP_USER}>`,
    to: to,
    subject: subject,
    html: body, // HTML body
  });

  console.log("Message sent:", info.messageId);
};
