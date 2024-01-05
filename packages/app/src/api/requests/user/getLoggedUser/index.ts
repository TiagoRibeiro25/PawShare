import { type AxiosResponse } from 'axios';
import api from '../../../index';
import { type GetLoggedUserData, type Response } from './types';

export default async (): Promise<GetLoggedUserData> => {
	const response: AxiosResponse<Response> = await api.get('/users/me');
	const data = response.data;

	return {
		success: data.success,
		message: data.message,
		data: data?.data || {},
	};
};
