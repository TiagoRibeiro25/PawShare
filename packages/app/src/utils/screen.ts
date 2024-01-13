import { Dimensions } from 'react-native';

const getSize = (): number[] => {
	const dim = Dimensions.get('screen');
	return [dim.width, dim.height];
};

const isHorizontal = (): boolean => {
	const dim = Dimensions.get('screen');
	return dim.width >= dim.height;
};

export default { getSize, isHorizontal };
