import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import theme from './config/theme';
import Navigation from './navigation';

export type RootStackParamList = {
	Home: undefined;
};

const App: React.FC = (): JSX.Element => {
	return (
		<NavigationContainer theme={theme}>
			<View className="w-full h-full">
				<Navigation />
			</View>
		</NavigationContainer>
	);
};

export default App;
