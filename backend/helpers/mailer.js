const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const { OAuth2 } = google.auth;

const oauth_link = " https://developers.google.com/oauthplayground";

const { OAUTH_CLIENT_SECRET_ID, OAUTH_SECRET_KEY, REFRESH_TOKEN, OAUTH_EMAIL } =
	process.env;

const oauth2Client = new OAuth2(
	OAUTH_CLIENT_SECRET_ID,
	OAUTH_SECRET_KEY,
	REFRESH_TOKEN,
	oauth_link
);

exports.sendVerificationEmail = (email, name, url) => {
	oauth2Client.setCredentials({
		refresh_token: REFRESH_TOKEN,
	});
	const accessToken = oauth2Client.getAccessToken();

	const stmp = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: OAUTH_EMAIL,
			clientId: OAUTH_CLIENT_SECRET_ID,
			clientSecret: OAUTH_SECRET_KEY,
			refreshToken: REFRESH_TOKEN,
			accessToken,
		},
	});

	const mailOptions = {
		from: OAUTH_EMAIL,
		to: email,
		subject: "App email verification.",
		html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta http-equiv="X-UA-Compatible" content="IE=edge"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Document</title></head><body><header style="font-family: 'Times New Roman', Times, sans-serif"><h2>Activate your<span style="font-weight: 800; color: purple"> BeConnected</span> App access.</h2><hr/><h3>Hello, ${name}</h3><p style="width: 300px; line-height: 22px; margin-bottom: 40px">You recently created an account on BeConnected. To complete yourregistration, please confirm your account.</p><a href=${url} style="width: 200px;padding: 10px;background: purple;color: white;text-decoration: none;">Confirm your account</a><hr style="margin-top: 50px"/></header></body></html>`,
	};
	stmp.sendMail(mailOptions, (err, res) => {
		if (err) return err;
		return res;
	});
};
