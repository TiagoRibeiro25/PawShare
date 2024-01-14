import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { JoinSittersListData, Params } from './types';

const joinSittersList = async (params: Params): Promise<JoinSittersListData> => {
	try {
		const { data }: AxiosResponse<JoinSittersListData> = await api.post(
			`/sitting/${params.sittingId}/requested`,
		);

		return data;
	} catch (error: any) {
		return error?.response?.data || { success: false, message: 'An error has occurred' };
	}
};

const useJoinSittersList = (params: Params): UseMutationResult<JoinSittersListData, Error> => {
	return useMutation({
		mutationFn: async () => await joinSittersList(params),
	});
};

export default useJoinSittersList;
