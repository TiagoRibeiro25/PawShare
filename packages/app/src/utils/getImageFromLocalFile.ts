import { Source } from 'react-native-fast-image';

/**
 * Retrieves the image source for a given banner ID.
 * @param bannerId - The ID of the banner.
 * @returns The image source for the corresponding banner ID.
 */
const banner = (bannerId: number): Source => {
	switch (bannerId) {
		case 1:
			return require('../assets/images/banners/banner_1.png');
		case 2:
			return require('../assets/images/banners/banner_2.png');
		case 3:
			return require('../assets/images/banners/banner_3.png');
		case 4:
			return require('../assets/images/banners/banner_4.png');
		case 5:
			return require('../assets/images/banners/banner_5.png');
		default:
			return require('../assets/images/banners/banner_1.png');
	}
};

export default { banner };
