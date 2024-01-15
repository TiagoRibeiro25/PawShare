import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import PawIcon from '../../assets/svg/paw.svg';
import { useUserContext } from '../../context/user';
import Icon from '../Icon';
import data from './data';

const TopBar: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const { loggedUser } = useUserContext();
	const [currentScreen, setCurrentScreen] = useState<string>('');

	useEffect(() => {
		return navigation.addListener('state', (e) => {
			// Set the current route name
			setCurrentScreen(e.data.state.routes[e.data.state.index].name);
		});
	});

	if (data.includes(currentScreen)) {
		return <></>;
	}

	return (
		<View className="fixed flex flex-row items-center justify-between w-full h-20 px-5 pt-3 bg-neutral-50">
			{/* Left Side */}
			<View className="py-1.5 rounded-lg bg-secondary-300 ml-2 w-20">
				<Icon className="absolute transform scale-105 -left-1/4 -top-1/3" icon={PawIcon} />

				<Text className="self-center mb-1 text-neutral-50 font-zen-kaku-gothic-new-black">
					{loggedUser?.coins || 0}
				</Text>
			</View>

			{/* Right Side */}
			<View className="flex-row mb-1.5">
				<Text className="self-end text-xl text-secondary-500 font-laila-medium">Paw</Text>
				<Icon className="scale-75" icon={PawIcon} />
				<Text className="self-end text-xl text-secondary-500 font-laila-medium">Share</Text>
			</View>
		</View>
	);
};

export default TopBar;
