import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import PawIcon from '../../../../../../../assets/svg/paw.svg';
import Button from '../../../../../../../components/Button';
import Icon from '../../../../../../../components/Icon';
import Input from '../../../../../../../components/Input';
import utils from '../../../../../../../utils';
import styles from './styles';

const GenerateQrCodeButton: React.FC = (): React.JSX.Element => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [contactNumber, setContactNumber] = useState<string>('');
	const [vCardContent, setVCardContent] = useState<string | null>(null);

	return (
		<>
			<Button className="bg-accent-500" onPress={(): void => setShowModal(true)}>
				<Text className="py-1 text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
					Generate QR Code
				</Text>
			</Button>

			<Modal
				animationType="fade"
				transparent={true}
				visible={showModal}
				onRequestClose={(): void => setShowModal(false)}
			>
				<View className="items-center justify-center flex-1 px-4" style={styles.container}>
					<View className="items-center max-w-md p-5 rounded-lg bg-accent-50">
						<Icon icon={PawIcon} className="my-4 scale-150" />

						<Text className="mt-3 mb-6 text-base text-center font-zen-kaku-gothic-new-medium text-secondary-500">
							Insert the phone number to associate with the QR code
						</Text>

						{vCardContent && (
							<View className="mt-2 mb-10 scale-125">
								<QRCode value={vCardContent} />
							</View>
						)}

						<Input
							value={contactNumber}
							placeholder="Contact (ex: +639123456789)"
							onChange={(val: string): void => setContactNumber(val)}
							keyboardType="phone-pad"
						/>

						<View className="flex-row justify-between w-full">
							<Button
								className="self-center p-3 mt-6 space-x-3 bg-success-100 w-36"
								disabled={!utils.validateData.isValid(contactNumber, 'phone')}
								onPress={(): void => {
									setVCardContent(`BEGIN:VCARD\nVERSION:3.0\nTEL:${contactNumber}\nEND:VCARD`);
								}}
							>
								<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
									Generate
								</Text>
							</Button>
							<Button
								className="self-center p-3 mt-6 space-x-3 bg-error-100 w-36"
								onPress={(): void => setShowModal(false)}
							>
								<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
									Cancel
								</Text>
							</Button>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
};

export default GenerateQrCodeButton;
