import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { AddAdoptionData, BodyData } from './types';

const addAdoption = async (bodyData: BodyData): Promise<AddAdoptionData> => {
	const { data }: AxiosResponse<AddAdoptionData> = await api.post('/adoption', bodyData);

	return data;
};

const useAddAdoption = (bodyData: BodyData): UseMutationResult<AddAdoptionData, Error> => {
	return useMutation({
		mutationFn: async () => await addAdoption(bodyData),
	});
};

export default useAddAdoption;
