import { Gender, Size } from '../../../types';

export type FormData = {
	picture: string | undefined;
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
