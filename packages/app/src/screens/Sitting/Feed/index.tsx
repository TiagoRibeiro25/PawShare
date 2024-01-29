import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import AnimatedComponent from '../../../components/AnimatedComponent';
import { SittingFeedProvider } from '../../../context/sitting/feed';
import Feed from './components/Feed';
import FilterScreen from './components/FilterScreen';

const SittingFeed: React.FC = (): React.JSX.Element => {
	const [swiperIndex, setSwiperIndex] = useState<number>(0);

	return (
		<AnimatedComponent animation="FadeIn">
			<SittingFeedProvider>
				<Swiper
					showsPagination={false}
					onIndexChanged={(index: number) => setSwiperIndex(index)}
					loop={false}
					index={swiperIndex}
					scrollEnabled={true}
				>
					<Feed
						onFilterButtonPress={() => setSwiperIndex(1)}
						onManageButtonPress={() => console.log('Navigate to manage screen')}
					/>

					<FilterScreen onGoBack={() => setSwiperIndex(0)} />
				</Swiper>
			</SittingFeedProvider>
		</AnimatedComponent>
	);
};

export default SittingFeed;
