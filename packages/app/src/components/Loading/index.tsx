import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

const Loading: React.FC = (): React.JSX.Element => {
	return (
		<View className="items-center justify-center flex-1">
			<FastImage source={require('../../assets/gif/loading.gif')} className="w-56 h-56" />
		</View>
	);
};

export default Loading;
