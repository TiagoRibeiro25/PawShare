import React, { useEffect, useState } from 'react';
import { RefreshControl, Text, View } from 'react-native';
import { IOScrollView, InView } from 'react-native-intersection-observer';
import FilterIcon from '../../../../../assets/svg/filter.svg';
import ManageIcon from '../../../../../assets/svg/manage.svg';
import Button from '../../../../../components/Button';
import FeedLoadingSkeleton from '../../../../../components/FeedLoadingSkeleton';
import Icon from '../../../../../components/Icon';
import config from '../../../../../config';
import { useAdoptionFeedContext } from '../../../../../context/adoption/feed';
import useGetAdoptionFeedData from '../../../../../hooks/reactQuery/adoption/feed';
import { Adoption } from '../../../../../hooks/reactQuery/adoption/feed/types';
import Card from '../Card';
import EmptyState from '../EmptyState';
import { Props } from './types';

const Feed: React.FC<Props> = ({
	onFilterButtonPress,
	onManageButtonPress,
}): React.JSX.Element => {
	const [page, setPage] = useState<number>(1);
	const [adoptions, setAdoptions] = useState<Adoption[]>([]);
	const [total, setTotal] = useState<number>(0);

	// Filter param values
	const { color, gender, region, size, type } = useAdoptionFeedContext();

	const { data, isLoading, isError, refetch, isRefetching } = useGetAdoptionFeedData({
		page,
		limit: config.pagination.adoption.feed.defaultLimit,
		color,
		gender,
		city: region,
		size,
		type,
	});

	// If one of the filters changes, reset the page to 1
	useEffect(() => {
		setAdoptions([]);
		setTotal(0);
		setPage(1);
		refetch();
	}, [color, gender, refetch, region, size, type]);

	const handleOnChange = (inView: boolean, id: number): void => {
		// Check if it's the last item in the list
		if (!isLoading && !isError && inView && id === adoptions[adoptions.length - 1].id) {
			// Check if there are more adoptions to fetch
			if (adoptions.length >= total) {
				return;
			}

			setPage((prev: number) => prev + 1);
		}
	};

	const handleOnRefresh = (): void => {
		if (isRefetching || isLoading) {
			return;
		}

		setAdoptions([]);
		setPage(1);
		setTotal(0);
		refetch();
	};

	useEffect(() => {
		if (isLoading || isRefetching) {
			return;
		}

		if (data && data?.data.adoptions?.length > 0) {
			// Check if there are duplicates (if so, remove them)
			const filteredAdoptions = data.data.adoptions.filter((adoption: Adoption) => {
				return adoptions.findIndex((a: Adoption) => a.id === adoption.id) === -1;
			});

			setAdoptions((prev: Adoption[]) => [...prev, ...filteredAdoptions]);
			setTotal(data.data.total);
		}

		if (isError) {
			setAdoptions([]);
			setTotal(0);
		}

		//! Do not add adoptions to the dependencies array (it will cause an infinite loop)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isRefetching]);

	return (
		<View className="flex-1 pt-6">
			<View className="flex flex-row items-center justify-between w-full px-5 mb-8">
				<Text className="mt-1 text-2xl text-secondary-500 font-laila-semi-bold">Adoption</Text>

				<View className="flex-row space-x-6">
					<Button className="p-3 rounded-lg bg-accent-500" onPress={onManageButtonPress}>
						<Icon Icon={ManageIcon} />
					</Button>

					<Button className="p-3 rounded-lg bg-accent-500" onPress={onFilterButtonPress}>
						<Icon Icon={FilterIcon} />
					</Button>
				</View>
			</View>

			<IOScrollView
				className="flex-1"
				scrollEventThrottle={50}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={isRefetching}
						onRefresh={handleOnRefresh}
						colors={['#2B2A63']}
					/>
				}
			>
				{adoptions.map((adoption: Adoption) => (
					<InView
						key={adoption.id}
						onChange={(inView: boolean) => handleOnChange(inView, adoption.id)}
					>
						<Card adoption={adoption} />
					</InView>
				))}

				{(isLoading || isRefetching) && <FeedLoadingSkeleton />}
				{!isLoading && !isRefetching && isError && <EmptyState />}

				{/* If it reached the end and there's no more data to fetch */}
				{!isLoading && adoptions.length > 0 && adoptions.length >= total && (
					<Text className="mb-6 text-xl text-center text-secondary-500 font-laila-semi-bold">
						Yay! You have seen it all 👏
					</Text>
				)}
			</IOScrollView>
		</View>
	);
};

export default Feed;
