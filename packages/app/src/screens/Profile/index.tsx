import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import AnimatedScreen from '../../components/AnimatedScreen';
import Button from '../../components/Button';
import { useUserContext } from '../../context/user';
import utils from '../../utils';

const Profile: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const { setLoggedUser } = useUserContext();

	const handleSignOut = () => {
		setLoggedUser(null);

		// Delete the tokens from the device storage
		utils.storage.delete('authToken');
		utils.storage.delete('refreshToken');
	};

	return (
		<AnimatedScreen animation="FadeIn">
			<View className="flex-1 py-5">
				<Text>Profile</Text>

				<Button
					className="self-center p-3 mt-6 bg-accent-500 w-60"
					onPress={(): void => navigation.navigate('AddAnimal' as never)}
				>
					<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
						Add Animal
					</Text>
				</Button>

				<Button className="self-center p-3 mt-6 bg-accent-500 w-60" onPress={handleSignOut}>
					<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
						Sign Out
					</Text>
				</Button>
			</View>
		</AnimatedScreen>
	);
};

export default Profile;
