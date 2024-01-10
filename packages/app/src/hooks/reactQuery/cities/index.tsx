import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../api';
import { GetCitiesData, Params } from './types';

const getCitiesData = async (params: Params): Promise<GetCitiesData> => {
	const url = new URL('/cities');

	if (params.search.trim().toLowerCase() !== '') {
		url.searchParams.append('search', params.search.trim());
	}

	const { data }: AxiosResponse<GetCitiesData> = await api.get(url.toString());
	return data;
};

const useGetCitiesData = (params: Params): UseQueryResult<GetCitiesData, Error> => {
	return useQuery({
		queryKey: ['getCitiesData', params.search],
		queryFn: async () => getCitiesData(params),
		retry: false,
		enabled: false,
	});
};

export default useGetCitiesData;
