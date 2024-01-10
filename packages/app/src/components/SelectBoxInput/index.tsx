import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
	value: boolean;
	onPress: (newValue: boolean) => void;
	text: string;
	textClassName?: string;
	className?: string;
	squareClassName?: string;
};

const SelectBoxInput: React.FC<Props> = ({
	value,
	onPress,
	text,
	textClassName,
	className,
	squareClassName,
}): React.JSX.Element => {
	const [selected, setSelected] = React.useState<boolean>(value);

	const handlePress = (): void => {
		setSelected(!selected);
		onPress(!selected);
	};

	useEffect(() => {
		setSelected(value);
	}, [value]);

	return (
		<View className={`flex flex-row items-center ${className}`}>
			<TouchableOpacity
				activeOpacity={0.9}
				onPress={handlePress}
				className={`w-4 h-4 border-2 rounded-sm border-secondary-500 ${
					selected ? 'bg-secondary-500' : 'bg-transparent'
				} ${squareClassName}`}
			/>
			<TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
				<Text
					className={`ml-2 text-base font-zen-kaku-gothic-new-medium text-secondary-500 mb-0.5 ${textClassName}`}
				>
					{text}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SelectBoxInput;
