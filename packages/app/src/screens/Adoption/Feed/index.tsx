import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import { AdoptionFeedProvider } from '../../../context/adoption/feed';
import AdoptionFeed from './components/AdoptionFeed';
import FilterScreen from './components/FilterScreen';

const queryClient = new QueryClient();

const Feed: React.FC = (): React.JSX.Element => {
	const [swiperIndex, setSwiperIndex] = useState<number>(0);

	return (
		<QueryClientProvider client={queryClient}>
			<AdoptionFeedProvider>
				<Swiper
					showsPagination={false}
					onIndexChanged={(index: number) => setSwiperIndex(index)}
					loop={false}
					index={swiperIndex}
					scrollEnabled={true}
				>
					<AdoptionFeed
						onFilterButtonPress={() => setSwiperIndex(1)}
						onManageButtonPress={() => console.log('Navigate to manage screen')} // TODO(tiago): Add the screen
					/>

					<FilterScreen onGoBack={() => setSwiperIndex(0)} />
				</Swiper>
			</AdoptionFeedProvider>
		</QueryClientProvider>
	);
};

export default Feed;
