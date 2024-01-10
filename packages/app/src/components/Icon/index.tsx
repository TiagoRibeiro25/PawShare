import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Props } from './types';

// eslint-disable-next-line @typescript-eslint/no-shadow
const Icon: React.FC<Props> = ({ className, Icon, onPress }): React.JSX.Element => {
	return (
		<>
			{onPress ? (
				<TouchableOpacity className={className} onPress={onPress} activeOpacity={1}>
					<Icon />
				</TouchableOpacity>
			) : (
				<View className={className}>
					<Icon />
				</View>
			)}
		</>
	);
};

export default Icon;
