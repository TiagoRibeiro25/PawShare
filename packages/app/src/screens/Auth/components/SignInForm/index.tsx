import React, { useState } from 'react';
import { Text, View } from 'react-native';
import EmailIcon from '../../../../assets/svg/email.svg';
import PasswordIcon from '../../../../assets/svg/password.svg';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import SelectBoxInput from '../../../../components/SelectBoxInput';
import { useUserContext } from '../../../../context/user';
import useLogin from '../../../../hooks/reactQuery/auth/login';
import { LoginData } from '../../../../hooks/reactQuery/auth/login/types';
import utils from '../../../../utils';

const SignInForm: React.FC = (): React.JSX.Element => {
	const { setLoggedUser } = useUserContext();

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [rememberMe, setRememberMe] = useState<boolean>(false);
	const [validationError, setValidationError] = useState<string>('');

	const { status, mutateAsync, error } = useLogin({
		email: email.trim(),
		password,
		remember_me: rememberMe,
	});

	const handleSignIn = async (): Promise<void> => {
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

		// Send the request
		await mutateAsync(
			{},
			{
				onSuccess: (resData: LoginData): void => {
					if (resData.success && resData.data) {
						// Update the global state
						setLoggedUser(resData.data.user);

						// Save the tokens on the device storage
						utils.storage.set('authToken', resData.data.authToken);
						utils.storage.set('refreshToken', resData.data.refreshToken);
					} else {
						setValidationError(resData.message);
						setPassword('');
					}
				},
			},
		);
	};

	return (
		<View className="items-center flex-1">
			<Text className="mt-6 text-2xl uppercase text-secondary-500 font-laila-bold">
				Sign In
			</Text>

			<View className="my-20">
				{/* Email Input */}
				<Input
					placeholder="Email"
					value={email}
					onChange={(text: string): void => setEmail(text)}
					icon={EmailIcon}
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

				{/* Select Box */}
				<SelectBoxInput
					value={rememberMe}
					onPress={(newValue: boolean): void => setRememberMe(newValue)}
					text="Remember me"
					className="mt-6"
				/>
			</View>

			{/* Sign In Button */}
			<Button
				className="self-center p-3 mt-6 space-x-3 bg-accent-500 w-60"
				disabled={email.trim() === '' || password.trim() === '' || status === 'pending'}
				onPress={handleSignIn}
			>
				<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
					{status === 'pending' ? 'Loading...' : 'Sign In'}
				</Text>
			</Button>

			<Text className="mt-12 text-base font-zen-kaku-gothic-new-medium text-error-500">
				{validationError !== ''
					? validationError
					: status === 'error' && utils.error.getMessage(error)}
			</Text>
		</View>
	);
};

export default SignInForm;
