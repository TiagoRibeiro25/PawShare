import React from 'react';
import { View } from 'react-native';
import { Props } from './types';

// eslint-disable-next-line @typescript-eslint/no-shadow
const Icon: React.FC<Props> = ({ className, Icon }): React.JSX.Element => {
	return (
		<View className={className}>
			<Icon />
		</View>
	);
};

export default Icon;
