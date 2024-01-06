import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { GetAdoptionFeedData, Params } from './types';

const getAdoptionFeedData = async (params: Params): Promise<GetAdoptionFeedData> => {
	const { data }: AxiosResponse<GetAdoptionFeedData> = await api.get(
		`/adoption?page=${params.page}&limit=${params.limit}`,
	);
	return data;
};

const useGetAdoptionFeedData = (
	params: Params,
): UseQueryResult<GetAdoptionFeedData, Error> => {
	return useQuery({
		queryKey: ['adoptionFeedData', params.page, params.limit],
		queryFn: async () => getAdoptionFeedData(params),
	});
};

export default useGetAdoptionFeedData;
