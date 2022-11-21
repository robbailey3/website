import axios, { AxiosInstance } from 'axios';
import firebaseService from '@services/firebase';
import { ApiResponse } from '../../../types/ApiResponse';

class AdminPhotosService {
	public http: AxiosInstance;

	constructor() {
		this.http = axios.create({
			baseURL: '/api/photos'
		});
	}

	public async get() {
		const token = await firebaseService.getToken();

		const response = await this.http.get<ApiResponse<any>>('/', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		return response.data.result;
	}
}

export default new AdminPhotosService();
