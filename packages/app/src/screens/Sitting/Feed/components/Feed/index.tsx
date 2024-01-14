import React, { useEffect, useState } from 'react';
import { RefreshControl, Text, View } from 'react-native';
import { IOScrollView, InView } from 'react-native-intersection-observer';
import FilterIcon from '../../../../../assets/svg/filter.svg';
import ManageIcon from '../../../../../assets/svg/manage.svg';
import Button from '../../../../../components/Button';
import FeedLoadingSkeleton from '../../../../../components/FeedLoadingSkeleton';
import Icon from '../../../../../components/Icon';
import config from '../../../../../config';
import { useSittingFeedContext } from '../../../../../context/sitting/feed';
import useGetSittingFeedData from '../../../../../hooks/reactQuery/sitting/feed';
import { Sitting } from '../../../../../hooks/reactQuery/sitting/feed/types';
import Card from '../Card';
import EmptyState from '../EmptyState';
import { Props } from './types';

const Feed: React.FC<Props> = ({
	onFilterButtonPress,
	onManageButtonPress,
}): React.JSX.Element => {
	const [page, setPage] = useState<number>(1);
	const [sittings, setSittings] = useState<Sitting[]>([]);
	const [total, setTotal] = useState<number>(0);

	// Filter param values
	const { color, gender, region, size, type, coins } = useSittingFeedContext();

	const { data, isLoading, isError, refetch, isRefetching } = useGetSittingFeedData({
		page,
		limit: config.pagination.sitting.feed.defaultLimit,
		color,
		gender,
		city: region,
		size,
		type,
		coins,
	});

	useEffect(() => {
		// If one of the filters changes, reset the page to 1
		setSittings([]);
		setTotal(0);
		setPage(1);
		refetch();
	}, [color, gender, refetch, region, size, type]);

	const handleOnChange = (inView: boolean, id: number): void => {
		// Check if it's the last item in the list
		if (!isLoading && !isError && inView && id === sittings[sittings.length - 1].id) {
			// Check if there are more sittings to fetch
			if (sittings.length >= total) {
				return;
			}

			setPage((prev: number) => prev + 1);
		}
	};

	const handleOnRefresh = (): void => {
		if (isRefetching || isLoading) {
			return;
		}

		setSittings([]);
		setPage(1);
		setTotal(0);
		refetch();
	};

	useEffect(() => {
		if (isLoading || isRefetching) {
			return;
		}

		if (data && data?.data.sittings?.length > 0) {
			// Check if there are duplicates (if so, remove them)
			const filteredSittings = data.data.sittings.filter((sitting: Sitting) => {
				return sittings.findIndex((a: Sitting) => a.id === sitting.id) === -1;
			});

			setSittings((prev: Sitting[]) => [...prev, ...filteredSittings]);
			setTotal(data.data.total);
		}

		if (isError) {
			setSittings([]);
			setTotal(0);
		}

		//! Do not add sittings to the dependencies array (it will cause an infinite loop)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isRefetching]);

	return (
		<View className="flex-1 pt-6">
			<View className="flex flex-row items-center justify-between w-full px-5 mb-8">
				<Text className="mt-1 text-2xl text-secondary-500 font-laila-semi-bold">Sitting</Text>

				<View className="flex-row space-x-6">
					<Button className="p-3 rounded-lg bg-accent-500" onPress={onManageButtonPress}>
						<Icon icon={ManageIcon} />
					</Button>

					<Button className="p-3 rounded-lg bg-accent-500" onPress={onFilterButtonPress}>
						<Icon icon={FilterIcon} />
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
				{sittings.map((sitting: Sitting) => (
					<InView
						key={sitting.id}
						onChange={(inView: boolean) => handleOnChange(inView, sitting.id)}
					>
						<Card sitting={sitting} />
					</InView>
				))}

				{(isLoading || isRefetching) && <FeedLoadingSkeleton />}
				{!isLoading && !isRefetching && isError && <EmptyState />}

				{/* If it reached the end and there's no more data to fetch */}
				{!isLoading && sittings.length > 0 && sittings.length >= total && (
					<Text className="mb-6 text-xl text-center text-secondary-500 font-laila-semi-bold">
						Yay! You have seen it all 👏
					</Text>
				)}
			</IOScrollView>
		</View>
	);
};

export default Feed;
