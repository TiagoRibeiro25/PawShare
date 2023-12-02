import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import options from '../config/navigator';
import Home from '../screens/Home';

export type RootStackParamList = {
	Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = (): JSX.Element => {
	return (
		<Stack.Navigator initialRouteName="Home" screenOptions={options}>
			<Stack.Screen name="Home" component={Home} />
		</Stack.Navigator>
	);
};

export default Navigation;
