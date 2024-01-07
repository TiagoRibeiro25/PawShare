import React from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const EmptyState: React.FC = (): React.JSX.Element => {
	return (
		<View className="items-center justify-center flex-1 px-5 ">
			<FastImage
				source={require('../../../../../assets/images/adoption_feed/empty_state.png')}
				className="w-full h-56"
				resizeMode="contain"
			/>

			<Text className="mt-10 mb-8 text-2xl text-center text-secondary-500 font-laila-semi-bold">
				No Animals Fit That!
			</Text>

			<Text className="mb-10 text-base text-justify text-secondary-500 font-zen-kaku-gothic-new-regular">
				It seems no animal fits exactly what you are looking for! But at the end of the day all
				that matters is if the animal is right for you! How about checking some of the others?
			</Text>
		</View>
	);
};

export default EmptyState;
