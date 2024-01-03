import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import ArrowDownIcon from '../../assets/svg/arrow_down.svg';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import slides from '../../data/onboarding.json';
import { Slide } from './types';
// import SwipeButton from './components/SwipeButton';

const OnBoarding: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	// const [currIndex, setSurrIndex] = useState<number>(0);

	const getIllustrationSource = (index: number): any => {
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
				{slides && (
					<Swiper
						showsPagination={false}
						// TODO (any): Fix the behavior when adding custom buttons
						// showsButtons={true}
						// onIndexChanged={(index: number) => setSurrIndex(index)}
						// prevButton={
						// 	<SwipeButton direction="prev" index={currIndex} length={slides.length - 1} />
						// }
						// nextButton={
						// 	<SwipeButton direction="next" index={currIndex} length={slides.length - 1} />
						// }
					>
						{slides.map((slide: Slide, slideIndex: number) => (
							<View key={slideIndex} className="items-center flex-1 mx-6">
								{/* Title */}
								{slide.title.map((line: string, lineIndex: number) => (
									<Text key={lineIndex} className="text-2xl font-bold text-secondary-500">
										{line}
									</Text>
								))}

								{/* Description */}
								<Text className="mt-6 text-base text-justify text-secondary-500">
									{slide.description}
								</Text>

								{/* Ilustration */}
								<View className="justify-center flex-1">
									<Image source={getIllustrationSource(slideIndex)} />
								</View>
							</View>
						))}
					</Swiper>
				)}
			</View>

			{/* Sign In Button */}
			<Button
				className="p-3 mt-4 bg-accent-500 min-w-[100px] w-1/2 self-center space-x-3"
				onPress={() => navigation.navigate('SignIn' as never)}
			>
				<Icon className="mt-0.5" Icon={ArrowDownIcon} />
				<Text className="text-lg font-medium text-black">Sign In</Text>
			</Button>
		</View>
	);
};

export default OnBoarding;
