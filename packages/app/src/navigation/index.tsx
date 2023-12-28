import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import config from '../config';
import Home from '../screens/Home';

export type RootStackParamList = {
	Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = (): React.JSX.Element => {
	return (
		<Stack.Navigator initialRouteName="Home" screenOptions={config.navigator}>
			<Stack.Screen name="Home" component={Home} />
		</Stack.Navigator>
	);
};

export default Navigation;
