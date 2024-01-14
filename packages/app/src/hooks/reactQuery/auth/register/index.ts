import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../api/types';
import api from '../../../../api';
import { BodyData } from './types';

const register = async (bodyData: BodyData): Promise<APIResponse> => {
	try {
		const { data }: AxiosResponse<APIResponse> = await api.post('/auth/register', bodyData);
		return data;
	} catch (error: any) {
		return error?.response?.data || { success: false, message: 'An error has occurred' };
	}
};

const useRegister = (bodyData: BodyData): UseMutationResult<APIResponse, Error> => {
	return useMutation({
		mutationFn: async () => await register(bodyData),
	});
};

export default useRegister;
