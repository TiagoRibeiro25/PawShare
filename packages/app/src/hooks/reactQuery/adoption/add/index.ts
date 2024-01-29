import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { AddAdoptionData, RequestData } from './types';

const addAdoption = async (requestData: RequestData): Promise<AddAdoptionData> => {
	const { data }: AxiosResponse<AddAdoptionData> = await api.post(
		`/adoption?animal_id=${requestData.animalId}`,
		requestData.bodyData,
	);

	return data;
};

const useAddAdoption = (
	requestData: RequestData,
): UseMutationResult<AddAdoptionData, Error> => {
	return useMutation({
		mutationFn: async () => await addAdoption(requestData),
	});
};

export default useAddAdoption;
