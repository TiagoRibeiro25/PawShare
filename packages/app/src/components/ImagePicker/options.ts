import { ImageLibraryOptions } from 'react-native-image-picker';

const options: ImageLibraryOptions = {
	mediaType: 'photo',
	includeBase64: true,
	maxHeight: 2000,
	maxWidth: 2000,
	selectionLimit: 1,
};

export default options;
