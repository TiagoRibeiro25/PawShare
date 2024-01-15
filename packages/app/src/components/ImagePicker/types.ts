import { Asset } from 'react-native-image-picker';

export type Props = {
	value?: Asset;
	onChange: (image: Asset) => void;
};
