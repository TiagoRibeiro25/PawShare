import React from 'react';
import { Text } from 'react-native';

type Props = {
	direction: 'prev' | 'next';
};

const SwipeButton: React.FC<Props> = ({ direction }): React.JSX.Element => {
	return (
		<Text className="text-3xl text-secondary-500 font-zen-kaku-gothic-new-medium">
			{direction === 'prev' ? '<' : '>'}
		</Text>
	);
};

export default SwipeButton;
