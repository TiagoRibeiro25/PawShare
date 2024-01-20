import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CalendarIcon from '../../../assets/svg/calendar.svg';
import ClockIcon from '../../../assets/svg/clock.svg';
import CoinIcon from '../../../assets/svg/dark_paw.svg';
import DotIcon from '../../../assets/svg/dot.svg';
import LocationIcon from '../../../assets/svg/location.svg';
import AnimatedScreen from '../../../components/AnimatedScreen';
import DetailsAnimalIcons from '../../../components/DetailsAnimalIcons';
import DetailsBodyData from '../../../components/DetailsBodyData';
import DetailsHeader from '../../../components/DetailsHeader';
import DetailsLoadingSkeleton from '../../../components/DetailsLoadingSkeleton';
import Icon from '../../../components/Icon';
import config from '../../../config';
import { useUserContext } from '../../../context/user';
import useGetSittingDetailsData from '../../../hooks/reactQuery/sitting/details';
import { RootStackParamList } from '../../../navigation/types';
import utils from '../../../utils';
import JoinSittersListButton from './components/JoinSittersListButton';
import ReviewsRating from './components/ReviewsRating';

type Props = NativeStackScreenProps<RootStackParamList, 'SittingDetails'>;

const SittingDetails: React.FC<Props> = ({ route }): React.JSX.Element => {
	const navigation = useNavigation();

	const { loggedUser } = useUserContext();
	const { data, isLoading, isError, isSuccess } = useGetSittingDetailsData({
		id: route.params.id,
	});

	const navigateBack = useCallback((): void => {
		return navigation.navigate('SittingFeed' as never);
	}, [navigation]);

	useEffect(() => {
		if (isError) {
			navigateBack();
		}
	}, [isError, navigateBack]);

	return (
		<AnimatedScreen animation="SlideInFromRight">
			<DetailsHeader
				isLoading={isLoading}
				name={data?.data.sitting.animal.name}
				onNavigateBack={navigateBack}
			/>

			{isLoading && <DetailsLoadingSkeleton />}
			{isSuccess && (
				<ScrollView showsVerticalScrollIndicator={false}>
					<FastImage
						className="w-full h-72"
						source={{
							uri:
								data.data.sitting.animal.picture ||
								config.fallbacks.sitting.details.animal.picture,
						}}
						resizeMode="cover"
					/>

					<View className="p-5 mb-9">
						<View className="flex-row items-center justify-between">
							<DetailsAnimalIcons
								color={data.data.sitting.animal.color}
								gender={data.data.sitting.animal.gender}
								size={data.data.sitting.animal.size}
								type={data.data.sitting.animal.type}
							/>

							<ReviewsRating rating={data.data.sitting.rating} />
						</View>

						<View className="flex-row items-center justify-between my-4">
							<View className="flex-row items-center space-x-2 ml-1.5">
								<Icon className="scale-110" icon={LocationIcon} />
								<Text className="mb-0.5 text-base font-zen-kaku-gothic-new-medium text-secondary-500 max-w-[150px] max-h-6">
									{data.data.sitting.city}
								</Text>
							</View>

							<View className="flex-row items-center space-x-1.5">
								<Icon icon={CoinIcon} />
								<Text className="text-base text-secondary-500 font-zen-kaku-gothic-new-bold">
									{data.data.sitting.coins}
								</Text>
							</View>
						</View>

						<View className="flex flex-row justify-between">
							<View className="flex flex-row items-center space-x-2 ml-1.5">
								<Icon icon={CalendarIcon} className="mt-0.5" />

								<Text className="text-base text-secondary-500 font-zen-kaku-gothic-new-medium">
									{utils.formatData.convertDateToLocaleString(data.data.sitting.start_date)}
								</Text>
								<View className="pt-1">
									<Icon icon={DotIcon} />
								</View>
								<Text className="text-base text-secondary-500 font-zen-kaku-gothic-new-medium">
									{utils.formatData.convertDateToLocaleString(data.data.sitting.end_date)}
								</Text>
							</View>

							<View className="flex flex-row items-center space-x-2">
								<Icon icon={ClockIcon} className="mt-0.5" />
								<Text className="text-base text-secondary-500 font-zen-kaku-gothic-new-bold">
									{utils.formatData.getDifferenceInDays(
										data.data.sitting.start_date,
										data.data.sitting.end_date,
									)}{' '}
									days
								</Text>
							</View>
						</View>

						<DetailsBodyData
							owner={data.data.sitting.animal.owner}
							description={data.data.sitting.animal.description}
							notes={data.data.sitting.notes}
							contact={{
								email: data.data.sitting.email_contact,
								phone: data.data.sitting.phone_contact,
							}}
						/>

						<JoinSittersListButton
							sittingId={data.data.sitting.id}
							isCandidate={data.data.sitting.is_candidate}
							isOwner={loggedUser?.id === data.data.sitting.animal.owner.id}
						/>
					</View>
				</ScrollView>
			)}
		</AnimatedScreen>
	);
};

export default SittingDetails;
