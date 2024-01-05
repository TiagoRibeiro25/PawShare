import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import MainApplication from './Main';
import { UserProvider } from './context/user';

const queryClient = new QueryClient();

const App: React.FC = (): React.JSX.Element => {
	return (
		<NavigationContainer>
			<QueryClientProvider client={queryClient}>
				<UserProvider>
					<MainApplication />
				</UserProvider>
			</QueryClientProvider>
		</NavigationContainer>
	);
};

export default App;
