// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
// import config from "./config.js";
import dotenv from "dotenv";
dotenv.config();

// const email = process.env.USER_EMAIL;
const email = "mohd.shees102@gmail.com";
const password = "aA9560754295";
// const password = process.env.PASSWORD;
var transporter = nodemailer.createTransport({
  // host: "logo-app.herokuapp.com",
  // port: 587,
  // secure: false,
  service: "gmail",
  auth: {
    user: email, // your email address to send email from
    pass: password, // your gmail account password
  },
});

export default transporter;
