import { SvgProps } from 'react-native-svg';

export type Props = {
	placeholder: string;
	hideText?: boolean;
	value: string;
	onChange: (text: string) => void;
	icon?: React.FC<SvgProps>;
	className?: string;
	iconClassName?: string;
	textInputClassName?: string;
};
