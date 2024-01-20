import React from 'react';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import styles from './styles';

type Props = {
	rating: number;
};

const ReviewsRating: React.FC<Props> = ({ rating }): React.JSX.Element => {
	return (
		<StarRatingDisplay
			starStyle={styles.starStyle}
			color="#F8B436"
			emptyColor="#FBD49D"
			starSize={32}
			rating={rating}
		/>
	);
};

export default ReviewsRating;
