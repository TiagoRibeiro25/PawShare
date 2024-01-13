import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { JoinAdoptersListData, Params } from './types';

const joinAdoptersList = async (params: Params): Promise<JoinAdoptersListData> => {
	try {
		const { data }: AxiosResponse<JoinAdoptersListData> = await api.post(
			`/adoption/${params.adoptionId}/requested`,
		);

		return data;
	} catch (error: any) {
		return error?.response?.data || { success: false, message: 'An error has occurred' };
	}
};

const useJoinAdoptersList = (
	params: Params,
): UseMutationResult<JoinAdoptersListData, Error> => {
	return useMutation({
		mutationFn: async () => await joinAdoptersList(params),
	});
};

export default useJoinAdoptersList;
