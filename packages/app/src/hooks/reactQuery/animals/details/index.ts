import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { GetAnimalProfileData, Params } from './types';

const getAnimalProfileData = async (params: Params): Promise<GetAnimalProfileData> => {
	const url = new URL(`/animals/${params.id}`);

	const { data }: AxiosResponse<GetAnimalProfileData> = await api.get(url.toString());
	return data;
};

const useGetAnimalProfileData = (
	params: Params,
): UseQueryResult<GetAnimalProfileData, Error> => {
	return useQuery({
		queryKey: ['AnimalProfileData', params.id],
		queryFn: async () => getAnimalProfileData(params),
	});
};

export default useGetAnimalProfileData;
