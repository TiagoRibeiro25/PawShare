import React from 'react';
import { Text, View } from 'react-native';

const SignUpForm: React.FC = (): React.JSX.Element => {
	return (
		<View className="items-center flex-1">
			<Text className="mt-6 text-2xl uppercase text-secondary-500 font-laila-bold">
				Sign Up
			</Text>
		</View>
	);
};

export default SignUpForm;
