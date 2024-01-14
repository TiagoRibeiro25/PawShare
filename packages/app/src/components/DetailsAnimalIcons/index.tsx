import React from 'react';
import { Text, View } from 'react-native';
import FemaleIcon from '../../assets/svg/female_primary.svg';
import MaleIcon from '../../assets/svg/male_primary.svg';
import LargeIcon from '../../assets/svg/size_large.svg';
import MediumIcon from '../../assets/svg/size_medium.svg';
import SmallIcon from '../../assets/svg/size_small.svg';
import animalEmojis from '../../data/animal_emojis.json';
import Icon from '../Icon';
import { Props } from './types';

const DetailsAnimalIcons: React.FC<Props> = ({
	color,
	gender,
	size,
	type,
}): React.JSX.Element => {
	return (
		<View className="flex-row items-center">
			<Text className="text-2xl scale-110 mr-0.5 mb-0.5">
				{
					//@ts-ignore
					animalEmojis[type]
				}
			</Text>

			{gender === 'Other' ? (
				<Text className="text-3xl">👽</Text>
			) : (
				<Icon className="scale-75 mt-0.5" icon={gender === 'Male' ? MaleIcon : FemaleIcon} />
			)}

			<View
				className="ml-1 border rounded-full w-7 h-7 border-secondary-500"
				style={{ backgroundColor: color }}
			/>

			<Icon
				className="ml-2 scale-110"
				icon={size === 'Small' ? SmallIcon : size === 'Medium' ? MediumIcon : LargeIcon}
			/>
		</View>
	);
};

export default DetailsAnimalIcons;
