import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { GetSittingFeedData, Params } from './types';

const getSittingFeedData = async (params: Params): Promise<GetSittingFeedData> => {
	const url = new URL('/sitting');

	url.searchParams.append('page', params.page.toString());
	url.searchParams.append('limit', params.limit.toString());

	if (params.type.toLowerCase() !== 'any') {
		url.searchParams.append('type', params.type);
	}

	if (params.city.trim().length > 0 && params.city.trim().toLowerCase() !== 'any') {
		url.searchParams.append('city', params.city);
	}

	if (params.size.toLowerCase() !== 'any') {
		url.searchParams.append('size', params.size);
	}

	if (params.gender.toLowerCase() !== 'any') {
		url.searchParams.append('gender', params.gender);
	}

	if (params.color.toLowerCase() !== 'any') {
		url.searchParams.append('color', params.color);
	}

	if (params.coins > 0) {
		url.searchParams.append('coins', params.coins.toString());
	}

	const { data }: AxiosResponse<GetSittingFeedData> = await api.get(url.toString());
	return data;
};

const useGetSittingFeedData = (params: Params): UseQueryResult<GetSittingFeedData, Error> => {
	return useQuery({
		queryKey: ['sittingFeedData', params.page, params.limit],
		queryFn: async () => getSittingFeedData(params),
		retry: false,
	});
};

export default useGetSittingFeedData;
