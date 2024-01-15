import { Animal } from '../../../../../hooks/reactQuery/animals/details/types';
import { Gender, Size } from '../../../../../types';

export type Props = {
	animal: Animal;
};

export type FormData = {
	name: string;
	type: string;
	gender: Gender;
	color: string;
	size: Size;
	description: string;
};

export type ValidateDataResult = {
	valid: boolean;
	message?: string;
};
