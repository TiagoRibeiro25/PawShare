import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './styles';

const Loading: React.FC<{ onAnimationFinish: () => void }> = ({ onAnimationFinish }) => {
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
