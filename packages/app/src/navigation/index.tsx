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
import AnimalProfile from '../screens/Animal/Profile';
import Auth from '../screens/Auth';
import AddDocument from '../screens/Documents/Add';
import OnBoarding from '../screens/OnBoarding';
import Profile from '../screens/Profile';
import EditProfile from '../screens/Profile/EditProfile';
import OwnProfile from '../screens/Profile/OwnProfile';
import SittingDetails from '../screens/Sitting/Details';
import SittingFeed from '../screens/Sitting/Feed';
import Store from '../screens/Store';
import { RootStackParamList } from './types';
import utils from './utils';

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
				<Tab.Screen
					name="OnBoarding"
					component={utils.guardClause(false, OnBoarding, loggedUser)}
				/>
				<Tab.Screen name="Auth" component={utils.guardClause(false, Auth, loggedUser)} />
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
				component={utils.guardClause(true, AdoptionFeed, loggedUser)}
				options={{
					tabBarIcon: AdoptionFeedIcon,
					tabBarItemStyle: config.navigator.tabItemStyle(currentScreen, 'AdoptionFeed'),
				}}
			/>

			<Tab.Screen
				name="AdoptionDetails"
				component={utils.guardClause(true, AdoptionDetails, loggedUser)}
				options={{ tabBarItemStyle: { display: 'none' } }}
			/>

			<Tab.Screen
				name="ManageAdoptions"
				component={utils.guardClause(true, ManageAdoptions, loggedUser)}
				options={{ tabBarItemStyle: { display: 'none' } }}
			/>

			{/* _________________________________________________________________________________ */}

			{/* Sitting */}
			<Tab.Screen
				name="SittingFeed"
				component={utils.guardClause(true, SittingFeed, loggedUser)}
				options={{
					tabBarIcon: SittingFeedIcon,
					tabBarItemStyle: config.navigator.tabItemStyle(currentScreen, 'SittingFeed'),
				}}
			/>

			<Tab.Screen
				name="SittingDetails"
				component={utils.guardClause(true, SittingDetails, loggedUser)}
				options={{ tabBarItemStyle: { display: 'none' } }}
			/>

			{/* _________________________________________________________________________________ */}

			{/* Store */}
			<Tab.Screen
				name="Store"
				component={utils.guardClause(true, Store, loggedUser)}
				options={{
					tabBarIcon: StoreIcon,
					tabBarItemStyle: config.navigator.tabItemStyle(currentScreen, 'Store'),
				}}
			/>

			{/* _________________________________________________________________________________ */}

			{/* Profile */}
			<Tab.Screen
				name="Profile"
				component={utils.guardClause(true, Profile, loggedUser)}
				options={{ tabBarItemStyle: { display: 'none' } }}
			/>

			{/* Own Profile */}
			<Tab.Screen
				name="OwnProfile"
				component={utils.guardClause(true, OwnProfile, loggedUser)}
				options={{
					tabBarIcon: ProfileIcon,
					tabBarItemStyle: config.navigator.tabItemStyle(currentScreen, 'OwnProfile'),
					tabBarLabel: 'Profile',
				}}
			/>

			{/* Edit Profile */}
			<Tab.Screen
				name="EditProfile"
				component={utils.guardClause(true, EditProfile, loggedUser)}
				options={{ tabBarItemStyle: { display: 'none' } }}
			/>

			{/* _________________________________________________________________________________ */}

			{/* Animal */}
			<Tab.Screen
				name="AddAnimal"
				component={utils.guardClause(true, AddAnimal, loggedUser)}
				options={{ tabBarItemStyle: { display: 'none' } }}
			/>

			<Tab.Screen
				name="AnimalProfile"
				component={utils.guardClause(true, AnimalProfile, loggedUser)}
				options={{ tabBarItemStyle: { display: 'none' } }}
			/>

			{/* _________________________________________________________________________________ */}

			{/* Documents */}
			<Tab.Screen
				name="AddDocument"
				component={utils.guardClause(true, AddDocument, loggedUser)}
				options={{ tabBarItemStyle: { display: 'none' } }}
			/>
		</Tab.Navigator>
	);
};

export default Navigation;
