import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import FemaleIcon from '../../../../../assets/svg/female.svg';
import LocationIcon from '../../../../../assets/svg/location.svg';
import MaleIcon from '../../../../../assets/svg/male.svg';
import Icon from '../../../../../components/Icon';
import { Props } from './types';

const Card: React.FC<Props> = ({ adoption }): React.JSX.Element => {
	return (
		// TODO (tiago): When pressing, change the background color to secondary-300 (purple)
		// TODO (tiago): Add navigation to the adoption detail screen
		<TouchableOpacity className="mb-8" activeOpacity={0.8}>
			<>
				<View className="flex-row items-center justify-between p-5">
					<Text className="mt-1 text-xl text-secondary-500 font-laila-semi-bold">
						{adoption.animal.name}
					</Text>

					<View className="items-center justify-center w-10 h-10 rounded-full bg-secondary-300">
						<Icon Icon={adoption.animal.gender === 'Male' ? MaleIcon : FemaleIcon} />
					</View>
				</View>

				<FastImage
					source={{
						// TODO (tiago): Change the fallback image
						uri: adoption.animal.picture || 'https://placekitten.com/408/287',
					}}
					className="w-full h-72"
					resizeMode="cover"
				/>

				<View className="p-5">
					<View className="flex flex-row items-center mb-3 space-x-2">
						<Icon Icon={LocationIcon} />

						<Text className="text-base text-secondary-500 font-zen-kaku-gothic-new-bold">
							{adoption.city}
						</Text>
					</View>
					<Text className="ml-6 text-base text-secondary-500 font-zen-kaku-gothic-new-regular">
						{adoption.animal.description}
					</Text>
				</View>
			</>
		</TouchableOpacity>
	);
};

export default Card;
