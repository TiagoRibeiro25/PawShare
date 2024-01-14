export type Props = {
	owner: {
		id: number;
		display_name: string;
		picture: string;
	};
	description?: string;
	notes: string[];
	contact: {
		email: string;
		phone: string;
	};
};
