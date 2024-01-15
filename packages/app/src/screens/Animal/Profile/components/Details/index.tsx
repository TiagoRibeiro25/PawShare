import React from 'react';
import { Text } from 'react-native';
import AnimatedScreen from '../../../../../components/AnimatedScreen';
import { Props } from './types';

const AnimalDetails: React.FC<Props> = ({ animal }): React.JSX.Element => {
	return (
		<AnimatedScreen animation="FadeIn">
			<Text>AnimalDetails</Text>
			<Text>{JSON.stringify(animal)}</Text>
		</AnimatedScreen>
	);
};

export default AnimalDetails;
