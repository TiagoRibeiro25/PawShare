import React, { createRef } from 'react';
import { TextInput, View } from 'react-native';
import Icon from '../Icon';
import { Props } from './types';

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
			/>
		</View>
	);
};

export default Input;
