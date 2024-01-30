import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import ArrowDownIcon from '../../../../../../../assets/svg/arrow_down.svg';
import AnimatedComponent from '../../../../../../../components/AnimatedComponent';
import Button from '../../../../../../../components/Button';
import CitiesInput from '../../../../../../../components/CitiesInput';
import DynamicInputList, { Item } from '../../../../../../../components/DynamicInputList';
import Icon from '../../../../../../../components/Icon';
import Input from '../../../../../../../components/Input';
import useAddAdoption from '../../../../../../../hooks/reactQuery/adoption/add';
import { AddAdoptionData } from '../../../../../../../hooks/reactQuery/adoption/add/types';
import utils from '../../../../../../../utils';

type Props = {
	className?: string;
	animalId: number;
};

const PlaceForAdoptionButton: React.FC<Props> = ({
	className,
	animalId,
}): React.JSX.Element => {
	const navigation = useNavigation();

	const [showForm, setShowForm] = useState<boolean>(false);
	const [city, setCity] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [contact, setContact] = useState<string>('');
	const [notes, setNotes] = useState<Item[]>([{ id: '1', value: '' }]);
	const [statusMessage, setStatusMessage] = useState<string>('');

	const { status, mutateAsync, error } = useAddAdoption({
		animalId,
		bodyData: {
			city,
			email_contact: email,
			phone_contact: contact,
			notes: notes.map((note: Item) => note.value).filter((note: string) => note !== ''),
		},
	});

	const handlePlaceForAdoption = async (): Promise<void> => {
		setStatusMessage('');

		// Validate the Form Data
		if (city === '') {
			setStatusMessage('Invalid City');
			return;
		}

		if (!utils.validateData.isValid(email, 'email')) {
			setStatusMessage('Invalid Email');
			return;
		}

		if (!utils.validateData.isValid(contact, 'phone')) {
			setStatusMessage('Invalid Contact');
			return;
		}

		if (notes.length <= 1) {
			setStatusMessage('Missing at least 1 note');
			return;
		}

		try {
			await mutateAsync(
				{},
				{
					onSuccess(resData: AddAdoptionData): void {
						setStatusMessage(resData.message);
					},
				},
			);
		} catch (_err: unknown) {
			// ...
		}
	};

	// If the navigation state has changed, close the form
	useEffect(() => {
		return navigation.addListener('state', (_e) => {
			setShowForm(false);
		});
	});

	return (
		<>
			<Button
				className={`space-x-2 ${className} ${showForm ? 'bg-accent-200' : 'bg-accent-500'}`}
				onPress={(): void => setShowForm(!showForm)}
			>
				<Icon
					icon={ArrowDownIcon}
					className={`mt-1 ${showForm ? 'transform rotate-180' : ''}`}
				/>

				<Text className="py-1 text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
					{showForm ? 'Cancel Adoption' : 'Place for Adoption'}
				</Text>
			</Button>

			{showForm && (
				<AnimatedComponent animation="FadeIn">
					<View className="p-5 -mt-1 border-b-2 border-l-2 border-r-2 rounded-b-md border-secondary-500">
						<CitiesInput
							className="self-center mt-2"
							setSelected={setCity}
							placeholder="City"
						/>

						<Input
							className="h-12 mt-6"
							value={email}
							onChange={setEmail}
							placeholder="Email"
						/>

						<Input
							className="h-12 mt-6"
							value={contact}
							onChange={setContact}
							placeholder="Contact (ex: +639123456789)"
							keyboardType="phone-pad"
						/>

						<DynamicInputList
							type="note"
							list={notes}
							updateList={setNotes}
							inputClassName="h-12 mt-6 bg-primary-50"
						/>

						{status === 'success' && (
							<Text className="mt-6 text-base text-center font-zen-kaku-gothic-new-medium text-success-500">
								Animal has been placed for adoption successfully!
							</Text>
						)}

						{(statusMessage !== '' || status === 'error') && (
							<Text className="mt-6 text-base text-center font-zen-kaku-gothic-new-medium text-secondary-500">
								{statusMessage !== ''
									? statusMessage
									: status === 'error' && utils.error.getMessage(error)}
							</Text>
						)}

						<Button
							className="mt-6 bg-accent-500"
							onPress={handlePlaceForAdoption}
							disabled={status === 'pending'}
						>
							<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
								{status === 'pending' ? 'Loading...' : 'Place for Adoption'}
							</Text>
						</Button>
					</View>
				</AnimatedComponent>
			)}
		</>
	);
};

export default PlaceForAdoptionButton;
