import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ListDotIcon from '../../assets/svg/dark_paw.svg';
import EmailIcon from '../../assets/svg/email.svg';
import PhoneIcon from '../../assets/svg/phone.svg';
import { useUserContext } from '../../context/user';
import Button from '../Button';
import Icon from '../Icon';

type Props = {
	owner: {
		id: number;
		display_name: string;
		picture: string;
	};
	description?: string;
	notes: string[];
	contact: {
		email: string;
		phone: string;
	};
};

const DetailsBodyData: React.FC<Props> = ({
	owner,
	notes,
	description,
	contact,
}): React.JSX.Element => {
	const navigation = useNavigation();
	const { loggedUser } = useUserContext();

	return (
		<>
			<Button
				className="flex-row items-center self-start p-0 mt-6 space-x-3"
				// @ts-ignore
				onPress={(): void => navigation.navigate('Profile', { id: owner.id })}
			>
				<FastImage
					source={{
						uri: owner.picture,
					}}
					className="w-8 h-8 border rounded-full border-secondary-500"
					resizeMode="cover"
				/>

				<Text className="mb-0.5 text-base text-secondary-500 font-zen-kaku-gothic-new-bold">
					{owner.display_name}
					{loggedUser?.id === owner.id && ' (You)'}
				</Text>
			</Button>

			<View>
				<Text className="mt-12 mb-3 text-xl text-secondary-500 font-laila-semi-bold">
					About
				</Text>
				<Text className="text-base text-secondary-500 font-zen-kaku-gothic-new-medium">
					{description || "The owner didn't add any description"}
				</Text>

				<Text className="mt-12 mb-3 text-xl text-secondary-500 font-laila-semi-bold">
					Important Notes
				</Text>
				{notes.map((note: string, index: number) => (
					<View key={index} className="flex-row">
						<Icon icon={ListDotIcon} className="mt-1.5 mr-2" />

						<Text className="flex-1 text-base text-secondary-500 font-zen-kaku-gothic-new-medium">
							{note}
						</Text>
					</View>
				))}
				{notes.length === 0 && (
					<Text className="text-base text-secondary-500 font-zen-kaku-gothic-new-medium">
						The owner didn't add any notes to this item.
					</Text>
				)}

				<Text className="mt-12 mb-3 text-xl text-secondary-500 font-laila-semi-bold">
					Contacts
				</Text>

				<View className="flex-row space-x-2.5 mb-2 max-h-7">
					<Icon icon={PhoneIcon} className="scale-105 ml-0.5 mt-1.5" />

					<Text className="flex-1 text-base text-secondary-500 font-zen-kaku-gothic-new-medium">
						{contact.phone}
					</Text>
				</View>

				<View className="flex-row mb-6 space-x-2 max-h-7">
					<Icon icon={EmailIcon} className="mt-1 -ml-0.5" />

					<Text className="flex-1 text-base text-secondary-500 font-zen-kaku-gothic-new-medium">
						{contact.email}
					</Text>
				</View>
			</View>
		</>
	);
};

export default DetailsBodyData;
