import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

type Props = {
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
};

const ForgotPasswordModal: React.FC<Props> = ({
	isVisible,
	setIsVisible,
}): React.JSX.Element => {
	const [email, setEmail] = useState<string>('');

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isVisible}
			onRequestClose={(): void => setIsVisible(false)}
		>
			<View className="items-center justify-center flex-1 mx-4">
				<View className="items-center max-w-md p-5 rounded-lg bg-accent-100">
					<Text className="text-xl font font-laila-semi-bold text-secondary-500">
						Forgot Password
					</Text>

					<Text className="mt-3 mb-6 text-base text-center font-zen-kaku-gothic-new-medium text-secondary-500">
						Enter your email address and we will send you a link to reset your password.
					</Text>

					<Input value={email} onChange={setEmail} placeholder="Email" />

					<View className="flex-row justify-between w-full">
						<Button className="self-center p-3 mt-6 space-x-3 bg-success-100 w-36">
							<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
								Send
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
