import { UserType } from '../../../../types';

export type BodyData = {
	display_name: string;
	email: string;
	password: string;
	type: UserType;
	country: string;
};
