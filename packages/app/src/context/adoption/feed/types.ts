import { Gender, Size } from '../../../types';

export type AdoptionFeedContextProps = {
	type: string;
	setType: React.Dispatch<React.SetStateAction<string>>;

	region: string;
	setRegion: React.Dispatch<React.SetStateAction<string>>;

	size: Size;
	setSize: React.Dispatch<React.SetStateAction<Size>>;

	gender: Gender;
	setGender: React.Dispatch<React.SetStateAction<Gender>>;

	color: string;
	setColor: React.Dispatch<React.SetStateAction<string>>;
};
