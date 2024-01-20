import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Asset, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import AddIcon from '../../assets/svg/add.svg';
import Button from '../Button';
import Icon from '../Icon';
import options from './options';

type Props = {
	value?: Asset;
	onChange: (image: Asset) => void;
	defaultImage?: string;
};

const ImagePicker: React.FC<Props> = ({
	value,
	onChange,
	defaultImage,
}): React.JSX.Element => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const openImagePicker = async (): Promise<void> => {
		setIsLoading(true);

		try {
			const response: ImagePickerResponse = await launchImageLibrary(options);

			if (!response.didCancel && !response.errorCode && response.assets?.[0]) {
				onChange(response.assets[0]);
			}
		} catch (_err: unknown) {
			// ...
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			className="w-full p-0 rounded-none h-72 bg-secondary-500"
			onPress={openImagePicker}
		>
			{isLoading ? (
				<ActivityIndicator size="large" color="#F8B436" />
			) : value || defaultImage ? (
				<FastImage
					className="w-full h-full"
					source={{ uri: value?.uri || defaultImage }}
					resizeMode="cover"
				/>
			) : (
				<Icon icon={AddIcon} />
			)}
		</Button>
	);
};

export default ImagePicker;
