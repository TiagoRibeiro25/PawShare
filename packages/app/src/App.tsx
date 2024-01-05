import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MainApplication from './Main';
import { UserProvider } from './context/user';

const App: React.FC = (): React.JSX.Element => {
	return (
		<NavigationContainer>
			<UserProvider>
				<MainApplication />
			</UserProvider>
		</NavigationContainer>
	);
};

export default App;
