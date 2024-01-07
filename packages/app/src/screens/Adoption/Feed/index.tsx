import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import { AdoptionFeedProvider } from '../../../context/adoption/feed';
import AdoptionFeed from './components/AdoptionFeed';
import FilterScreen from './components/FilterScreen';

const Feed: React.FC = (): React.JSX.Element => {
	const [swiperIndex, setSwiperIndex] = useState<number>(0);

	return (
		<AdoptionFeedProvider>
			<Swiper
				showsPagination={false}
				onIndexChanged={(index: number) => setSwiperIndex(index)}
				loop={false}
				index={swiperIndex}
				scrollEnabled={true} // TODO(tiago): Find a way to make this work along side with the buttons
			>
				<AdoptionFeed
					onFilterButtonPress={() => setSwiperIndex(1)}
					onManageButtonPress={() => console.log('Navigate to manage screen')} // TODO(tiago): Add the screen
				/>

				<FilterScreen onGoBack={() => setSwiperIndex(0)} />
			</Swiper>
		</AdoptionFeedProvider>
	);
};

export default Feed;
