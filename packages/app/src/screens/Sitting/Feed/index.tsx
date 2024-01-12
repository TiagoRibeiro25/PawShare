import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import AnimatedScreen from '../../../components/AnimatedScreen';
import { SittingFeedProvider } from '../../../context/sitting/feed';
import FilterScreen from './components/FilterScreen';
import SittingFeed from './components/SittingFeed';

const queryClient = new QueryClient();

const Feed: React.FC = (): React.JSX.Element => {
	const [swiperIndex, setSwiperIndex] = useState<number>(0);

	return (
		<AnimatedScreen animation="FadeIn">
			<QueryClientProvider client={queryClient}>
				<SittingFeedProvider>
					<Swiper
						showsPagination={false}
						onIndexChanged={(index: number) => setSwiperIndex(index)}
						loop={false}
						index={swiperIndex}
						scrollEnabled={true}
					>
						<SittingFeed
							onFilterButtonPress={() => setSwiperIndex(1)}
							onManageButtonPress={() => console.log('Navigate to manage screen')}
						/>

						<FilterScreen onGoBack={() => setSwiperIndex(0)} />
					</Swiper>
				</SittingFeedProvider>
			</QueryClientProvider>
		</AnimatedScreen>
	);
};

export default Feed;
