import React from 'react';
import { Text, View } from 'react-native';

const Error: React.FC = (): React.JSX.Element => {
	return (
		<View className="items-center justify-center flex-1 p-8">
			<Text className="text-3xl uppercase font-laila-bold text-secondary-500">Oops!</Text>

			<Text className="mt-3 text-base text-center text-secondary-500 font-zen-kaku-gothic-new-medium">
				Looks like something went wrong on our end. Please try again later.
			</Text>
		</View>
	);
};

export default Error;
