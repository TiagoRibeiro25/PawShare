import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import GestorRecognizer from 'react-native-swipe-gestures';
import Swiper from 'react-native-swiper';
import AnimatedScreen from '../../components/AnimatedScreen';
import config from '../../config';
import NavigateBackButton from './components/NavigateBackButton';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import SwipeButton from './components/SwipeButton';

const Auth: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	return (
		<AnimatedScreen animation="SlideInFromBottom">
			<GestorRecognizer
				className="flex-1 px-6 py-8 bg-primary-50"
				onSwipeDown={(): void => navigation.navigate('OnBoarding' as never)}
			>
				<View className="items-center flex-1">
					<NavigateBackButton />

					<Swiper
						showsPagination={true}
						dotColor={config.swiper.dotColor}
						activeDotColor={config.swiper.activeDotColor}
						className="mt-2"
						loop={false}
						showsButtons={true}
						nextButton={<SwipeButton direction="next" />}
						prevButton={<SwipeButton direction="prev" />}
					>
						<SignInForm />
						<SignUpForm />
					</Swiper>
				</View>
			</GestorRecognizer>
		</AnimatedScreen>
	);
};

export default Auth;
