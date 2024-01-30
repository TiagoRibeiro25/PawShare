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
import useAddSitting from '../../../../../../../hooks/reactQuery/sitting/add';
import { AddSittingData } from '../../../../../../../hooks/reactQuery/sitting/add/types';
import utils from '../../../../../../../utils';

type Props = {
	className?: string;
	animalId: number;
};

const RequestSittingButton: React.FC<Props> = ({ className, animalId }): React.JSX.Element => {
	const navigation = useNavigation();

	const [showForm, setShowForm] = useState<boolean>(false);
	const [city, setCity] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [contact, setContact] = useState<string>('');
	const [startDate, setStartDate] = useState<string>('');
	const [endDate, setEndDate] = useState<string>('');
	const [notes, setNotes] = useState<Item[]>([{ id: '1', value: '' }]);
	const [coins, setCoins] = useState<number>(0);
	const [statusMessage, setStatusMessage] = useState<string>('');

	const { status, mutateAsync, error } = useAddSitting({
		animalId,
		bodyData: {
			city,
			email_contact: email,
			phone_contact: contact,
			start_date: startDate,
			end_date: endDate,
			notes: notes.map((note: Item) => note.value).filter((note: string) => note !== ''),
			coins,
		},
	});

	const handleRequestSitting = async (): Promise<void> => {
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

		if (coins < 0) {
			setStatusMessage('Invalid Coins');
			return;
		}

		if (!utils.validateData.isValid(startDate, 'date')) {
			setStatusMessage('Invalid Start Date');
			return;
		}

		if (!utils.validateData.isValid(endDate, 'date')) {
			setStatusMessage('Invalid End Date');
			return;
		}

		if (new Date(startDate) < new Date()) {
			setStatusMessage('Start Date must be after today');
			return;
		}

		if (new Date(startDate) > new Date(endDate)) {
			setStatusMessage('Start Date must be before End Date');
			return;
		}

		try {
			await mutateAsync(
				{},
				{
					onSuccess(resData: AddSittingData): void {
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
					{showForm ? 'Cancel Request' : 'Request Pet Sitting'}
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

						{/* TODO(tiago): Use react-native-date-picker */}
						<Input
							className="h-12 mt-6"
							value={startDate}
							onChange={setStartDate}
							placeholder="Start Date (ex: 30-01-2024)"
							keyboardType="phone-pad"
						/>

						<Input
							className="h-12 mt-6"
							value={endDate}
							onChange={setEndDate}
							placeholder="End Date (ex: 10-02-2024)"
							keyboardType="phone-pad"
						/>

						<Input
							className="h-12 mt-6"
							value={coins.toString()}
							onChange={(value: string): void => setCoins(parseInt(value, 10))}
							placeholder="Coins"
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
							onPress={handleRequestSitting}
							disabled={status === 'pending'}
						>
							<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
								{status === 'pending' ? 'Loading...' : 'Request Sitting'}
							</Text>
						</Button>
					</View>
				</AnimatedComponent>
			)}
		</>
	);
};

export default RequestSittingButton;
