import React, { useState } from 'react';
import { APIResponse } from '../../../../api/types';
import { ScrollView, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import styles from './styles';
import Input from '../../../../components/Input';
import EmailIcon from '../../../../assets/svg/email.svg';
import PasswordIcon from '../../../../assets/svg/password.svg';
import UsernameIcon from '../../../../assets/svg/profile.svg';
import Countries from '../../../../data/countries.json';
import Button from '../../../../components/Button';
import utils from '../../../../utils';
import useRegister from '../../../../hooks/reactQuery/auth/register';

const SignUpForm: React.FC = (): React.JSX.Element => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [validationError, setValidationError] = useState<string>('');
	const [country, setCountry] = React.useState('');
	const [userType, setuserType] = React.useState('');

	const countries = Countries.map((countryMap) => {
		return countryMap.code;
	});
	const userTypes = ['user', 'organization'];

	const { status, mutateAsync, error } = useRegister({
		display_name: username,
		email: email.trim(),
		password,
		type: userType,
		country,
	});

	const handleSignUp = async (): Promise<void> => {
		setValidationError('');

		// Validate the Form Data
		if (!utils.validateData.isValid(email, 'email')) {
			setValidationError('Invalid email');
			return;
		}

		if (!utils.validateData.isValid(password, 'password')) {
			setValidationError('Invalid password');
			return;
		}

		await mutateAsync(
			{},
			{
				onSuccess: (resData: APIResponse): void => {
					setValidationError(resData.message);
				},
			},
		);
	};

	return (
		<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
			<View className="items-center">
				<Text className="mt-6 text-2xl uppercase text-secondary-500 font-laila-bold">
					Sign Up
				</Text>

				<View className="my-20">
					{/* user name Input */}
					<Input
						placeholder="User Name"
						value={username}
						onChange={(text: string): void => setUsername(text)}
						icon={UsernameIcon}
						iconClassName="mt-1 scale-110"
						textInputClassName="w-44"
					/>
					{/* Email Input */}
					<Input
						placeholder="Email"
						value={email}
						onChange={(text: string): void => setEmail(text)}
						icon={EmailIcon}
						className="mt-12"
						iconClassName="mt-1 scale-110"
						textInputClassName="w-44"
					/>
					{/* Password Input */}
					<Input
						placeholder="Password"
						value={password}
						onChange={(text: string): void => setPassword(text)}
						icon={PasswordIcon}
						className="mt-12"
						iconClassName="mt-1 scale-110"
						textInputClassName="w-44"
						hideText
					/>
					<View className="mt-12 space-x-2 border rounded-xl border-secondary-500">
						<SelectList
							setSelected={(val: string) => setCountry(val)}
							data={countries}
							save="value"
							boxStyles={styles.selectListStyle}
							dropdownStyles={styles.selectListStyle}
						/>
					</View>

					<View className="mt-12 space-x-2 border rounded-xl border-secondary-500">
						<SelectList
							setSelected={(val: string) => setuserType(val)}
							data={userTypes}
							save="value"
							boxStyles={styles.selectListStyle}
							dropdownStyles={styles.selectListStyle}
						/>
					</View>

					{/* Sign up Button */}
					<Button
						className="self-center p-3 mt-6 space-x-3 bg-accent-500 w-60"
						onPress={handleSignUp}
					>
						<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
							Sign Up
						</Text>
					</Button>
					<Text className="mt-12 text-base font-zen-kaku-gothic-new-medium text-error-500">
						{validationError !== ''
							? validationError
							: status === 'error' && utils.error.getMessage(error)}
					</Text>
				</View>
			</View>
		</ScrollView>
	);
};

export default SignUpForm;
