import { useNavigation } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import AnimatedScreen from '../../../components/AnimatedScreen';
import { AdoptionFeedProvider } from '../../../context/adoption/feed';
import Feed from './components/Feed';
import FilterScreen from './components/FilterScreen';

const queryClient = new QueryClient();

const AdoptionFeed: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const [swiperIndex, setSwiperIndex] = useState<number>(0);

	return (
		<AnimatedScreen animation="FadeIn">
			<QueryClientProvider client={queryClient}>
				<AdoptionFeedProvider>
					<Swiper
						showsPagination={false}
						onIndexChanged={(index: number) => setSwiperIndex(index)}
						loop={false}
						index={swiperIndex}
					>
						<Feed
							onFilterButtonPress={() => setSwiperIndex(1)}
							onManageButtonPress={() => navigation.navigate('ManageAdoptions' as never)}
						/>

						<FilterScreen onGoBack={() => setSwiperIndex(0)} />
					</Swiper>
				</AdoptionFeedProvider>
			</QueryClientProvider>
		</AnimatedScreen>
	);
};

export default AdoptionFeed;
