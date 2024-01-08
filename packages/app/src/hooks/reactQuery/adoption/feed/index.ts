import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { GetAdoptionFeedData, Params } from './types';

const getAdoptionFeedData = async (params: Params): Promise<GetAdoptionFeedData> => {
	const url = new URL('/adoption');

	url.searchParams.append('page', params.page.toString());
	url.searchParams.append('limit', params.limit.toString());

	if (params.type.toLowerCase() !== 'any') {
		url.searchParams.append('type', params.type);
	}

	if (params.city.trim().length > 0) {
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

	const { data }: AxiosResponse<GetAdoptionFeedData> = await api.get(url.toString());
	return data;
};

const useGetAdoptionFeedData = (
	params: Params,
): UseQueryResult<GetAdoptionFeedData, Error> => {
	return useQuery({
		queryKey: ['adoptionFeedData', params.page, params.limit],
		queryFn: async () => getAdoptionFeedData(params),
		retry: false,
	});
};

export default useGetAdoptionFeedData;
