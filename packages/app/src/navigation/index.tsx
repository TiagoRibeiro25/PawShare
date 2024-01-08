import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import config from '../config';
import { useUserContext } from '../context/user';
import AdoptionFeed from '../screens/Adoption/Feed';
import Auth from '../screens/Auth';
import OnBoarding from '../screens/OnBoarding';
import Profile from '../screens/Profile';
import SittingFeed from '../screens/Sitting/Feed';
import Store from '../screens/Store';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = (): React.JSX.Element => {
	const { loggedUser } = useUserContext();

	return (
		<Stack.Navigator initialRouteName="OnBoarding" screenOptions={config.navigator}>
			<Stack.Screen name="OnBoarding" component={!loggedUser ? OnBoarding : AdoptionFeed} />

			{/* Auth */}
			<Stack.Screen
				name="Auth"
				component={!loggedUser ? Auth : AdoptionFeed}
				options={{ animation: 'slide_from_bottom' }}
			/>

			{/* Adoption */}
			<Stack.Screen
				name="AdoptionFeed"
				component={loggedUser ? AdoptionFeed : OnBoarding}
				options={{ animation: 'fade' }}
			/>

			{/* Sitting */}
			<Stack.Screen
				name="SittingFeed"
				component={loggedUser ? SittingFeed : OnBoarding}
				options={{ animation: 'fade' }}
			/>

			{/* Store */}
			<Stack.Screen
				name="Store"
				component={loggedUser ? Store : OnBoarding}
				options={{ animation: 'fade' }}
			/>

			{/* Profile */}
			<Stack.Screen
				name="Profile"
				component={loggedUser ? Profile : OnBoarding}
				options={{ animation: 'fade' }}
			/>
		</Stack.Navigator>
	);
};

export default Navigation;
