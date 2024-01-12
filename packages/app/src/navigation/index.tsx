import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import AdoptionFeedI from '../assets/svg/adoption_feed.svg';
import ProfileI from '../assets/svg/profile.svg';
import SittingFeedI from '../assets/svg/sitting_feed.svg';
import StoreI from '../assets/svg/store.svg';
import Icon from '../components/Icon';
import config from '../config';
import { useUserContext } from '../context/user';
import AdoptionFeed from '../screens/Adoption/Feed';
import ManageAdoptions from '../screens/Adoption/Manage';
import Auth from '../screens/Auth';
import OnBoarding from '../screens/OnBoarding';
import Profile from '../screens/Profile';
import SittingFeed from '../screens/Sitting/Feed';
import Store from '../screens/Store';
import { RootStackParamList } from './types';

const Tab = createBottomTabNavigator<RootStackParamList>();

const Navigation: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const { loggedUser } = useUserContext();

	const [currentScreen, setCurrentScreen] = useState<string>('');

	// Navbar icons
	const AdoptionFeedIcon = useCallback(() => <Icon Icon={AdoptionFeedI} />, []);
	const SittingFeedIcon = useCallback(() => <Icon Icon={SittingFeedI} />, []);
	const StoreIcon = useCallback(() => <Icon Icon={StoreI} />, []);
	const ProfileIcon = useCallback(() => <Icon Icon={ProfileI} />, []);

	const guardClause = (mustBeLogged: boolean, destiny: React.FC): React.FC => {
		if (mustBeLogged && !loggedUser) {
			return OnBoarding; // FallBack if not logged
		}

		if (!mustBeLogged && loggedUser) {
			return AdoptionFeed; // FallBack if logged
		}

		return destiny;
	};

	useEffect(() => {
		return navigation.addListener('state', (e) => {
			// Get the current route name
			setCurrentScreen(e.data.state.routes[e.data.state.index].name);
		});
	});

	if (!loggedUser) {
		return (
			<Tab.Navigator
				initialRouteName="OnBoarding"
				screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}
			>
				<Tab.Screen name="OnBoarding" component={guardClause(false, OnBoarding)} />
				<Tab.Screen name="Auth" component={guardClause(false, Auth)} />
			</Tab.Navigator>
		);
	}

	return (
		<Tab.Navigator
			initialRouteName="AdoptionFeed"
			screenOptions={{
				...config.navigator.screenOptions,
			}}
		>
			{/* Adoption */}
			<Tab.Screen
				name="AdoptionFeed"
				component={guardClause(true, AdoptionFeed)}
				options={{
					tabBarIcon: AdoptionFeedIcon,
					tabBarItemStyle: {
						...config.navigator.tabItemStyle(currentScreen, 'AdoptionFeed'),
					},
				}}
			/>

			<Tab.Screen
				name="ManageAdoptions"
				component={guardClause(true, ManageAdoptions)}
				options={{ tabBarItemStyle: { display: 'none' } }}
			/>

			{/* Sitting */}
			<Tab.Screen
				name="SittingFeed"
				component={guardClause(true, SittingFeed)}
				options={{
					tabBarIcon: SittingFeedIcon,
					tabBarItemStyle: {
						...config.navigator.tabItemStyle(currentScreen, 'SittingFeed'),
					},
				}}
			/>

			{/* Store */}
			<Tab.Screen
				name="Store"
				component={guardClause(true, Store)}
				options={{
					tabBarIcon: StoreIcon,
					tabBarItemStyle: {
						...config.navigator.tabItemStyle(currentScreen, 'Store'),
					},
				}}
			/>

			{/* Profile */}
			<Tab.Screen
				name="Profile"
				component={guardClause(true, Profile)}
				options={{
					tabBarIcon: ProfileIcon,
					tabBarItemStyle: {
						...config.navigator.tabItemStyle(currentScreen, 'Profile'),
					},
				}}
			/>
		</Tab.Navigator>
	);
};

export default Navigation;
