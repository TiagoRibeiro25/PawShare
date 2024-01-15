import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import AnimatedScreen from '../../../../../components/AnimatedScreen';
import Button from '../../../../../components/Button';
import DropDownSelectList from '../../../../../components/DropDownSelectList';
import ImagePicker from '../../../../../components/ImagePicker';
import Input from '../../../../../components/Input';
import { Gender, Size } from '../../../../../types';
import formData from '../../../data';
import { Props, ValidateDataResult } from './types';
import utils from './utils';

const EditAnimal: React.FC<Props> = ({ animal }): React.JSX.Element => {
	const [picture, setPicture] = useState<Asset>();
	const [name, setName] = useState<string>(animal.name);
	const [type, setType] = useState<string>(animal.type);
	const [gender, setGender] = useState<Gender>(animal.gender);
	const [color, setColor] = useState<string>(animal.color);
	const [size, setSize] = useState<Size>(animal.size);
	const [description, setDescription] = useState<string>(animal.description || '');
	const [statusMessage, setStatusMessage] = useState<string>('');

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

		// TODO(tiago): Send data to backend
	};

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
