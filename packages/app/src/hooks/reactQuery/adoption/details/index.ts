import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { GetAdoptionDetailsData, Params } from './types';

const getAdoptionDetailsData = async (params: Params): Promise<GetAdoptionDetailsData> => {
	const url = new URL(`/adoption/${params.id}`);

	const { data }: AxiosResponse<GetAdoptionDetailsData> = await api.get(url.toString());
	return data;
};

const useGetAdoptionDetailsData = (
	params: Params,
): UseQueryResult<GetAdoptionDetailsData, Error> => {
	return useQuery({
		queryKey: ['adoptionDetailsData', params.id],
		queryFn: async () => getAdoptionDetailsData(params),
	});
};

export default useGetAdoptionDetailsData;
