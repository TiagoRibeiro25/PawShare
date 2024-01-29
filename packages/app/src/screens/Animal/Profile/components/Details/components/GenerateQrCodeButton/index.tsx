import React, { useRef, useState } from 'react';
import { Modal, Platform, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import ViewShot, { captureRef } from 'react-native-view-shot';
import PawIcon from '../../../../../../../assets/svg/paw.svg';
import Button from '../../../../../../../components/Button';
import Icon from '../../../../../../../components/Icon';
import Input from '../../../../../../../components/Input';
import utils from '../../../../../../../utils';
import styles from './styles';

type Props = {
	className?: string;
};

const GenerateQrCodeButton: React.FC<Props> = ({ className }): React.JSX.Element => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [contactNumber, setContactNumber] = useState<string>('');
	const [vCardContent, setVCardContent] = useState<string | null>(null);
	const qrCodeRef = useRef<any>(null);

	const captureQRCode = async (): Promise<void> => {
		try {
			if (qrCodeRef.current) {
				const uri: string = await captureRef(qrCodeRef, { format: 'jpg', quality: 0.8 });

				// Use react-native-share to share the image
				const shareOptions = {
					title: 'Share QR Code',
					message: 'Save the QR Code to your gallery:',
					url: Platform.OS === 'android' ? 'file://' + uri : uri,
					type: 'image/jpeg',
				};

				await Share.open(shareOptions);
			}
		} catch (_err: unknown) {
			// ...
		}
	};

	return (
		<>
			<Button
				className={`bg-accent-500 ${className}`}
				onPress={(): void => setShowModal(true)}
			>
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

						{vCardContent ? (
							<View className="items-center">
								<ViewShot ref={qrCodeRef} options={{ format: 'jpg', quality: 0.8 }}>
									<QRCode value={vCardContent} />
								</ViewShot>

								<View className="flex-row justify-between w-full mt-6">
									<Button
										className="self-center p-3 bg-success-100 w-36"
										onPress={captureQRCode}
									>
										<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
											Download
										</Text>
									</Button>
									<Button
										className="self-center p-3 space-x-3 bg-error-100 w-36"
										onPress={(): void => setVCardContent(null)}
									>
										<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
											Cancel
										</Text>
									</Button>
								</View>
							</View>
						) : (
							<>
								<Input
									value={contactNumber}
									placeholder="Contact (ex: +639123456789)"
									onChange={setContactNumber}
									keyboardType="phone-pad"
								/>

								<View className="flex-row justify-between w-full mt-6">
									<Button
										className="self-center p-3 space-x-3 bg-success-100 w-36"
										disabled={!utils.validateData.isValid(contactNumber, 'phone')}
										onPress={(): void => {
											setVCardContent(
												`BEGIN:VCARD\nVERSION:3.0\nTEL:${contactNumber}\nEND:VCARD`,
											);
										}}
									>
										<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
											Generate
										</Text>
									</Button>
									<Button
										className="self-center p-3 space-x-3 bg-error-100 w-36"
										onPress={(): void => setShowModal(false)}
									>
										<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
											Cancel
										</Text>
									</Button>
								</View>
							</>
						)}
					</View>
				</View>
			</Modal>
		</>
	);
};

export default GenerateQrCodeButton;
