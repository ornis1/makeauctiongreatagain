/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosRequestConfig } from "axios";
type movie = {
	id: number;
	imdb_id: string;
	popularity: number;
	title: string;
	videos?: { results: video[] };
};
type video = {
	id: string;
	key: string;
	site: string;
};
type data = {
	results: movie[];
};
class Tmdb {
	client = axios.create();
	key = "6c789b97c269e57a2df3bcbc30f04173";
	endpoint = "https://api.themoviedb.org/3";
	language = "ru-RU";

	async search(query = ""): Promise<{ data: data }> {
		const { client, endpoint } = this;
		const url = endpoint + "/search/multi";
		try {
			return client({
				method: "GET",
				url,
				params: {
					query,
					api_key: this.key,
					language: this.language,
					append_to_response: "videos"
				}
			});
		} catch (e) {
			console.error(e);
			throw e;
		}
	}
	async getTrailerKey(query: string): Promise<string> {
		// Ищу фильм по названию
		const response: { data: data } = await this.search(query);
		const results = response.data.results.sort((a, b) => {
			return b.popularity - a.popularity;
		});

		// Если нет результа, возвращаем пустую строку
		if (!results.length) return "";

		// id первого фильма из найденых
		const id = results[0]?.id;

		const { client, endpoint } = this;
		const url = endpoint + `/movie/${id}`;

		const options: AxiosRequestConfig = {
			method: "GET",
			url,
			params: {
				append_to_response: "videos",
				api_key: this.key,
				language: this.language
			}
		};

		const optionsRU = { ...options };
		const optionsEN = {
			...options,
			params: {
				...options.params,
				language: "en-US"
			}
		};

		try {
			const responseRU: { data: movie } = await client(optionsRU);
			const responseEN: { data: movie } = await client(optionsEN);

			// нужно вернуть ссылку на трейлер
			const linkRU = responseRU?.data?.videos?.results[0]?.key;
			const linkEN = responseEN?.data?.videos?.results[0]?.key;
			return linkRU ? linkRU : linkEN ? linkEN : "";
		} catch (e) {
			console.error(e);
			throw e;
		}
	}
}
export default new Tmdb();
