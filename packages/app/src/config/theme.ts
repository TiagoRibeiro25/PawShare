import { DefaultTheme, Theme } from '@react-navigation/native';

const theme: Theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#ffffff',
		background: '#ffffff',
		text: '#000000',
		notification: '#ffffff',
	},
};

export default theme;
