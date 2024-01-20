import { Gender, Size } from '../../../../../types';

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
