import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const DetailsLoadingSkeleton: React.FC = (): React.JSX.Element => {
	return (
		<ScrollView className="mb-12" showsVerticalScrollIndicator={false}>
			<View className="flex items-center justify-center mb-4 bg-gray-300 rounded h-72">
				<Svg width="40" height="40" viewBox="0 0 16 20" fill="currentColor">
					<Path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
					<Path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
				</Svg>
			</View>
			<View className="px-5">
				<View className="flex-row justify-between">
					<View className="h-2 bg-gray-200 rounded-full mb-2.5 w-32" />
					<View className="h-2 bg-gray-200 rounded-full mb-2.5 w-40" />
				</View>
				<View className="h-2 bg-gray-200 rounded-full mb-2.5 w-24 mt-3" />
				<View className="h-2 bg-gray-200 rounded-full mb-2.5 w-1/6 mt-6" />
				<View className="h-2 bg-gray-200 rounded-full mb-2.5 w-full mt-2" />
				<View className="h-2 bg-gray-200 rounded-full mb-2.5 w-full" />
				<View className="h-2 bg-gray-200 rounded-full mb-2.5 w-2/5 mt-6" />
				<View className="h-2 bg-gray-200 rounded-full mb-2.5 w-2/3" />
				<View className="h-2 bg-gray-200 rounded-full mb-2.5 w-3/4" />
				<View className="h-2 bg-gray-200 rounded-full mb-2.5 w-2/3" />
				<View className="h-2 bg-gray-200 rounded-full mb-2.5 w-2/5 mt-6" />
				<View className="h-2 bg-gray-200 rounded-full mb-2.5 w-3/4" />
				<View className="h-2 bg-gray-200 rounded-full mb-2.5 w-2/3" />
				<Text className="sr-only">Loading...</Text>
			</View>
		</ScrollView>
	);
};

export default DetailsLoadingSkeleton;
