/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */

require("dotenv").config();
const cors = require("cors");
const express = require("express"); // Express web server framework
const querystring = require("querystring");

const app = express();
app.use(express.static(__dirname + "/public")).use(cors());

app.get("/login", function(req, res) {
	// your application requests authorization
	const scope = "oauth-donation-subscribe oauth-user-show oauth-donation-index";
	const url =
		"https://www.donationalerts.com/oauth/authorize?show_dialog=true&" +
		querystring.stringify({
			client_secret: process.env.APP_ID || "",
			client_id: process.env.KEY || "",
			redirect_uri: "http://localhost:8080/callback",
			response_type: "token",
			scope
		});
	res.redirect(url);
});

app.listen(8888);
