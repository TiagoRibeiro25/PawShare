import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import Button from '../../../../components/Button';
import { useUserContext } from '../../../../context/user';
import utils from '../../../../utils';

type Props = {
	id?: number;
	isLoggedUser?: boolean;
};

const ProfileData: React.FC<Props> = ({
	id = 'me',
	isLoggedUser = false,
}): React.JSX.Element => {
	const navigation = useNavigation();
	const { setLoggedUser } = useUserContext();

	const handleSignOut = (): void => {
		// Delete the tokens from the device storage
		utils.storage.delete('authToken');
		utils.storage.delete('refreshToken');

		setLoggedUser(null);
	};

	return (
		<View className="flex-1">
			<Text>Profile</Text>

			<Button
				className="self-center p-3 mt-6 bg-accent-500 w-60"
				onPress={(): void => navigation.navigate('AddAnimal' as never)}
			>
				<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
					Add Animal
				</Text>
			</Button>

			<Button
				className="self-center p-3 mt-6 bg-accent-500 w-60"
				onPress={(): void => navigation.navigate('AddDocument' as never)}
			>
				<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
					Add Document
				</Text>
			</Button>

			<Button
				className="self-center p-3 mt-6 bg-accent-500 w-60"
				// @ts-ignore
				onPress={(): void => navigation.navigate('AnimalProfile', { id: 1 })}
			>
				<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
					See Animal with id 1
				</Text>
			</Button>

			<Button className="self-center p-3 mt-6 bg-accent-500 w-60" onPress={handleSignOut}>
				<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
					Sign Out
				</Text>
			</Button>
		</View>
	);
};

export default ProfileData;
