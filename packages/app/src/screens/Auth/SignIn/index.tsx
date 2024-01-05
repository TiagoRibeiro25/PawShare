import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import GestorRecognizer from 'react-native-swipe-gestures';
import NavigateBackButton from '../components/NavigateBackButton';

const SignIn: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	return (
		<GestorRecognizer
			className="flex-1 px-6 py-8 bg-primary-50"
			onSwipeDown={(): void => navigation.navigate('OnBoarding' as never)}
		>
			<View className="items-center">
				<NavigateBackButton />
				<Text className="mt-6 text-2xl uppercase text-secondary-500 font-laila-bold">
					Sign In
				</Text>
			</View>
		</GestorRecognizer>
	);
};

export default SignIn;
