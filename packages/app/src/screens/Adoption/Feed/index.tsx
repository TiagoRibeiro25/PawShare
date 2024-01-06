import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { IOScrollView, InView } from 'react-native-intersection-observer';
import FilterIcon from '../../../assets/svg/filter.svg';
import ManageIcon from '../../../assets/svg/manage.svg';
import Button from '../../../components/Button';
import Icon from '../../../components/Icon';
import useGetAdoptionFeedData from '../../../hooks/reactQuery/adoption/feed';
import { Adoption } from '../../../hooks/reactQuery/adoption/feed/types';
import Card from './components/Card';
import EmptyState from './components/EmptyState';
import Loading from './components/Loading';

// TODO(tiago): Filters functionality
const Feed: React.FC = (): React.JSX.Element => {
	const [page, setPage] = useState<number>(1);
	const [adoptions, setAdoptions] = useState<Adoption[]>([]);
	const [total, setTotal] = useState<number>(0);

	const { data, isLoading, isError } = useGetAdoptionFeedData({
		page,
		limit: 6,
	});

	const handleOnChange = (inView: boolean, id: number) => {
		// Check if it's the last item in the list
		if (!isLoading && !isError && inView && id === adoptions[adoptions.length - 1].id) {
			// Check if there are more adoptions to fetch
			if (adoptions.length >= total) {
				return;
			}

			// Increase the page number
			setPage((prev) => prev + 1);
		}
	};

	useEffect(() => {
		if (data && data?.data.adoptions.length > 0) {
			// Check if there are duplicates (if so, remove them)
			const filteredAdoptions = data.data.adoptions.filter(
				(adoption: Adoption) => !adoptions.includes(adoption),
			);

			setAdoptions((prev) => [...prev, ...filteredAdoptions]);
			setTotal(data.data.total);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<View className="flex-1 pt-6 bg-primary-50">
			<View className="flex flex-row items-center justify-between w-full px-5 mb-8">
				<Text className="mt-1 text-2xl text-secondary-500 font-laila-semi-bold">Adoption</Text>

				<View className="flex-row space-x-6">
					<Button className="p-3 rounded-lg bg-accent-500">
						<Icon Icon={ManageIcon} />
					</Button>

					<Button className="p-3 rounded-lg bg-accent-500">
						<Icon Icon={FilterIcon} />
					</Button>
				</View>
			</View>

			{adoptions.length > 0 && (
				<IOScrollView className="flex-1">
					{adoptions.map((adoption: Adoption) => (
						<InView
							key={adoption.id}
							onChange={(inView: boolean) => handleOnChange(inView, adoption.id)}
						>
							<Card adoption={adoption} />
						</InView>
					))}

					{isLoading && <Loading />}
					{!isLoading && adoptions.length > 0 && adoptions.length >= total && (
						<Text className="mb-6 text-xl text-center text-secondary-500 font-laila-semi-bold">
							Yay! You have seen it all 👏
						</Text>
					)}
				</IOScrollView>
			)}

			{isLoading && adoptions.length === 0 && <Loading />}
			{!isLoading && adoptions.length === 0 && <EmptyState />}
		</View>
	);
};

export default Feed;
