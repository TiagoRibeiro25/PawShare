import React from 'react';
import { Text, View } from 'react-native';
import { Props } from './types';

const SwipeButton: React.FC<Props> = ({ direction, index, length }): React.JSX.Element => {
	return (
		<>
			{(index === 0 && direction === 'prev') || (index === length && direction === 'next') ? (
				<View />
			) : (
				<View>
					<Text className="text-2xl font-bold text-secondary-500">
						{direction === 'prev' ? '<' : '>'}
					</Text>
				</View>
			)}
		</>
	);
};

export default SwipeButton;
