import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import AnimatedScreen from '../../../components/AnimatedScreen';
import Button from '../../../components/Button';
import DetailsHeader from '../../../components/DetailsHeader';
import DropDownSelectList from '../../../components/DropDownSelectList';
import ImagePicker from '../../../components/ImagePicker';
import Input from '../../../components/Input';
import { Gender, Size } from '../../../types';
import formData from './data';
import utils from './utils';
import { ValidateDataResult } from './types';
import useAddAnimal from '../../../hooks/reactQuery/animals/add';
import { AddAnimalData } from '../../../hooks/reactQuery/animals/add/types';

const AddAnimal: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	const [picture, setPicture] = useState<Asset>();
	const [name, setName] = useState<string>('');
	const [type, setType] = useState<string>(formData.types[0].value);
	const [gender, setGender] = useState<Gender>(formData.genders[0].value as Gender);
	const [color, setColor] = useState<string>(formData.colors[0].value);
	const [size, setSize] = useState<Size>(formData.sizes[0].value as Size);
	const [description, setDescription] = useState<string>('');
	const [statusMessage, setStatusMessage] = useState<string>('');

	const { status, mutateAsync } = useAddAnimal({
		picture: 'data:image/png;base64,' + picture?.base64,
		name,
		type,
		color,
		size,
		gender,
		description,
	});

	const handleSubmit = async (): Promise<void> => {
		setStatusMessage('');

		const validation: ValidateDataResult = utils.validateData({
			picture: picture?.base64,
			name,
			type,
			gender,
			color,
			size,
			description,
		});

		if (!validation.valid && validation.message) {
			setStatusMessage(validation.message);
			return;
		}

		try {
			await mutateAsync(
				{},
				{
					onSuccess: (resData: AddAnimalData): void => {
						setStatusMessage(resData.message);

						// Reset the form
						setPicture(undefined);
						setName('');
						setType(formData.types[0].value);
						setGender(formData.genders[0].value as Gender);
						setColor(formData.colors[0].value);
						setSize(formData.sizes[0].value as Size);
						setDescription('');
					},
				},
			);
		} catch (_err: unknown) {
			setStatusMessage('Something went wrong');
		}
	};

	return (
		<AnimatedScreen animation="SlideInFromRight">
			<DetailsHeader
				isLoading={false}
				name="Add Animal"
				onNavigateBack={(): void => navigation.navigate('Profile' as never)}
			/>

			<ScrollView showsVerticalScrollIndicator={false}>
				<ImagePicker value={picture} onChange={setPicture} />

				<View className="self-center max-w-sm p-5 my-4">
					<Input
						value={name}
						onChange={setName}
						placeholder="Name"
						className="h-12 mb-6"
						textInputClassName="text-base"
					/>
					<DropDownSelectList
						data={formData.types}
						setSelected={setType}
						defaultOption={formData.types[0]}
						searchPlaceholder="Type"
						className="mb-6"
					/>
					<DropDownSelectList
						data={formData.genders}
						setSelected={(newVal: string) => setGender(newVal as Gender)}
						defaultOption={formData.genders[0]}
						searchPlaceholder="Gender"
						maxHeight={130}
						className="mb-6"
					/>
					<DropDownSelectList
						data={formData.colors}
						setSelected={setColor}
						defaultOption={formData.colors[0]}
						searchPlaceholder="Color"
						className="mb-6"
					/>
					<DropDownSelectList
						data={formData.sizes}
						setSelected={(newVal: string) => setSize(newVal as Size)}
						defaultOption={formData.sizes[0]}
						searchPlaceholder="Size"
						maxHeight={130}
						className="mb-6"
					/>
					<Input
						value={description}
						onChange={setDescription}
						placeholder="Description"
						className="mb-6"
						textInputClassName="text-base"
						multiLine
						numberOfLines={description.length / 30 + 1}
					/>

					{statusMessage !== '' && (
						<Text className="text-base text-center text-secondary-500 font-zen-kaku-gothic-new-bold">
							{statusMessage}
						</Text>
					)}

					<Button
						className="h-12 mt-6 bg-accent-500"
						onPress={handleSubmit}
						disabled={status === 'pending'}
					>
						<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
							{status === 'pending' ? 'Loading...' : 'Add Animal'}
						</Text>
					</Button>
				</View>
			</ScrollView>
		</AnimatedScreen>
	);
};

export default AddAnimal;
