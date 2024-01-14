import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import FemaleIcon from '../../../../../assets/svg/female.svg';
import LocationIcon from '../../../../../assets/svg/location.svg';
import MaleIcon from '../../../../../assets/svg/male.svg';
import Icon from '../../../../../components/Icon';
import config from '../../../../../config';
import { Props } from './types';

const Card: React.FC<Props> = ({ adoption }): React.JSX.Element => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			className="mb-8"
			activeOpacity={0.8}
			// TODO (tiago): Remove this ts-ignore
			//@ts-ignore
			onPress={() => navigation.navigate('AdoptionDetails', { id: adoption.id })}
		>
			<View className="flex-row items-center justify-between p-5">
				<Text className="mt-1 text-xl text-secondary-500 font-laila-semi-bold">
					{adoption.animal.name}
				</Text>

				<View className="items-center justify-center w-10 h-10 rounded-full bg-secondary-300">
					<Icon icon={adoption.animal.gender === 'Male' ? MaleIcon : FemaleIcon} />
				</View>
			</View>

			{/* TODO (tiago): Change the fallback image */}
			<FastImage
				source={{
					uri: adoption.animal.picture || config.fallbacks.adoption.feed.animal.picture,
				}}
				className="w-full h-72"
				resizeMode="cover"
			/>

			<View className="p-5">
				<View className="flex flex-row items-center mb-3 space-x-2">
					<Icon icon={LocationIcon} />

					<Text className="text-base text-secondary-500 font-zen-kaku-gothic-new-bold">
						{adoption.city}
					</Text>
				</View>
				<Text className="ml-6 text-base text-secondary-500 font-zen-kaku-gothic-new-regular">
					{adoption.animal.description || 'No description provided'}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Card;
