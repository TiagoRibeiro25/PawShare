import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { BodyData, LoginData } from './types';

const login = async (bodyData: BodyData): Promise<LoginData> => {
	try {
		const { data }: AxiosResponse<LoginData> = await api.post('/auth/login', bodyData);
		return data;
	} catch (error: any) {
		return error?.response?.data || { success: false, message: 'An error has occurred' };
	}
};

const useLogin = (bodyData: BodyData): UseMutationResult<LoginData, Error> => {
	return useMutation({
		mutationFn: async () => await login(bodyData),
	});
};

export default useLogin;
