import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { Data, UpdateAnimalData } from './types';

const updateAnimal = async (requestData: Data): Promise<UpdateAnimalData> => {
	const { animalId, ...bodyData } = requestData;

	const requestBody: Record<string, unknown> = {};

	bodyData.dataToUpdate.forEach((key: string) => {
		// @ts-ignore
		requestBody[key] = bodyData[key];
	});

	const { data }: AxiosResponse<UpdateAnimalData> = await api.patch(
		`/animals/${animalId}`,
		bodyData,
	);

	return data;
};

const useUpdateAnimal = (requestData: Data): UseMutationResult<UpdateAnimalData, Error> => {
	return useMutation({
		mutationFn: async () => await updateAnimal(requestData),
	});
};

export default useUpdateAnimal;
