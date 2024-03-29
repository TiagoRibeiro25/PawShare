const options = {
	theme: {
		dark: false,
		colors: {
			primary: '#F8F5FF',
			background: '#F8F5FF',
			card: '#F8F5FF',
			text: '#000000',
			border: '#F8F5FF',
			notification: '#F8F5FF',
		},
	},
	screenOptions: {
		headerShown: false,
		tabBarActiveBackgroundColor: '#414587',
		tabBarActiveTintColor: '#fff',
		tabBarHideOnKeyboard: true,
	},
	tabItemStyle: (currentScreen: string, screenName: string) => {
		return {
			borderBottomWidth: currentScreen === screenName ? 3 : 0,
			borderColor: '#fff',
			paddingBottom: 7,
			paddingTop: 7,
		};
	},
};

export default options;
