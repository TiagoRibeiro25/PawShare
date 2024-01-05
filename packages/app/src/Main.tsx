import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import requests from './api/requests';
import { GetLoggedUserData } from './api/requests/user/getLoggedUser/types';
import { useUserContext } from './context/user';
import Navigation from './navigation';

const MainApplication: React.FC = (): React.JSX.Element => {
	const { setLoggedUser } = useUserContext();

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// If the user is logged in, get the user data
	useEffect(() => {
		setLoading(true);
		setError(null);

		(async (): Promise<void> => {
			try {
				const res: GetLoggedUserData = await requests.user.getLoggedUser();

				if (res.success && res.data) {
					setLoggedUser({
						id: res.data.id,
						coins: res.data.coins,
					});
				}
			} catch (err: any) {
				if (err.response?.status !== 401) {
					setError('Looks like something went wrong. Please try again later.');
				}
			} finally {
				setLoading(false);
			}
		})();
	}, [setLoggedUser]);

	return (
		<View className="w-full h-full">
			{loading && <Text>Loading...</Text>}
			{error && <Text>{error}</Text>}

			{!loading && !error && <Navigation />}
		</View>
	);
};

export default MainApplication;
