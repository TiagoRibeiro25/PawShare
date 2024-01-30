import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { AddSittingData, RequestData } from './types';

const addSitting = async (requestData: RequestData): Promise<AddSittingData> => {
	const { data }: AxiosResponse<AddSittingData> = await api.post(
		`/sitting?animal_id=${requestData.animalId}`,
		requestData.bodyData,
	);

	return data;
};

const useAddSitting = (requestData: RequestData): UseMutationResult<AddSittingData, Error> => {
	return useMutation({
		mutationFn: async () => await addSitting(requestData),
	});
};

export default useAddSitting;
