import React from 'react';
import { TouchableOpacity } from 'react-native';

type Props = {
	disabled?: boolean;
	className?: string;
	children: React.ReactNode;
	activeOpacity?: number;
	onPress?: () => void | Promise<void>;
} & React.ComponentProps<typeof TouchableOpacity>;

const Button: React.FC<Props> = ({
	disabled,
	className,
	children,
	activeOpacity,
	...props
}): React.JSX.Element => {
	return (
		<TouchableOpacity
			disabled={disabled}
			className={`flex flex-row items-center justify-center px-4 py-2 rounded-md ${className}`}
			activeOpacity={activeOpacity || 0.7}
			{...props}
		>
			{children}
		</TouchableOpacity>
	);
};

export default Button;
