import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { BodyData, LoginData } from './types';

const login = async (bodyData: BodyData): Promise<LoginData> => {
	const { data }: AxiosResponse<LoginData> = await api.post('/auth/login', bodyData);
	return data;
};

const useLogin = (bodyData: BodyData): UseMutationResult<LoginData, Error> => {
	return useMutation({
		mutationFn: async () => await login(bodyData),
	});
};

export default useLogin;
