import React from 'react';
import { Text, View } from 'react-native';
import { Props } from './types';

const SwipeButton: React.FC<Props> = ({ direction }): React.JSX.Element => {
	return (
		<View className="flex justify-center rounded-full w-14 h-14 bg-accent-200">
			<Text className="text-4xl text-center text-secondary-500 font-zen-kaku-gothic-new-medium">
				{direction === 'prev' ? '<' : '>'}
			</Text>
		</View>
	);
};

export default SwipeButton;
