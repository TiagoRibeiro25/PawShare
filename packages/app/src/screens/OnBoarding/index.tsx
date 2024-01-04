import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import ArrowDownIcon from '../../assets/svg/arrow_down.svg';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import slides from '../../data/onboarding.json';
import SwipeButton from './components/SwipeButton';
import { Slide } from './types';

const OnBoarding: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	const getIllustrationSource = (index: number): ImageSourcePropType => {
		switch (index) {
			case 0:
				return require('../../assets/images/onboarding/ilustration1.png');
			case 1:
				return require('../../assets/images/onboarding/ilustration2.png');
			case 2:
				return require('../../assets/images/onboarding/ilustration3.png');
			case 3:
				return require('../../assets/images/onboarding/ilustration4.png');
			default:
				return require('../../assets/images/onboarding/ilustration1.png');
		}
	};

	return (
		<View className="flex-1 py-8 bg-primary-50">
			<View className="h-[90%]">
				<Swiper
					showsPagination={false}
					showsButtons={true}
					prevButton={<SwipeButton direction="prev" />}
					nextButton={<SwipeButton direction="next" />}
				>
					{slides.map((slide: Slide, slideIndex: number) => (
						<View key={slideIndex} className="items-center flex-1 mx-6">
							{/* Title */}
							{slide.title.map((line: string, lineIndex: number) => (
								<Text key={lineIndex} className="text-2xl text-secondary-500 font-laila-bold">
									{line}
								</Text>
							))}

							{/* Description */}
							<Text className="mt-6 text-base text-justify text-secondary-500 font-zen-kaku-gothic-new-medium">
								{slide.description}
							</Text>

							{/* Ilustration */}
							<View className="justify-center flex-1">
								<Image source={getIllustrationSource(slideIndex)} />
							</View>
						</View>
					))}
				</Swiper>
			</View>

			{/* Sign In Button */}
			<Button
				className="p-3 mt-4 bg-accent-500 min-w-[100px] w-1/2 self-center space-x-3"
				onPress={() => navigation.navigate('SignIn' as never)}
			>
				<Icon className="mt-0.5" Icon={ArrowDownIcon} />
				<Text className="text-lg font-medium text-black font-zen-kaku-gothic-new-bold">
					Sign In
				</Text>
			</Button>
		</View>
	);
};

export default OnBoarding;
