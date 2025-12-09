import axios from 'axios';
import { useAuthStore } from '../store/GymUserStore';

const authApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL + `/api/v1`,
	headers: {
		'Content-Type': 'application/json',
	},
});

authApi.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().accessToken;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

authApi.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response && error.response.status === 401) {
			localStorage.removeItem('accessToken');
			window.location.href = '/login';
		}
		return Promise.reject(error);
	},
);

export default authApi;
