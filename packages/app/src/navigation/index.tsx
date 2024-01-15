import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import AdoptionFeedI from '../assets/svg/adoption_feed.svg';
import ProfileI from '../assets/svg/profile.svg';
import SittingFeedI from '../assets/svg/sitting_feed.svg';
import StoreI from '../assets/svg/store.svg';
import Icon from '../components/Icon';
import config from '../config';
import { useUserContext } from '../context/user';
import AdoptionDetails from '../screens/Adoption/Details';
import AdoptionFeed from '../screens/Adoption/Feed';
import ManageAdoptions from '../screens/Adoption/Manage';
import AddAnimal from '../screens/Animal/AddAnimal';
import Auth from '../screens/Auth';
import OnBoarding from '../screens/OnBoarding';
import Profile from '../screens/Profile';
import SittingDetails from '../screens/Sitting/Details';
import SittingFeed from '../screens/Sitting/Feed';
import Store from '../screens/Store';
import { RootStackParamList } from './types';

const Tab = createBottomTabNavigator<RootStackParamList>();

const Navigation: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const { loggedUser } = useUserContext();

	const [currentScreen, setCurrentScreen] = useState<string>('');
	const [orientation, setOrientation] = useState('PORTRAIT');

	// Navbar icons
	const AdoptionFeedIcon = useCallback(() => <Icon icon={AdoptionFeedI} />, []);
	const SittingFeedIcon = useCallback(() => <Icon icon={SittingFeedI} />, []);
	const StoreIcon = useCallback(() => <Icon icon={StoreI} />, []);
	const ProfileIcon = useCallback(() => <Icon icon={ProfileI} />, []);

	const guardClause = (mustBeLogged: boolean, destiny: React.FC<any>): React.FC => {
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
			// Set the current route name
			setCurrentScreen(e.data.state.routes[e.data.state.index].name);
		});
	});

	useEffect(() => {
		Dimensions.addEventListener('change', ({ window: { width, height } }) => {
			setOrientation(width < height ? 'PORTRAIT' : 'LANDSCAPE');
		});
	}, []);

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
				tabBarLabelPosition: orientation === 'PORTRAIT' ? 'below-icon' : 'beside-icon',
				tabBarStyle: {
					backgroundColor: '#2B2A63',
					height: orientation === 'PORTRAIT' ? 70 : 50,
				},
			}}
		>
			{/* _________________________________________________________________________________ */}

			{/* Adoption */}
			<Tab.Screen
				name="AdoptionFeed"
				component={guardClause(true, AdoptionFeed)}
				options={{
					tabBarIcon: AdoptionFeedIcon,
					tabBarItemStyle: config.navigator.tabItemStyle(currentScreen, 'AdoptionFeed'),
				}}
			/>

			<Tab.Screen
				name="AdoptionDetails"
				component={guardClause(true, AdoptionDetails)}
				options={{ tabBarItemStyle: { display: 'none' } }}
			/>

			<Tab.Screen
				name="ManageAdoptions"
				component={guardClause(true, ManageAdoptions)}
				options={{ tabBarItemStyle: { display: 'none' } }}
			/>

			{/* _________________________________________________________________________________ */}

			{/* Sitting */}
			<Tab.Screen
				name="SittingFeed"
				component={guardClause(true, SittingFeed)}
				options={{
					tabBarIcon: SittingFeedIcon,
					tabBarItemStyle: config.navigator.tabItemStyle(currentScreen, 'SittingFeed'),
				}}
			/>

			<Tab.Screen
				name="SittingDetails"
				component={guardClause(true, SittingDetails)}
				options={{ tabBarItemStyle: { display: 'none' } }}
			/>

			{/* _________________________________________________________________________________ */}

			{/* Store */}
			<Tab.Screen
				name="Store"
				component={guardClause(true, Store)}
				options={{
					tabBarIcon: StoreIcon,
					tabBarItemStyle: config.navigator.tabItemStyle(currentScreen, 'Store'),
				}}
			/>

			{/* _________________________________________________________________________________ */}

			{/* Profile */}
			<Tab.Screen
				name="Profile"
				component={guardClause(true, Profile)}
				options={{
					tabBarIcon: ProfileIcon,
					tabBarItemStyle: config.navigator.tabItemStyle(currentScreen, 'Profile'),
				}}
			/>

			{/* _________________________________________________________________________________ */}

			{/* Animal */}
			<Tab.Screen
				name="AddAnimal"
				component={guardClause(true, AddAnimal)}
				options={{ tabBarItemStyle: { display: 'none' } }}
			/>
		</Tab.Navigator>
	);
};

export default Navigation;
