import React from 'react';
import { Text } from 'react-native';
import Button from '../../../Button';
import { Props } from './types';

const NavigateBackButton: React.FC<Props> = ({ onPress }): React.JSX.Element => {
	return (
		<Button className="rounded-full w-14 h-14 bg-accent-200" onPress={onPress}>
			<Text className="ml-0.5 text-4xl text-center text-secondary-500 font-zen-kaku-gothic-new-medium">
				{'<'}
			</Text>
		</Button>
	);
};

export default NavigateBackButton;
