// eorr ntcs ucjl whpa
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// create way to send mail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export default transporter;
