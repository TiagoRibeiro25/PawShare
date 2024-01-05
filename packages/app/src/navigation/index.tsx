import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import config from '../config';
import { useUserContext } from '../context/user';
import AdoptionFeed from '../screens/Adoption/Feed';
import SignIn from '../screens/Auth/SignIn';
import OnBoarding from '../screens/OnBoarding';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const { loggedUser } = useUserContext();

	useEffect(() => {
		// If the user is logged in, redirect him to the AdoptionFeed screen and vice versa
		navigation.navigate(!loggedUser ? ('OnBoarding' as never) : ('AdoptionFeed' as never));
	}, [loggedUser, navigation]);

	return (
		<Stack.Navigator initialRouteName="OnBoarding" screenOptions={config.navigator}>
			<Stack.Screen name="OnBoarding" component={!loggedUser ? OnBoarding : AdoptionFeed} />

			{/* Auth */}
			<Stack.Screen
				name="SignIn"
				component={!loggedUser ? SignIn : AdoptionFeed}
				options={{ animation: 'slide_from_bottom' }}
			/>

			{/* Adoption */}
			<Stack.Screen
				name="AdoptionFeed"
				component={loggedUser ? AdoptionFeed : OnBoarding}
				options={{ animation: 'slide_from_right' }}
			/>
		</Stack.Navigator>
	);
};

export default Navigation;
