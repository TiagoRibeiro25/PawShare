import { SvgProps } from 'react-native-svg';

export type Screen = {
	name: string;
	displayName: string;
	icon: React.FC<SvgProps>;
};
