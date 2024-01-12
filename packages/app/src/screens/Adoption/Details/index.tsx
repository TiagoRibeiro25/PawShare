import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import AnimatedScreen from '../../../components/AnimatedScreen';
import { RootStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AdoptionDetails'>;

const AdoptionDetails: React.FC<Props> = ({ route }): React.JSX.Element => {
	return (
		<AnimatedScreen animation="SlideInFromRight">
			<Text>{route.params.id}</Text>
		</AnimatedScreen>
	);
};

export default AdoptionDetails;
