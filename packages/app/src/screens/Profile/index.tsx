import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';
import { useUserContext } from '../../context/user';
import { RootStackParamList } from '../../navigation/types';
import ProfileData from './components/ProfileData';

export type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const Profile: React.FC<Props> = ({ route }): React.JSX.Element => {
	const navigation = useNavigation();
	const { loggedUser } = useUserContext();

	useFocusEffect(
		useCallback(() => {
			if (
				!route.params?.id ||
				route.params.id === loggedUser?.id ||
				route.params.id === 'me'
			) {
				navigation.navigate('OwnProfile' as never);
				return;
			}
		}, [loggedUser?.id, navigation, route.params.id]),
	);

	return (
		<AnimatedComponent animation="FadeIn">
			<ProfileData id={route.params.id === 'me' ? loggedUser?.id : route.params.id} />
		</AnimatedComponent>
	);
};

export default Profile;
