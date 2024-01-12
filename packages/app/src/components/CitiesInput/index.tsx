import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import useGetCitiesData from '../../hooks/reactQuery/cities';
import Input from '../Input';
import { Props } from './types';

const PREFIX_LENGTH = 3;

const CitiesInput: React.FC<Props> = ({ className, setSelected }): React.JSX.Element => {
	const [search, setSearch] = useState<string>('');
	const [cities, setCities] = useState<string[]>([]);
	const [allCities, setAllCities] = useState<string[]>([]);
	const [searchPrefix, setSearchPrefix] = useState<string>('');
	const [showRecomendations, setShowRecomendations] = useState<boolean>(true);

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
			setCities(
				allCities
					.filter((city: string) => city.toLowerCase().includes(val.toLowerCase()))
					.slice(0, 5),
			);
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

	// Show recomendations when search is not a valid city name
	useEffect(() => {
		const lowerCaseCities: string[] = allCities.map((city: string) => city.toLowerCase());

		console.log(lowerCaseCities);

		setShowRecomendations(
			!lowerCaseCities.includes(search.toLowerCase()) && search.trim().length >= PREFIX_LENGTH,
		);
	}, [allCities, search]);

	return (
		<View className={className}>
			<Text className="mb-1 text-base text-secondary-500 font-zen-kaku-gothic-new-bold">
				Region
			</Text>
			<Input
				className="justify-start h-12 border-2 rounded-xl border-secondary-500"
				textInputClassName="text-secondary-500"
				value={search}
				onChange={handleChange}
				placeholder="Search for a city"
			/>

			{(isLoading || isRefetching) && (
				<Text className="text-base font-zen-kaku-gothic-new-medium text-secondary-500">
					Loading...
				</Text>
			)}

			{cities.length > 0 && showRecomendations && (
				<View className="px-4 py-3 mt-2 space-y-3 border-2 rounded-xl border-secondary-500">
					{cities.map((city: string) => (
						<TouchableOpacity key={city} onPress={() => setSearch(city)}>
							<Text className="text-base text-secondary-500 font-zen-kaku-gothic-new-medium">
								{city}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			)}
		</View>
	);
};

export default CitiesInput;
