import axios, { AxiosInstance } from 'axios';
import { ApiResponse } from '../types/ApiResponse';
import { FirebaseConfig } from '../types/FirebaseConfig';

class ConfigService {
	private readonly API_BASE = 'http://localhost:8080/api/config';
	private readonly http: AxiosInstance;

	constructor() {
		this.http = axios.create({
			baseURL: this.API_BASE
		});
	}

	public async getFirebaseConfig(): Promise<FirebaseConfig> {
		const response = await this.http.get<ApiResponse<FirebaseConfig>>(
			'/firebase'
		);
		return response.data.result;
	}
}

export default new ConfigService();
