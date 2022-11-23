import axios, { AxiosInstance } from 'axios';
import { ApiResponse } from '@models/ApiResponse';

const BASE_URL = 'http://localhost:8080/api';

export function useHttp() {
	const http: AxiosInstance = axios.create({
		baseURL: BASE_URL
	});

	const setAuthToken = (token: string) => {
		http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	};

	const httpGet = async <T>(
		path: string,
		params?: Record<string, string | number>
	) => {
		const response = await http.get<ApiResponse<T>>(path, {
			params
		});
		return response.data.result;
	};

	return { setAuthToken, httpGet };
}
