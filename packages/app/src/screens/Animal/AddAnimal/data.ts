import types from '../../../data/animals.json';
import colors from '../../../data/colors.json';
import genders from '../../../data/genders.json';
import sizes from '../../../data/sizes.json';

const typesData = types.map((type: string) => {
	return { key: type, value: type };
});

const gendersData = genders.map((gender: string) => {
	return { key: gender, value: gender };
});

const colorsData = colors.map((color: string) => {
	return { key: color, value: color };
});

const sizesData = sizes.map((size: string) => {
	return { key: size, value: size };
});

// Remove the Any option (fist element)
gendersData.shift();
colorsData.shift();
sizesData.shift();
typesData.shift();

export default {
	genders: gendersData,
	colors: colorsData,
	sizes: sizesData,
	types: typesData,
};
