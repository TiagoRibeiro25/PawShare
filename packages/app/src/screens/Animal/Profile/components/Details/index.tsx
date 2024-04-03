import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Button from '../../../../../components/Button';
import DetailsAnimalIcons from '../../../../../components/DetailsAnimalIcons';
import config from '../../../../../config';
import { useUserContext } from '../../../../../context/user';
import { Animal } from '../../../../../hooks/reactQuery/animals/details/types';
import GenerateQrCodeButton from './components/GenerateQrCodeButton';
import PlaceForAdoptionButton from './components/PlaceForAdoptionButton';
import RequestSittingButton from './components/RequestSittingButton';

type Props = {
	animal: Animal;
};

const AnimalDetails: React.FC<Props> = ({ animal }): React.JSX.Element => {
	const navigation = useNavigation();
	const { loggedUser } = useUserContext();

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<FastImage
				className="w-full h-72"
				source={{ uri: animal.picture || config.fallbacks.profile.animal.picture }}
				resizeMode="cover"
			/>

			<View className="p-5 mb-9">
				<DetailsAnimalIcons
					color={animal.color}
					gender={animal.gender}
					size={animal.size}
					type={animal.type}
				/>

				{/* Owner picture and username button */}
				<Button
					className="justify-start p-0 mt-6 space-x-3"
					// @ts-ignore
					onPress={(): void => navigation.navigate('Profile', { id: animal.user.id })}
				>
					<FastImage
						source={{ uri: animal.user.picture }}
						className="w-8 h-8 border rounded-full border-secondary-500"
						resizeMode="cover"
					/>

					<Text className="mb-0.5 text-base text-secondary-500 font-zen-kaku-gothic-new-bold">
						{animal.user.display_name}
						{loggedUser?.id === animal.user.id && ' (You)'}
					</Text>
				</Button>

				<View className="mt-12">
					<Text className="mb-3 text-xl text-secondary-500 font-laila-semi-bold">About</Text>
					<Text className="text-base text-secondary-500 font-zen-kaku-gothic-new-medium">
						{animal.description || "The owner didn't add any description"}
					</Text>
				</View>

				<View>{/* TODO(tiago): Reviews */}</View>

				{loggedUser?.id === animal.user.id && (
					<>
						<GenerateQrCodeButton className="mt-12" />
						<PlaceForAdoptionButton className="mt-8" animalId={animal.id} />
						<RequestSittingButton className="mt-7" animalId={animal.id} />
					</>
				)}
			</View>
		</ScrollView>
	);
};

export default AnimalDetails;
