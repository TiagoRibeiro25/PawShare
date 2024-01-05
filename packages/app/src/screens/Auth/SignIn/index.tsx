import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import GestorRecognizer from 'react-native-swipe-gestures';
import EmailIcon from '../../../assets/svg/email.svg';
import PasswordIcon from '../../../assets/svg/password.svg';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { useUserContext } from '../../../context/user';
import useLogin from '../../../hooks/reactQuery/auth/login';
import { LoginData } from '../../../hooks/reactQuery/auth/login/types';
import utils from '../../../utils';
import NavigateBackButton from '../components/NavigateBackButton';

// TODO(tiago): Show loading indicator when the user clicks on the sign in button
// TODO(tiago): Show error message if an error occurs while trying to sign in
// TODO(tiago): Make some validations on the inputs (client side)

const SignIn: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const { setLoggedUser } = useUserContext();

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const { status, mutateAsync } = useLogin({
		email: email.trim(),
		password,
		remember_me: false,
	});

	const handleSignIn = async (): Promise<void> => {
		await mutateAsync(
			{},
			{
				onSuccess: async (resData: LoginData): Promise<void> => {
					if (resData.success && resData.data) {
						// Update the global state
						setLoggedUser(resData.data.user);

						// Save the tokens on the device storage
						utils.storage.set('authToken', resData.data.authToken);
						utils.storage.set('refreshToken', resData.data.refreshToken);
					}
				},
			},
		);
	};

	return (
		<GestorRecognizer
			className="flex-1 px-6 py-8 bg-primary-50"
			onSwipeDown={(): void => navigation.navigate('OnBoarding' as never)}
		>
			<View className="items-center">
				<NavigateBackButton />

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
				</View>

				{/* Sign In Button */}
				<Button
					className="self-center p-3 mt-4 space-x-3 bg-accent-500 w-60"
					disabled={email.trim() === '' || password.trim() === '' || status === 'pending'}
					onPress={handleSignIn}
				>
					<Text className="text-lg font-medium text-secondary-500 font-zen-kaku-gothic-new-bold">
						{status === 'pending' ? 'Loading...' : 'Sign In'}
					</Text>
				</Button>
			</View>
		</GestorRecognizer>
	);
};

export default SignIn;
