import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { GetUserData, Params } from './types';

const getUser = async (params: Params): Promise<GetUserData> => {
	const { data }: AxiosResponse<GetUserData> = await api.get(`/users/${params.id}`);
	return data;
};

const useGetUser = (params: Params): UseQueryResult<GetUserData, Error> => {
	return useQuery({
		queryKey: ['user', params.id],
		queryFn: async () => getUser(params),
		retry(failureCount: number) {
			return failureCount < 2; // Retry 3 times
		},
	});
};

export default useGetUser;
