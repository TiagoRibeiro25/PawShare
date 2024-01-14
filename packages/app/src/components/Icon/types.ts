import { SvgProps } from 'react-native-svg';

export type Props = {
	icon: React.FC<SvgProps>;
	className?: string;
	onPress?: () => void;
};
