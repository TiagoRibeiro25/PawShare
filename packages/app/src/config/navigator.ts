const options = {
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
