import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import AnimatedScreen from '../../../../../components/AnimatedScreen';
import Button from '../../../../../components/Button';
import DropDownSelectList from '../../../../../components/DropDownSelectList';
import ImagePicker from '../../../../../components/ImagePicker';
import Input from '../../../../../components/Input';
import { Animal } from '../../../../../hooks/reactQuery/animals/details/types';
import useUpdateAnimal from '../../../../../hooks/reactQuery/animals/edit';
import { UpdateAnimalData } from '../../../../../hooks/reactQuery/animals/edit/types';
import { Gender, Size } from '../../../../../types';
import formData from '../../../data';
import { ValidateDataResult } from './types';
import utils from './utils';

type Props = {
	animal: Animal;
};

const EditAnimal: React.FC<Props> = ({ animal }): React.JSX.Element => {
	const [picture, setPicture] = useState<Asset>();
	const [name, setName] = useState<string>(animal.name);
	const [type, setType] = useState<string>(animal.type);
	const [gender, setGender] = useState<Gender>(animal.gender);
	const [color, setColor] = useState<string>(animal.color);
	const [size, setSize] = useState<Size>(animal.size);
	const [description, setDescription] = useState<string>(animal.description || '');
	const [statusMessage, setStatusMessage] = useState<string>('');
	const [dataToUpdate, setDataToUpdate] = useState<string[]>([]);

	const { mutateAsync } = useUpdateAnimal({
		animalId: animal.id,
		name,
		type,
		color,
		description,
		gender,
		size,
		picture: 'data:image/png;base64,' + picture?.base64,
		dataToUpdate,
	});

	const handleSubmit = async (): Promise<void> => {
		setStatusMessage('');

		const validation: ValidateDataResult = utils.validateData({
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

		const newDataToUpdate: string[] = [];

		// If true, it means the user has changed the value of the field
		const newData: Record<string, boolean> = {
			name: name !== animal.name,
			type: type !== animal.type,
			gender: gender !== animal.gender,
			color: color !== animal.color,
			size: size !== animal.size,
			description: description !== animal.description,
			picture: !!picture?.base64,
		};

		// Check what data has changed and append it to dataToUpdate
		Object.keys(newData).forEach((key: string) => {
			if (newData[key]) {
				newDataToUpdate.push(key);
			}
		});

		setDataToUpdate(newDataToUpdate);
	};

	useEffect(() => {
		if (dataToUpdate.length === 0) {
			return;
		}

		try {
			mutateAsync(
				{},
				{
					onSuccess: (resData: UpdateAnimalData): void => {
						console.log('resData:', resData);
					},
					onError: (err: unknown): void => {
						console.log('onError:', err);
					},
				},
			);
		} catch (err: unknown) {
			console.log('err:', err);
		}
	}, [dataToUpdate, mutateAsync]);

	return (
		<AnimatedScreen animation="FadeIn">
			<ScrollView showsVerticalScrollIndicator={false}>
				<ImagePicker value={picture} onChange={setPicture} defaultImage={animal.picture} />

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
						defaultOption={{ key: animal.type, value: animal.type }}
						searchPlaceholder="Type"
						className="mb-6"
					/>
					<DropDownSelectList
						data={formData.genders}
						setSelected={(newVal: string) => setGender(newVal as Gender)}
						defaultOption={{ key: animal.gender, value: animal.gender }}
						searchPlaceholder="Gender"
						maxHeight={130}
						className="mb-6"
					/>
					<DropDownSelectList
						data={formData.colors}
						setSelected={setColor}
						defaultOption={{ key: animal.color, value: animal.color }}
						searchPlaceholder="Color"
						className="mb-6"
					/>
					<DropDownSelectList
						data={formData.sizes}
						setSelected={(newVal: string) => setSize(newVal as Size)}
						defaultOption={{ key: animal.size, value: animal.size }}
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
						// disabled={status === 'pending'}
					>
						<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
							{/* {status === 'pending' ? 'Loading...' : 'Add Animal'} */}
							Apply Changes
						</Text>
					</Button>
				</View>
			</ScrollView>
		</AnimatedScreen>
	);
};

export default EditAnimal;
