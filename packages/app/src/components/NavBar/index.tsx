import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import utils from '../../utils';
import Icon from '../Icon';
import screens from './screens';
import { Screen } from './types';

const NavBar: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	const [currentScreen, setCurrentScreen] = useState<string>(
		utils.navigation.getCurrentScreen(navigation),
	);

	const navigateToScreen = (screenName: string) => {
		navigation.navigate(screenName as never);
		setCurrentScreen(screenName);
	};

	useEffect(() => {
		// Everytime current navigation screen changes, update the current screen
		setCurrentScreen(utils.navigation.getCurrentScreen(navigation));
	}, [navigation]);

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
