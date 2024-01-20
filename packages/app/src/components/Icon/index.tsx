import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

type Props = {
	icon: React.FC<SvgProps>;
	className?: string;
	onPress?: () => void;
};

const Icon: React.FC<Props> = ({ className, icon, onPress }): React.JSX.Element => {
	const IconComponent = icon;

	return (
		<>
			{onPress ? (
				<TouchableOpacity className={className} onPress={onPress} activeOpacity={1}>
					<IconComponent />
				</TouchableOpacity>
			) : (
				<View className={className}>
					<IconComponent />
				</View>
			)}
		</>
	);
};

export default Icon;
