import axios from 'axios';
import { useToken } from './useToken';
import configData from './../config.json';

export const useAxios = () => {
	const { token } = useToken();

	const baseURL =
		process.env.REACT_APP_API_ENDPOINT || configData.REACT_APP_API_ENDPOINT;

	const axiosInstance = axios.create({
		baseURL,
	});

	if (token) {
		axiosInstance.defaults.headers.common[
			'Authorization'
		] = `Bearer ${token.token}`;
	}

	return {
		axiosInstance,
	};
};
