import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { APIResponse } from '../../../../api/types';
import { BodyData } from './types';

const forgotPassword = async (bodyData: BodyData): Promise<APIResponse> => {
	const { data }: AxiosResponse<APIResponse> = await api.post(
		'/auth/request-reset-password',
		bodyData,
	);
	return data;
};

const useForgotPassword = (bodyData: BodyData): UseMutationResult<APIResponse, Error> => {
	return useMutation({
		mutationFn: async () => await forgotPassword(bodyData),
	});
};

export default useForgotPassword;
