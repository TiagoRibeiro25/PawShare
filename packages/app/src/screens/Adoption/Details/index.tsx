import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import EmailIcon from '../../../assets/svg/email.svg';
import FemaleIcon from '../../../assets/svg/female_primary.svg';
import ListDotIcon from '../../../assets/svg/list_dot.svg';
import LocationIcon from '../../../assets/svg/location.svg';
import MaleIcon from '../../../assets/svg/male_primary.svg';
import PhoneIcon from '../../../assets/svg/phone.svg';
import LargeIcon from '../../../assets/svg/size_large.svg';
import MediumIcon from '../../../assets/svg/size_medium.svg';
import SmallIcon from '../../../assets/svg/size_small.svg';
import AnimatedScreen from '../../../components/AnimatedScreen';
import Button from '../../../components/Button';
import DetailsLoadingSkeleton from '../../../components/DetailsLoadingSkeleton';
import Icon from '../../../components/Icon';
import config from '../../../config';
import { useUserContext } from '../../../context/user';
import animalEmojis from '../../../data/animal_emojis.json';
import useGetAdoptionDetailsData from '../../../hooks/reactQuery/adoption/details';
import JoinAdoptersListButton from './components/JoinAdoptersListButton';
import NavigateBackButton from './components/NavigateBackButton';
import { Props } from './types';

const AdoptionDetails: React.FC<Props> = ({ route }): React.JSX.Element => {
	const navigation = useNavigation();

	const { loggedUser } = useUserContext();
	const { data, isLoading, isError, isSuccess } = useGetAdoptionDetailsData({
		id: route.params.id,
	});

	useEffect(() => {
		if (isError) {
			navigation.goBack();
		}
	}, [isError, navigation]);

	return (
		<AnimatedScreen animation="SlideInFromRight">
			<View className="flex-row justify-between p-5">
				<NavigateBackButton />

				{isLoading ? (
					<View className="self-center w-2/6 h-4 bg-gray-200 rounded-full" />
				) : (
					<Text className="self-center text-2xl font-laila-semi-bold text-secondary-500 mt-1.5">
						{data?.data.adoption.animal.name}
					</Text>
				)}
			</View>

			{isLoading && <DetailsLoadingSkeleton />}
			{isSuccess && (
				<ScrollView showsVerticalScrollIndicator={false}>
					<FastImage
						className="w-full h-72"
						source={{
							uri:
								data.data.adoption.animal.picture ||
								config.fallbacks.adoption.details.animal.picture,
						}}
						resizeMode="cover"
					/>

					<View className="p-5 mb-9">
						<View className="flex-row items-center">
							<Text className="text-3xl">
								{
									//@ts-ignore
									animalEmojis[data.data.adoption.animal.type]
								}
							</Text>

							{data.data.adoption.animal.gender === 'Other' ? (
								<Text className="text-3xl">👽</Text>
							) : (
								<Icon
									className="scale-75 mt-0.5"
									Icon={data.data.adoption.animal.gender === 'Male' ? MaleIcon : FemaleIcon}
								/>
							)}

							<View
								className="ml-1 border rounded-full w-7 h-7 border-secondary-500"
								style={{ backgroundColor: data.data.adoption.animal.color }}
							/>

							<Icon
								className="ml-2.5 scale-110"
								Icon={
									data.data.adoption.animal.size === 'Small'
										? SmallIcon
										: data.data.adoption.animal.size === 'Medium'
										? MediumIcon
										: LargeIcon
								}
							/>

							<View className="flex-row items-center ml-auto space-x-2">
								<Icon className="scale-110" Icon={LocationIcon} />
								<Text className="mb-0.5 text-base  font-zen-kaku-gothic-new-medium text-secondary-500 max-w-[150px] max-h-6">
									{data.data.adoption.city}
								</Text>
							</View>
						</View>

						{/* TODO(tiago): Navigate to user profile */}
						<Button className="flex-row items-center self-start p-0 mt-6 space-x-3">
							<FastImage
								source={{
									uri: data.data.adoption.animal.owner.picture,
								}}
								className="w-8 h-8 border rounded-full border-secondary-500"
								resizeMode="cover"
							/>

							<Text className="mb-0.5 text-base text-secondary-500 font-zen-kaku-gothic-new-bold">
								{data.data.adoption.animal.owner.display_name}
								{loggedUser?.id === data.data.adoption.animal.owner.id && ' (You)'}
							</Text>
						</Button>

						<View>
							<Text className="mt-12 mb-3 text-xl text-secondary-500 font-laila-semi-bold">
								About
							</Text>
							<Text className="text-base text-secondary-500 font-zen-kaku-gothic-new-medium">
								{data.data.adoption.animal.description}
							</Text>

							<Text className="mt-12 mb-3 text-xl text-secondary-500 font-laila-semi-bold">
								Notes
							</Text>
							{data.data.adoption.notes.map((note: string, index: number) => (
								<View key={index} className="flex-row">
									<Icon Icon={ListDotIcon} className="mt-1.5 mr-2" />

									<Text className="flex-1 text-base text-secondary-500 font-zen-kaku-gothic-new-medium">
										{note}
									</Text>
								</View>
							))}
							{data.data.adoption.notes.length === 0 && (
								<Text className="text-base text-secondary-500 font-zen-kaku-gothic-new-medium">
									The owner didn't add any notes to this adoption.
								</Text>
							)}

							<Text className="mt-12 mb-3 text-xl text-secondary-500 font-laila-semi-bold">
								Contacts
							</Text>

							<View className="flex-row space-x-2.5 mb-2 max-h-7">
								<Icon Icon={PhoneIcon} className="scale-105 ml-0.5 mt-1.5" />

								<Text className="flex-1 text-base text-secondary-500 font-zen-kaku-gothic-new-medium">
									{data.data.adoption.phone_contact}
								</Text>
							</View>

							<View className="flex-row mb-6 space-x-2 max-h-7">
								<Icon Icon={EmailIcon} className="mt-1 -ml-0.5" />

								<Text className="flex-1 text-base text-secondary-500 font-zen-kaku-gothic-new-medium">
									{data.data.adoption.email_contact}
								</Text>
							</View>
						</View>

						<JoinAdoptersListButton
							adoptionId={data.data.adoption.id}
							isCandidate={data.data.adoption.is_candidate}
							isOwner={loggedUser?.id === data.data.adoption.animal.owner.id}
						/>
					</View>
				</ScrollView>
			)}
		</AnimatedScreen>
	);
};

export default AdoptionDetails;
