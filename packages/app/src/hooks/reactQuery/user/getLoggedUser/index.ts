import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { GetLoggedUserData } from './types';

const getLoggedUser = async (): Promise<GetLoggedUserData> => {
	try {
		const { data }: AxiosResponse<GetLoggedUserData> = await api.get('/users/me');
		return data;
	} catch (error: any) {
		return error?.response?.data || { success: false, message: 'An error has occurred' };
	}
};

const useGetLoggedUser = (): UseQueryResult<GetLoggedUserData, Error> => {
	return useQuery({
		queryKey: ['loggedUser'],
		queryFn: getLoggedUser,
		retry(failureCount: number) {
			return failureCount < 2; // Retry 3 times
		},
	});
};

export default useGetLoggedUser;
