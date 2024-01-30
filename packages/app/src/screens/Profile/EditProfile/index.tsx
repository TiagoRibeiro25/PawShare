import { useNavigation } from '@react-navigation/native';
import React from 'react';
import AnimatedComponent from '../../../components/AnimatedComponent';
import DetailsHeader from '../../../components/DetailsHeader';

const EditProfile: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	return (
		<AnimatedComponent animation="SlideInFromRight">
			<DetailsHeader
				isLoading={false}
				name="Edit Profile"
				onNavigateBack={(): void => navigation.navigate('OwnProfile' as never)}
			/>
		</AnimatedComponent>
	);
};

export default EditProfile;
