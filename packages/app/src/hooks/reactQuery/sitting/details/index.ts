import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { GetSittingDetailsData, Params } from './types';

const getSittingDetailsData = async (params: Params): Promise<GetSittingDetailsData> => {
	const url = new URL(`/sitting/${params.id}`);

	const { data }: AxiosResponse<GetSittingDetailsData> = await api.get(url.toString());
	return data;
};

const useGetSittingDetailsData = (
	params: Params,
): UseQueryResult<GetSittingDetailsData, Error> => {
	return useQuery({
		queryKey: ['sittingDetailsData', params.id],
		queryFn: async () => getSittingDetailsData(params),
	});
};

export default useGetSittingDetailsData;
