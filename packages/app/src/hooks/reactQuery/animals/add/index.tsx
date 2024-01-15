import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { AddAnimalData, BodyData } from './types';

const addAnimal = async (bodyData: BodyData): Promise<AddAnimalData> => {
	const { data }: AxiosResponse<AddAnimalData> = await api.post('/animals', bodyData);
	return data;
};

const useAddAnimal = (bodyData: BodyData): UseMutationResult<AddAnimalData, Error> => {
	return useMutation({
		mutationFn: async () => await addAnimal(bodyData),
	});
};

export default useAddAnimal;
