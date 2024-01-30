import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import AnimatedComponent from '../../../components/AnimatedComponent';
import { AdoptionFeedProvider } from '../../../context/adoption/feed';
import Feed from './components/Feed';
import FilterScreen from './components/FilterScreen';

const AdoptionFeed: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const [swiperIndex, setSwiperIndex] = useState<number>(0);

	return (
		<AnimatedComponent animation="FadeIn">
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
		</AnimatedComponent>
	);
};

export default AdoptionFeed;
