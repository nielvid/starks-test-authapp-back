
// Googleapis
const { google } = require("googleapis");
const nodemailer = require('nodemailer')

// Pull out OAuth2 from googleapis
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
// 1
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID_MAILER,
    process.env.CLIENT_SECRET_MAILER,
    "https://developers.google.com/oauthplayground"
  );

// 2
  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :( " + err);
      }
      resolve(token);
    });
  });

// 3
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.SENDER, 
      accessToken,
      clientId: process.env.CLIENT_ID_MAILER,
      clientSecret:  process.env.CLIENT_SECRET_MAILER,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });
  
  return transporter;
};

module.exports = {createTransporter}