import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import utils from '../../utils';
import Icon from '../Icon';
import screens from './screens';
import { Screen } from './types';

const NavBar: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	const [currentScreen, setCurrentScreen] = useState<string>(screens[0].name);

	const navigateToScreen = (screenName: string) => {
		navigation.navigate(screenName as never);
		setCurrentScreen(screenName);
	};

	useEffect(() => {
		// Everytime current navigation screen changes, update the current screen
		const newScreen = utils.navigation.getCurrentScreen(navigation);

		if (
			newScreen && // If newScreen is not undefined
			newScreen !== currentScreen && // If newScreen is different from currentScreen
			screens.map((screen: Screen) => screen.name).includes(newScreen) // If newScreen is a valid screen
		) {
			setCurrentScreen(newScreen);
		}

		console.log('Current Screen: ', newScreen);
	}, [currentScreen, navigation]);

	return (
		<View className="flex flex-row items-center justify-between w-full h-20 bg-secondary-500">
			{screens.map((screen: Screen) => (
				<TouchableOpacity
					key={screen.name}
					className={`items-center justify-center w-1/4 h-full ${
						currentScreen === screen.name && 'border-b-4 border-primary-50 bg-secondary-300'
					}`}
					onPress={() => navigateToScreen(screen.name)}
					disabled={currentScreen === screen.name}
				>
					<Icon Icon={screen.icon} />
					<Text className="font-zen-kaku-gothic-new-medium text-neutral-50">
						{screen.displayName}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default NavBar;
