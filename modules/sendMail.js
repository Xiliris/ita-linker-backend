require("dotenv").config();
const nodeMailer = require("nodemailer");
const htmlTemplate = require("./htmlTemplate");

module.exports = async (userEmail, newPassword, accountType) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.serviceEmail,
      pass: process.env.servicePassword,
    },
  });

  const mailOptions = {
    from: process.env.serviceEmail,
    to: userEmail,
    subject: "Vas novi password.",
    html: htmlTemplate(newPassword, accountType),
  };

  const sendMail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.log(err);
    }
  };

  sendMail(transporter, mailOptions);
};
