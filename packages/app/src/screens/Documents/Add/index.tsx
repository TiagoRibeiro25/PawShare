import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import AnimatedComponent from '../../../components/AnimatedComponent';
import Button from '../../../components/Button';
import NavigateBackButton from '../../../components/FilterNavigateBackButton';
import Input from '../../../components/Input';

const AddDocument: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	const [name, setName] = useState<string>('');
	// const [document, setDocument] = useState();

	// TODO(tiago): Get the document from the user device and send it to the api

	return (
		<AnimatedComponent animation="FadeIn">
			<View className="items-center pt-6">
				<Text className="mt-3 text-2xl text-secondary-500 font-laila-semi-bold">
					Add Document
				</Text>
				<NavigateBackButton onPress={(): void => navigation.navigate('Profile' as never)} />
			</View>

			<ScrollView className="self-center max-w-xs py-6 mt-12">
				<Input
					value={name}
					onChange={setName}
					placeholder="Document name"
					textInputClassName="text-base"
				/>

				<View className="mt-16 space-y-12">
					<Button className="p-3 border-2 border-secondary-500 rounded-xl">
						{/* TODO(tiago): Add Camera Icon */}
						<Text className="text-base font-zen-kaku-gothic-new-bold text-secondary-500">
							Use Camera
						</Text>
					</Button>

					<View className="flex-row items-center justify-between">
						<View className="flex-1 h-0 border rounded-full border-secondary-500" />
						<Text className="px-6 text-base font-zen-kaku-gothic-new-bold text-secondary-500">
							or
						</Text>
						<View className="flex-1 h-0 border rounded-full border-secondary-500" />
					</View>

					<Button className="p-3 border-2 border-secondary-500 rounded-xl">
						{/* TODO(tiago): Add Upload File Icon */}
						<Text className="text-base font-zen-kaku-gothic-new-bold text-secondary-500">
							Upload Document
						</Text>
					</Button>
				</View>

				<Button className="self-center p-3 mt-20 space-x-3 bg-accent-500 w-60">
					<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
						Add Document
					</Text>
				</Button>
			</ScrollView>
		</AnimatedComponent>
	);
};

export default AddDocument;
