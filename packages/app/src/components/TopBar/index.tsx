import React from 'react';
import { Text, View } from 'react-native';
import PawIcon from '../../assets/svg/paw.svg';
import { useUserContext } from '../../context/user';
import Icon from '../Icon';

const TopBar: React.FC = (): React.JSX.Element => {
	const { loggedUser } = useUserContext();

	return (
		<View className="fixed flex flex-row items-center justify-between w-full h-20 px-5 pt-3 bg-neutral-50">
			{/* Left Side */}
			<View className="px-5 py-1.5 rounded-lg bg-secondary-300 ml-2">
				<Icon className="absolute transform scale-105 -left-2/3 -top-1/3" Icon={PawIcon} />

				<Text className="mb-1 text-neutral-50 font-zen-kaku-gothic-new-black">
					{loggedUser?.coins || 0}
				</Text>
			</View>

			{/* Right Side */}
			<View className="flex-row mb-1">
				<Text className="self-end text-xl text-secondary-500 font-laila-medium">Paw</Text>
				<Icon className="scale-75" Icon={PawIcon} />
				<Text className="self-end text-xl text-secondary-500 font-laila-medium">Share</Text>
			</View>
		</View>
	);
};

export default TopBar;