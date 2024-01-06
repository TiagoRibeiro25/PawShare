import { NavigationProp } from '@react-navigation/native';

const getCurrentScreen = (navigation: NavigationProp<any>): string => {
	return navigation.getState().routes[navigation.getState().index].name;
};

export default { getCurrentScreen };
