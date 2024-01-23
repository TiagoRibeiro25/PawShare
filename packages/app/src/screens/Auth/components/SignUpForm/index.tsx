import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { APIResponse } from '../../../../api/types';
import EmailIcon from '../../../../assets/svg/email.svg';
import PasswordIcon from '../../../../assets/svg/password.svg';
import UsernameIcon from '../../../../assets/svg/profile.svg';
import Button from '../../../../components/Button';
import DropDownSelectList from '../../../../components/DropDownSelectList';
import Input from '../../../../components/Input';
import countries from '../../../../data/countries.json';
import useRegister from '../../../../hooks/reactQuery/auth/register';
import utils from '../../../../utils';
import styles from './styles';

type UserType = 'user' | 'organization';

const SignUpForm: React.FC = (): React.JSX.Element => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [statusMessage, setStatusMessage] = useState<string>('');
	const [country, setCountry] = useState<string>('');
	const [userType, setUserType] = useState<UserType>('user');

	const { status, mutateAsync, error } = useRegister({
		display_name: username,
		email: email.trim(),
		password,
		type: userType,
		country,
	});

	const handleSignUp = async (): Promise<void> => {
		setStatusMessage('');

		// Validate the Form Data
		if (!utils.validateData.isValid(email, 'email')) {
			setStatusMessage('Invalid email');
			return;
		}

		if (!utils.validateData.isValid(password, 'password')) {
			setStatusMessage('Invalid password');
			return;
		}

		await mutateAsync(
			{},
			{
				onSuccess: (resData: APIResponse): void => {
					setStatusMessage(resData.message);
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

				<View className="max-w-md mx-20 my-20 sm:mx-12 x">
					{/* Username Input */}
					<Input
						placeholder="User Name"
						value={username}
						onChange={(text: string): void => setUsername(text)}
						icon={UsernameIcon}
						iconClassName="mt-1 scale-110 ml-6"
					/>

					{/* Email Input */}
					<Input
						placeholder="Email"
						value={email}
						onChange={(text: string): void => setEmail(text)}
						icon={EmailIcon}
						className="mt-12"
						iconClassName="mt-1 scale-110 ml-6"
					/>

					{/* Password Input */}
					<Input
						placeholder="Password"
						value={password}
						onChange={(text: string): void => setPassword(text)}
						icon={PasswordIcon}
						className="mt-12"
						iconClassName="mt-1 scale-110 ml-6"
						hideText
					/>

					{/* Country Dropdownlist Input */}
					<DropDownSelectList
						className="mt-12"
						data={countries.map((item) => {
							return { key: item.code, value: item.name };
						})}
						setSelected={(countryName: string) => {
							setCountry(
								countries.find((item) => {
									return item.name.toLowerCase() === countryName.toLowerCase();
								})?.code as string,
							);
						}}
						searchPlaceholder="Country"
						defaultOption={{ key: countries[0].code, value: countries[0].name }}
					/>

					{/* User Type Input */}
					<View className="mt-12 space-x-2 border rounded-xl border-secondary-500">
						<SelectList
							setSelected={(val: string) => setUserType(val as UserType)}
							data={['user', 'organization']}
							save="value"
							boxStyles={styles.selectListStyle}
							dropdownStyles={styles.selectListStyle}
						/>
					</View>

					{/* Sign Up Button */}
					<Button
						className="self-center p-3 mt-12 space-x-3 bg-accent-500 w-60"
						disabled={status === 'pending'}
						onPress={handleSignUp}
					>
						<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
							Sign Up
						</Text>
					</Button>
					<Text className="mt-12 text-base font-zen-kaku-gothic-new-medium text-error-500">
						{statusMessage !== ''
							? statusMessage
							: status === 'error' && utils.error.getMessage(error)}
					</Text>
				</View>
			</View>
		</ScrollView>
	);
};

export default SignUpForm;
