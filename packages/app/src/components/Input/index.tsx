import React, { createRef } from 'react';
import { TextInput, View } from 'react-native';
import Icon from '../Icon';
import { Props } from './types';

// TODO(tiago): If the input is on focus and the user clicks outside of it, the input should stop being on focus
const Input: React.FC<Props> = ({
	placeholder,
	hideText,
	value,
	onChange,
	icon,
	className,
	iconClassName,
	textInputClassName,
}): React.JSX.Element => {
	const inputRef = createRef<TextInput>();

	return (
		<View
			className={`flex flex-row items-center justify-center px-4 space-x-2 border rounded-xl border-secondary-500 ${className}`}
		>
			{icon && (
				<Icon
					Icon={icon}
					className={iconClassName || ''}
					onPress={() => inputRef.current?.focus()}
				/>
			)}
			<TextInput
				ref={inputRef}
				placeholder={placeholder}
				className={`text-lg font-zen-kaku-gothic-new-medium ${textInputClassName}`}
				value={value}
				onChangeText={onChange}
				secureTextEntry={hideText || false}
			/>
		</View>
	);
};

export default Input;
