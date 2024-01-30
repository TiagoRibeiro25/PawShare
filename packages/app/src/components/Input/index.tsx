import React, { createRef } from 'react';
import { KeyboardTypeOptions, TextInput, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import Icon from '../Icon';

type Props = {
	placeholder: string;
	hideText?: boolean;
	value: string;
	onChange: (text: string) => void;
	icon?: React.FC<SvgProps>;
	className?: string;
	iconClassName?: string;
	textInputClassName?: string;
	multiLine?: boolean;
	numberOfLines?: number;
	keyboardType?: KeyboardTypeOptions;
};

const Input: React.FC<Props> = ({
	placeholder,
	hideText,
	value,
	onChange,
	icon,
	className,
	iconClassName,
	textInputClassName,
	multiLine,
	numberOfLines,
	keyboardType,
}): React.JSX.Element => {
	const inputRef = createRef<TextInput>();

	return (
		<View
			className={`flex flex-row items-center justify-center px-4 space-x-2 border-2 rounded-xl border-secondary-500 ${className}`}
		>
			{icon && (
				<Icon
					icon={icon}
					className={iconClassName || ''}
					onPress={() => inputRef.current?.focus()}
				/>
			)}
			<TextInput
				ref={inputRef}
				placeholder={placeholder}
				className={`text-lg font-zen-kaku-gothic-new-medium w-full ${textInputClassName}`}
				value={value}
				onChangeText={onChange}
				secureTextEntry={hideText || false}
				multiline={multiLine || false}
				numberOfLines={numberOfLines || 1}
				keyboardType={keyboardType || 'default'}
			/>
		</View>
	);
};

export default Input;
