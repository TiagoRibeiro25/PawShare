import React from 'react';
import { Text, View } from 'react-native';
import Button from '../../components/Button';
import { useUserContext } from '../../context/user';

const Profile: React.FC = (): React.JSX.Element => {
	const { setLoggedUser } = useUserContext();

	return (
		<View>
			<Text>Profile</Text>

			<Button
				className="self-center p-3 mt-6 space-x-3 bg-accent-500 w-60"
				onPress={() => setLoggedUser(null)}
			>
				<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
					Sign Out
				</Text>
			</Button>
		</View>
	);
};

export default Profile;
