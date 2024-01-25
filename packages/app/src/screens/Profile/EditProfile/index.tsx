import { useNavigation } from '@react-navigation/native';
import React from 'react';
import AnimatedScreen from '../../../components/AnimatedScreen';
import DetailsHeader from '../../../components/DetailsHeader';

const EditProfile: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	return (
		<AnimatedScreen animation="SlideInFromRight">
			<DetailsHeader
				isLoading={false}
				name="Edit Profile"
				onNavigateBack={(): void => navigation.navigate('OwnProfile' as never)}
			/>
		</AnimatedScreen>
	);
};

export default EditProfile;
