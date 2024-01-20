import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import GestorRecognizer from 'react-native-swipe-gestures';
import Swiper from 'react-native-swiper';
import ArrowDownIcon from '../../assets/svg/arrow_down.svg';
import AnimatedScreen from '../../components/AnimatedScreen';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import config from '../../config';
import slides from '../../data/onboarding.json';
import SwipeButton from './components/SwipeButton';

type Slide = {
	title: string[];
	description?: string;
};

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
		<AnimatedScreen animation="SlideInFromTop" dontAnimateOnMount>
			<View className="flex-1 py-8">
				<GestorRecognizer
					className="h-[90%]"
					onSwipeUp={(): void => navigation.navigate('Auth' as never)}
				>
					<Swiper
						showsPagination={true}
						dotColor={config.swiper.dotColor}
						activeDotColor={config.swiper.activeDotColor}
						loop={false}
						showsButtons={true}
						prevButton={<SwipeButton direction="prev" />}
						nextButton={<SwipeButton direction="next" />}
					>
						{slides.map((slide: Slide, slideIndex: number) => (
							<View key={slideIndex} className="items-center flex-1 mx-6">
								{/* Title */}
								{slide.title.map((line: string, lineIndex: number) => (
									<Text
										key={lineIndex}
										className="text-2xl text-secondary-500 font-laila-bold"
									>
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
				</GestorRecognizer>

				{/* Sign In Button */}
				<Button
					className="p-3 mt-4 bg-accent-500 min-w-[100px] w-1/2 self-center space-x-3"
					onPress={() => navigation.navigate('Auth' as never)}
				>
					<Icon className="mt-0.5" icon={ArrowDownIcon} />
					<Text className="text-lg font-medium text-secondary-500 font-zen-kaku-gothic-new-bold">
						Sign In
					</Text>
				</Button>
			</View>
		</AnimatedScreen>
	);
};

export default OnBoarding;
