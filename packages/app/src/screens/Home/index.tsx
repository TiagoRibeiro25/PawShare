import React from 'react';
import { Text, View } from 'react-native';

const Home: React.FC = (): JSX.Element => {
	return (
		<View className="flex justify-center h-full">
			<Text className="text-6xl font-bold text-center text-orange-500">Paw Share</Text>
		</View>
	);
};

export default Home;
