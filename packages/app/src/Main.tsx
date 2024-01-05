import React, { useEffect } from 'react';
import { View } from 'react-native';
import Error from './components/Error';
import Loading from './components/Loading';
import { useUserContext } from './context/user';
import useGetLoggedUser from './hooks/reactQuery/user/getLoggedUser';
import Navigation from './navigation';

const MainApplication: React.FC = (): React.JSX.Element => {
	const { setLoggedUser } = useUserContext();
	const { data, isLoading, isError, error } = useGetLoggedUser();

	useEffect(() => {
		if (data?.success && data?.data) {
			return setLoggedUser({
				id: data.data.id,
				coins: data.data.coins,
			});
		}
	}, [data, error, isError, setLoggedUser]);

	return (
		<View className="w-full h-full bg-primary-50">
			{isLoading && <Loading />}
			{isError && error.message.split(' ').at(-1) !== '401' && <Error />}
			{!isLoading && !(isError && error.message.split(' ').at(-1) !== '401') && <Navigation />}
		</View>
	);
};

export default MainApplication;
