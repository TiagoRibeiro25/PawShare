import React, { useEffect, useState } from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import Input from '../../../../../../../components/Input';
import useGetCitiesData from '../../../../../../../hooks/reactQuery/cities';
import { Props } from './types';

const PREFIX_LENGTH = 5;

const CitiesInput: React.FC<Props> = ({ className, setSelected }): React.JSX.Element => {
	const [search, setSearch] = useState<string>('');
	const [cities, setCities] = useState<string[]>([]);
	const [allCities, setAllCities] = useState<string[]>([]);
	const [searchPrefix, setSearchPrefix] = useState<string>('');
	const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

	const { data, refetch, isLoading, isRefetching } = useGetCitiesData({
		search: searchPrefix,
	});

	const handleChange = (val: string): void => {
		setSearch(val);

		// Get first PREFIX_LENGTH letters of the search
		const prefix: string = val.slice(0, PREFIX_LENGTH);

		if (prefix.length < PREFIX_LENGTH) {
			setCities([]);
			setAllCities([]);
			setSearchPrefix('');
			return;
		}

		// Filter cities with the search
		if (prefix === searchPrefix) {
			setCities(allCities.filter((city: string) => city.includes(val)).slice(0, 5));
			return;
		}

		setSearchPrefix(prefix);
	};

	// Update the parent component when search changes
	useEffect(() => {
		// Check if the search is a valid city name
		if (allCities.includes(search)) {
			setSelected(search);
			return;
		}

		if (search.trim().length < PREFIX_LENGTH) {
			setSelected('');
			return;
		}

		setSelected(search);
	}, [allCities, search, setSelected]);

	// Refetch data when searchPrefix changes
	useEffect(() => {
		if (searchPrefix.length >= PREFIX_LENGTH) {
			refetch();
		}
	}, [refetch, searchPrefix]);

	// Set all cities when data is fetched
	useEffect(() => {
		if (data?.data.cities.length) {
			setAllCities([...new Set(data.data.cities)]);
		}
	}, [data]);

	// Watch for keyboard visibility (only show recommendations when keyboard is visible)
	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
			setKeyboardVisible(true),
		);
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
			setTimeout(() => {
				setKeyboardVisible(false);
			}, 1000),
		);

		return (): void => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	return (
		<View className={className}>
			<Text className="mb-1 text-base text-secondary-500 font-zen-kaku-gothic-new-bold">
				Region
			</Text>
			<Input
				className="justify-start h-12 border-2 rounded-xl border-secondary-500"
				textInputClassName="capitalize text-secondary-500"
				value={search}
				onChange={handleChange}
				placeholder="Search for a city"
			/>

			{(isLoading || isRefetching) && (
				<Text className="text-base font-zen-kaku-gothic-new-medium text-secondary-500">
					Loading...
				</Text>
			)}

			{cities.length > 0 && keyboardVisible && (
				<View className="max-h-[172px] mt-2 border-2 rounded-xl border-secondary-500 py-3 px-4">
					{cities.map((city: string) => (
						<TouchableOpacity key={city} onPress={() => setSearch(city)}>
							<Text className="text-base text-secondary-500">{city}</Text>
						</TouchableOpacity>
					))}
				</View>
			)}
		</View>
	);
};

export default CitiesInput;
