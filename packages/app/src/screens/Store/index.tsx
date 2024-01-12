import React from 'react';
import { Text, View } from 'react-native';
import AnimatedScreen from '../../components/AnimatedScreen';

const Store: React.FC = (): React.JSX.Element => {
	return (
		<AnimatedScreen animation="FadeIn">
			<View className="flex-1 py-5">
				<Text>Store</Text>
			</View>
		</AnimatedScreen>
	);
};

export default Store;
