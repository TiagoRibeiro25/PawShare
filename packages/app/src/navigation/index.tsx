import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import config from '../config';
import OnBoarding from '../screens/OnBoarding';
import SignIn from '../screens/SignIn';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = (): React.JSX.Element => {
	return (
		<Stack.Navigator initialRouteName="OnBoarding" screenOptions={config.navigator}>
			<Stack.Screen name="OnBoarding" component={OnBoarding} />

			{/* Auth */}
			<Stack.Screen
				name="SignIn"
				component={SignIn}
				options={{ animation: 'slide_from_bottom' }}
			/>
		</Stack.Navigator>
	);
};

export default Navigation;
