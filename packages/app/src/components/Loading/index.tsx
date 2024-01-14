import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { Props } from './types';

const Loading: React.FC<Props> = ({ onAnimationFinish }) => {
	return (
		<View className="items-center justify-center flex-1">
			<LottieView
				source={require('../../assets/gif/SplashScreen.json')}
				autoPlay={true}
				loop={false}
				speed={1}
				style={styles.splashScreen}
				onAnimationFinish={onAnimationFinish}
			/>
		</View>
	);
};

export default Loading;
