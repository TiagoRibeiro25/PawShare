import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { APIResponse } from '../../../../api/types';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import useForgotPassword from '../../../../hooks/reactQuery/auth/forgotPassword';
import utils from '../../../../utils';
import styles from './styles';

type Props = {
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
};

const ForgotPasswordModal: React.FC<Props> = ({
	isVisible,
	setIsVisible,
}): React.JSX.Element => {
	const [email, setEmail] = useState<string>('');
	const [statusMessage, setStatusMessage] = useState<string>('');

	const { status, mutateAsync, error } = useForgotPassword({ email });

	const handleSend = async (): Promise<void> => {
		try {
			setStatusMessage('');

			if (!utils.validateData.isValid(email, 'email')) {
				setStatusMessage('Invalid email');
				return;
			}

			await mutateAsync(
				{},
				{
					onSuccess: (resData: APIResponse): void => {
						setStatusMessage(resData.message);

						if (resData.success) {
							setEmail('');
						}
					},
				},
			);
		} catch (_err: unknown) {
			// ...
		}
	};

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={isVisible}
			onRequestClose={(): void => setIsVisible(false)}
		>
			<View className="items-center justify-center flex-1 px-4" style={styles.container}>
				<View className="items-center max-w-md p-5 rounded-lg bg-accent-100">
					<Text className="text-xl font font-laila-semi-bold text-secondary-500">
						Forgot Password
					</Text>

					<Text className="mt-3 mb-6 text-base text-center font-zen-kaku-gothic-new-medium text-secondary-500">
						Enter your email address and we will send you a link to reset your password.
					</Text>

					<Input value={email} onChange={setEmail} placeholder="Email" />

					<Text className="mt-5 text-base text-center font-zen-kaku-gothic-new-medium text-secondary-500">
						{statusMessage !== ''
							? statusMessage
							: status === 'error' && utils.error.getMessage(error)}
					</Text>

					<View className="flex-row justify-between w-full">
						<Button
							className="self-center p-3 mt-6 space-x-3 bg-success-100 w-36"
							disabled={email.trim() === '' || status === 'pending'}
							onPress={handleSend}
						>
							<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
								{status === 'pending' ? 'Sending...' : 'Send'}
							</Text>
						</Button>
						<Button
							className="self-center p-3 mt-6 space-x-3 bg-error-100 w-36"
							onPress={(): void => setIsVisible(false)}
						>
							<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
								Cancel
							</Text>
						</Button>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default ForgotPasswordModal;
