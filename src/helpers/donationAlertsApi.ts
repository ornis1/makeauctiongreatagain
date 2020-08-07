/* eslint-disable @typescript-eslint/camelcase */

import axios, { AxiosRequestConfig } from "axios";
import querystring from "querystring";
type me = {
	data: {
		id: number;
		code: string;
		name: string;
		avatar: string;
		email: string;
		socket_connection_token: string;
	};
};

class DonationAlertsApi {
	private client = axios.create();
	private key: string | null = null;
	private endpoint = "https://www.donationalerts.com/api/v1";

	constructor() {
		this.client.interceptors.request.use(
			(config): AxiosRequestConfig => {
				if (!this.key) return config;
				const newConfig = { ...config };
				newConfig.headers["Authorization"] = `Bearer ${this.key}`;

				return newConfig;
			}
		);
	}
	public init(key: string | null = null) {
		this.key = key;
		return this;
	}

	// Donation alerts API don`t work!!!
	public async me(): Promise<me | void> {
		if (!this.key) return;

		const url = this.endpoint + "/user/oauth";
		const options: RequestInit = {
			method: "GET",
			mode: "no-cors",
			headers: {
				Authorization: `Bearer ${this.key}`
			}
		};

		return fetch(url, options).then(res => {
			console.log(res);
		});
	}

	login() {
		const scope = "oauth-donation-subscribe oauth-user-show";
		const url =
			"https://www.donationalerts.com/oauth/authorize?show_dialog=true&" +
			querystring.stringify({
				client_secret: "",
				client_id: "",
				redirect_uri: "http://localhost:8080/callback",
				response_type: "token",
				scope
			});
		location.href = url;
	}

	logout() {
		fetch("https://www.donationalerts.com/auth/logout", {
			method: "GET",
			mode: "no-cors"
		});
	}
}
export default DonationAlertsApi;
