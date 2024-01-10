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

const FALLBACK_IF_LOGGED = AdoptionFeed;
const FALLBACK_IF_NOT_LOGGED = OnBoarding;

const Navigation: React.FC = (): React.JSX.Element => {
	const { loggedUser } = useUserContext();

	const guardClause = (mustBeLogged: boolean, destiny: React.FC): React.FC => {
		if (mustBeLogged && !loggedUser) {
			return FALLBACK_IF_NOT_LOGGED;
		}

		if (!mustBeLogged && loggedUser) {
			return FALLBACK_IF_LOGGED;
		}

		return destiny;
	};

	return (
		<Stack.Navigator initialRouteName="OnBoarding" screenOptions={config.navigator}>
			<Stack.Screen name="OnBoarding" component={guardClause(false, OnBoarding)} />

			{/* Auth */}
			<Stack.Screen
				name="Auth"
				component={guardClause(false, Auth)}
				options={{ animation: 'slide_from_bottom' }}
			/>

			{/* Adoption */}
			<Stack.Screen
				name="AdoptionFeed"
				component={guardClause(true, AdoptionFeed)}
				options={{ animation: 'fade' }}
			/>

			{/* Sitting */}
			<Stack.Screen
				name="SittingFeed"
				component={guardClause(true, SittingFeed)}
				options={{ animation: 'fade' }}
			/>

			{/* Store */}
			<Stack.Screen
				name="Store"
				component={guardClause(true, Store)}
				options={{ animation: 'fade' }}
			/>

			{/* Profile */}
			<Stack.Screen
				name="Profile"
				component={guardClause(true, Profile)}
				options={{ animation: 'fade' }}
			/>
		</Stack.Navigator>
	);
};

export default Navigation;
