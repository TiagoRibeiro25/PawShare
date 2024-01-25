import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import AnimatedScreen from '../../components/AnimatedScreen';
import { useUserContext } from '../../context/user';
import { RootStackParamList } from '../../navigation/types';
import ProfileData from './components/ProfileData';

export type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const Profile: React.FC<Props> = ({ route }): React.JSX.Element => {
	const navigation = useNavigation();
	const { loggedUser } = useUserContext();

	useEffect(() => {
		if (!route.params?.id || route.params.id === loggedUser?.id || route.params.id === 'me') {
			navigation.navigate('OwnProfile' as never);
		}
	}, [loggedUser?.id, navigation, route.params.id]);

	return (
		<AnimatedScreen animation="FadeIn">
			<ProfileData id={route.params.id} />
		</AnimatedScreen>
	);
};

export default Profile;
