import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Error from './components/Error';
import Loading from './components/Loading';
import TopBar from './components/TopBar';
import { useUserContext } from './context/user';
import useGetLoggedUser from './hooks/reactQuery/user/getLoggedUser';
import Navigation from './navigation';

const MainApplication: React.FC = (): React.JSX.Element => {
	const { loggedUser, setLoggedUser } = useUserContext();
	const { data, isLoading, isError, error } = useGetLoggedUser();
	const [animationComplete, setAnimationComplete] = useState(false);
	const [anErrorOccurred, setAnErrorOccurred] = useState<boolean>(false);

	useEffect(() => {
		if (data?.success && data?.data && animationComplete) {
			setLoggedUser({
				id: data.data.id,
				coins: data.data.coins,
				country: data.data.country,
			});
		}

		if (animationComplete && (isError || !data?.success)) {
			if (error?.message.split(' ').at(-1) === '401') {
				return;
			}

			setAnErrorOccurred(true);
		}
	}, [animationComplete, data, error, isError, setLoggedUser]);

	return (
		<View className="w-full h-full">
			{(isLoading || !animationComplete) && (
				<Loading onAnimationFinish={(): void => setAnimationComplete(true)} />
			)}

			{!isLoading && animationComplete && anErrorOccurred && <Error />}

			{!isLoading && animationComplete && !anErrorOccurred && (
				<>
					{loggedUser && animationComplete && <TopBar />}
					<Navigation />
				</>
			)}
		</View>
	);
};

export default MainApplication;
