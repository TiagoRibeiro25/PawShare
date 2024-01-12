import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Button from '../../../../../components/Button';
import CitiesInput from '../../../../../components/CitiesInput';
import DropDownSelectList from '../../../../../components/DropDownSelectList';
import NavigateBackButton from '../../../../../components/FilterNavigateBackButton';
import { useAdoptionFeedContext } from '../../../../../context/adoption/feed';
import { useUserContext } from '../../../../../context/user';
import animals from '../../../../../data/animals.json';
import colors from '../../../../../data/colors.json';
import genders from '../../../../../data/genders.json';
import sizes from '../../../../../data/sizes.json';
import { Gender, Size } from '../../../../../types';
import utils from '../../../../../utils';
import { Props } from './types';

const FilterScreen: React.FC<Props> = ({ onGoBack }): React.JSX.Element => {
	const { setColor, setGender, setRegion, setSize, setType } = useAdoptionFeedContext();
	const { loggedUser } = useUserContext();

	const [filterType, setFilterType] = useState<string>('any');
	const [filterRegion, setFilterRegion] = useState<string>('');
	const [filterSize, setFilterSize] = useState<string>('any');
	const [filterGender, setFilterGender] = useState<string>('any');
	const [filterColor, setFilterColor] = useState<string>('any');

	// This will never happen (this screen is only accessible if loggedUser exists)
	if (!loggedUser) {
		return <></>;
	}

	const handleApply = (): void => {
		setType(filterType);
		setRegion(filterRegion);
		setSize(utils.formatData.capitalize(filterSize) as Size);
		setGender(utils.formatData.capitalize(filterGender) as Gender);
		setColor(filterColor);
		onGoBack();
	};

	return (
		<View className="items-center flex-1 pt-6">
			<Text className="mt-3 text-2xl text-secondary-500 font-laila-semi-bold">Filter By</Text>
			<NavigateBackButton onPress={onGoBack} />

			<ScrollView className="w-full mt-12" showsVerticalScrollIndicator={false}>
				{/* Animal Type */}
				<DropDownSelectList
					className="self-center w-52"
					label="Type"
					searchPlaceholder="Type"
					data={animals.map((animal: string) => {
						return { key: animal, value: animal };
					})}
					setSelected={(val: string) => setFilterType(val)}
					defaultOption={{ key: 'any', value: 'any' }}
				/>

				{/* Region */}
				<CitiesInput
					className="self-center mt-6 w-52"
					setSelected={(val: string) => setFilterRegion(val)}
				/>

				{/* Animal Size */}
				<DropDownSelectList
					className="self-center mt-6 w-52"
					label="Size"
					searchPlaceholder="Size"
					data={sizes.map((size: string) => {
						return { key: size, value: size };
					})}
					setSelected={(val: string) => setFilterSize(val)}
					defaultOption={{ key: 'any', value: 'any' }}
				/>

				{/* Animal Gender */}
				<DropDownSelectList
					className="self-center mt-6 w-52"
					label="Gender"
					searchPlaceholder="Gender"
					data={genders.map((gender: string) => {
						return { key: gender, value: gender };
					})}
					setSelected={(val: string) => setFilterGender(val)}
					defaultOption={{ key: 'any', value: 'any' }}
				/>

				{/* Animal Color */}
				<DropDownSelectList
					className="self-center mt-6 w-52"
					label="Color"
					searchPlaceholder="Color"
					data={colors.map((color: string) => {
						return { key: color, value: color };
					})}
					setSelected={(val: string) => setFilterColor(val)}
					defaultOption={{ key: 'any', value: 'any' }}
				/>

				{/* Apply Button */}
				<Button
					className="self-center px-3 py-2 mt-12 mb-20 bg-accent-500 w-52"
					onPress={handleApply}
				>
					<Text className="text-lg mb-0.5 text-secondary-500 font-zen-kaku-gothic-new-bold">
						Apply
					</Text>
				</Button>
			</ScrollView>
		</View>
	);
};

export default FilterScreen;
