import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LocationIcon from '../../../assets/svg/location.svg';
import AnimatedScreen from '../../../components/AnimatedScreen';
import DetailsAnimalIcons from '../../../components/DetailsAnimalIcons';
import DetailsBodyData from '../../../components/DetailsBodyData';
import DetailsHeader from '../../../components/DetailsHeader';
import DetailsLoadingSkeleton from '../../../components/DetailsLoadingSkeleton';
import Icon from '../../../components/Icon';
import config from '../../../config';
import { useUserContext } from '../../../context/user';
import useGetAdoptionDetailsData from '../../../hooks/reactQuery/adoption/details';
import { RootStackParamList } from '../../../navigation/types';
import JoinAdoptersListButton from './components/JoinAdoptersListButton';

export type Props = NativeStackScreenProps<RootStackParamList, 'AdoptionDetails'>;

const AdoptionDetails: React.FC<Props> = ({ route }): React.JSX.Element => {
	const navigation = useNavigation();

	const { loggedUser } = useUserContext();
	const { data, isLoading, isError, isSuccess } = useGetAdoptionDetailsData({
		id: route.params.id,
	});

	const navigateBack = useCallback((): void => {
		return navigation.navigate('AdoptionFeed' as never);
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
				name={data?.data.adoption.animal.name}
				onNavigateBack={navigateBack}
			/>

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
						<View className="flex-row items-center justify-between">
							<DetailsAnimalIcons
								color={data.data.adoption.animal.color}
								gender={data.data.adoption.animal.gender}
								size={data.data.adoption.animal.size}
								type={data.data.adoption.animal.type}
							/>

							<View className="flex-row items-center space-x-2">
								<Icon className="scale-110" icon={LocationIcon} />
								<Text className="mb-0.5 text-base  font-zen-kaku-gothic-new-medium text-secondary-500 max-w-[150px] max-h-6">
									{data.data.adoption.city}
								</Text>
							</View>
						</View>

						<DetailsBodyData
							owner={data.data.adoption.animal.owner}
							description={data.data.adoption.animal.description}
							notes={data.data.adoption.notes}
							contact={{
								email: data.data.adoption.email_contact,
								phone: data.data.adoption.phone_contact,
							}}
						/>

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
