import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import Button from '../../../../components/Button';

const NavigateBackButton: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	return (
		<Button
			className="rounded-full w-14 h-14 bg-accent-200"
			onPress={(): void => navigation.navigate('OnBoarding' as never)}
		>
			<Text className="ml-0.5 text-4xl text-center rotate-90 text-secondary-500 font-zen-kaku-gothic-new-medium">
				{'<'}
			</Text>
		</Button>
	);
};

export default NavigateBackButton;
