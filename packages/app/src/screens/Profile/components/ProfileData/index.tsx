import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Button from '../../../../components/Button';
import DetailsLoadingSkeleton from '../../../../components/DetailsLoadingSkeleton';
import { useUserContext } from '../../../../context/user';
import countries from '../../../../data/countries.json';
import useGetUser from '../../../../hooks/reactQuery/user/getUser';
import utils from '../../../../utils';

type Props = {
	id?: number;
	isLoggedUser?: boolean;
};

const ProfileData: React.FC<Props> = ({
	id = 'me' as number | 'me',
	isLoggedUser = false,
}): React.JSX.Element => {
	const navigation = useNavigation();
	const { setLoggedUser } = useUserContext();
	const { isLoading, data, isError } = useGetUser({ id });

	const handleSignOut = (): void => {
		// Delete the tokens from the device storage
		utils.storage.delete('authToken');
		utils.storage.delete('refreshToken');

		setLoggedUser(null);
	};

	useEffect(() => {
		if (isError) {
			navigation.navigate('AdoptionFeed' as never);
		}
	}, [isError, navigation]);

	return (
		<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
			{/* TODO(tiago): Make a loading skeleton component just for the profile  */}
			{isLoading && <DetailsLoadingSkeleton />}

			{!isLoading && data?.data && (
				<>
					<View className="items-center">
						{/* Selected Banner */}
						{data.data.selected_banner ? (
							<FastImage
								className="w-full h-72"
								source={utils.getImageFromLocalFile.banner(data?.data.selected_banner)}
								resizeMode="cover"
							/>
						) : (
							<View className="w-full border-b h-36 bg-accent-50 border-secondary-200" />
						)}

						{/* Profile Picture */}
						{/* TODO(tiago): Show selected frame */}
						<FastImage
							className={`-mt-[75px] rounded-full w-36 h-36 ${
								!data.data.selected_frame && 'border border-secondary-200'
							}`}
							source={{ uri: data?.data.picture }}
							resizeMode="cover"
						/>
					</View>

					{/* User country and username */}
					<View className="flex-row self-center mt-8 space-x-2">
						<Text className="text-3xl">
							{countries.find((country) => country.code === data.data.country.code)?.emoji}
						</Text>

						<Text className="mt-1 text-2xl font-laila-semi-bold text-secondary-500">
							{data.data.display_name}
						</Text>
					</View>

					{isLoggedUser && (
						<Button
							className="self-center p-3 mt-16 bg-accent-500 w-60"
							onPress={handleSignOut}
						>
							<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
								Sign Out
							</Text>
						</Button>
					)}
				</>
			)}
		</ScrollView>
	);
};

export default ProfileData;
