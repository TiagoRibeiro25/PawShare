import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import Navigation from './navigation';

const App: React.FC = (): React.JSX.Element => {
	return (
		<NavigationContainer>
			<View className="w-full h-full">
				<Navigation />
			</View>
		</NavigationContainer>
	);
};

export default App;
