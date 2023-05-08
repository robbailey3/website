import axios, { Axios } from 'axios';

class HttpService {
	private readonly BASE_URL = import.meta.env.DEV
		? 'http://localhost:8080/api'
		: '/api';

	private instance: Axios;

	constructor() {
		this.instance = axios.create({ baseURL: this.BASE_URL });
	}

	// TODO: Handle non 2xx responses

	public async get<T>(url: string) {
		const response = await this.instance.get<T>(url);

		return response.data;
	}

	public async post<T>(url: string, data: any) {
		const response = await this.instance.post<T>(url, data);

		return response.data;
	}
}

export default new HttpService();
