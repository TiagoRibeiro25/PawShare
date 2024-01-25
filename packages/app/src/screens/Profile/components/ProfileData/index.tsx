import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import AddIcon from '../../../../assets/svg/add.svg';
import Button from '../../../../components/Button';
import DetailsLoadingSkeleton from '../../../../components/DetailsLoadingSkeleton';
import EditButton from '../../../../components/EditButton';
import Icon from '../../../../components/Icon';
import config from '../../../../config';
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
		<View className="flex-1">
			{/* TODO(tiago): Make a loading skeleton component just for the profile  */}
			{isLoading && <DetailsLoadingSkeleton />}

			{!isLoading && data?.data && (
				<>
					<ScrollView showsVerticalScrollIndicator={false}>
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

						{/* Badges */}
						{/* TODO(tiago): Display the badges */}
						<ScrollView
							className="flex-row mt-12 h-28 bg-secondary-300"
							showsHorizontalScrollIndicator={false}
						/>

						<View className="p-5 mt-6">
							<Text className="mb-2 text-xl font-laila-medium text-secondary-500">
								Description
							</Text>
							<Text className="text-base leading-5 font-zen-kaku-gothic-new-medium text-secondary-500">
								{data.data.description || 'This user has no description yet.'}
							</Text>

							<Text className="mb-2 text-xl mt-11 font-laila-medium text-secondary-500">
								Animals
							</Text>
							<View className="flex-row flex-wrap">
								{data.data.animals &&
									data.data.animals.map((animal) => (
										<Button
											key={animal.id}
											className="w-20 h-20 p-0 mb-2 mr-2"
											onPress={(): void =>
												// @ts-ignore
												navigation.navigate('AnimalProfile', { id: animal.id })
											}
										>
											<FastImage
												className="w-full h-full rounded-full"
												source={{
													uri: animal.picture || config.fallbacks.profile.animal.picture,
												}}
												resizeMode="cover"
											/>
										</Button>
									))}

								{isLoggedUser && (
									<>
										<Button
											className="items-center justify-center w-20 h-20 mb-2 mr-2 rounded-full bg-secondary-300"
											onPress={(): void => navigation.navigate('AddAnimal' as never)}
										>
											<Icon icon={AddIcon} />
										</Button>

										{/* <EditButton onPress={(): void => console.log('Navigate to Edit Profile')} /> */}
									</>
								)}

								{data.data.animals?.length === 0 && !isLoggedUser && (
									<Text className="text-base leading-5 font-zen-kaku-gothic-new-medium text-secondary-500">
										This user has no animals yet.
									</Text>
								)}
							</View>
						</View>

						{isLoggedUser && (
							<Button
								className="self-center p-3 my-6 bg-accent-500 w-60"
								onPress={handleSignOut}
							>
								<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
									Sign Out
								</Text>
							</Button>
						)}
					</ScrollView>

					{isLoggedUser && (
						<EditButton onPress={(): void => console.log('Navigate to Edit Profile')} />
					)}
				</>
			)}
		</View>
	);
};

export default ProfileData;
