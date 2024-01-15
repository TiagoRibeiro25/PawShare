import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import AnimatedScreen from '../../../components/AnimatedScreen';
import DetailsHeader from '../../../components/DetailsHeader';
import DetailsLoadingSkeleton from '../../../components/DetailsLoadingSkeleton';
import EditButton from '../../../components/EditButton';
import { useUserContext } from '../../../context/user';
import useGetAnimalProfileData from '../../../hooks/reactQuery/animals/details';
import { Animal } from '../../../hooks/reactQuery/animals/details/types';
import AnimalDetails from './components/Details';
import EditAnimal from './components/Edit';
import { Props } from './types';

const AnimalProfile: React.FC<Props> = ({ route }): React.JSX.Element => {
	const navigation = useNavigation();
	const { loggedUser } = useUserContext();
	const { isLoading, data, isError } = useGetAnimalProfileData({ id: route.params.id });

	const [animal, setAnimal] = useState<Animal>();
	const [isEditModeEnabled, setIsEditModeEnabled] = useState<boolean>(false);

	const navigateBack = useCallback((): void => {
		if (isEditModeEnabled) {
			setIsEditModeEnabled(false);
		} else {
			navigation.navigate('Profile' as never);
		}
	}, [isEditModeEnabled, navigation]);

	// If the user leaves the screen while in edit mode, disable it automatically
	useEffect(() => {
		return navigation.addListener('state', (e) => {
			if (e.data.state.routes[e.data.state.index].name === 'AnimalProfile') {
				setIsEditModeEnabled(false);
			}
		});
	});

	useEffect(() => {
		if (isError) {
			navigateBack();
			return;
		}

		if (data?.success) {
			setAnimal(data.data.animal);
		}
	}, [isError, navigateBack, data]);

	return (
		<AnimatedScreen animation="SlideInFromRight">
			<DetailsHeader
				isLoading={isLoading}
				name={isEditModeEnabled ? 'Edit Animal Profile' : animal?.name}
				onNavigateBack={navigateBack}
			/>

			{isLoading ? (
				<DetailsLoadingSkeleton />
			) : (
				animal &&
				(isEditModeEnabled ? (
					<EditAnimal animal={animal} />
				) : (
					<>
						<AnimalDetails animal={animal} />

						{loggedUser?.id === animal.user.id && (
							<EditButton onPress={() => setIsEditModeEnabled(!isEditModeEnabled)} />
						)}
					</>
				))
			)}
		</AnimatedScreen>
	);
};

export default AnimalProfile;
