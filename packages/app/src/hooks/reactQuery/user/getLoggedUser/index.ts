import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { GetLoggedUserData } from './types';

const getLoggedUser = async (): Promise<GetLoggedUserData> => {
	const { data }: AxiosResponse<GetLoggedUserData> = await api.get('/users/me');
	return data;
};

const useGetLoggedUser = (): UseQueryResult<GetLoggedUserData, Error> => {
	return useQuery({
		queryKey: ['loggedUser'],
		queryFn: getLoggedUser,
		retry(failureCount) {
			return failureCount < 2; // Retry 3 times
		},
	});
};

export default useGetLoggedUser;
