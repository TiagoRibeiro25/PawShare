import React from 'react';
import { Text, View } from 'react-native';
import AnimatedComponent from '../../components/AnimatedComponent';

const Store: React.FC = (): React.JSX.Element => {
	return (
		<AnimatedComponent animation="FadeIn">
			<View className="flex-1 py-5">
				<Text>Store</Text>
			</View>
		</AnimatedComponent>
	);
};

export default Store;
