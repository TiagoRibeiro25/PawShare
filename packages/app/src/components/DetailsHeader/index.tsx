import React from 'react';
import { Text, View } from 'react-native';
import NavigateBackButton from './components/NavigateBackButton';

type Props = {
	isLoading: boolean;
	name?: string;
	onNavigateBack?: () => void;
};

const DetailsHeader: React.FC<Props> = ({
	isLoading,
	name,
	onNavigateBack,
}): React.JSX.Element => {
	return (
		<View className="flex-row justify-between p-5">
			<NavigateBackButton onPress={onNavigateBack} />

			{isLoading ? (
				<View className="self-center w-2/6 h-4 bg-gray-200 rounded-full" />
			) : (
				<Text className="self-center text-2xl font-laila-semi-bold text-secondary-500 mt-1.5">
					{name}
				</Text>
			)}
		</View>
	);
};

export default DetailsHeader;
