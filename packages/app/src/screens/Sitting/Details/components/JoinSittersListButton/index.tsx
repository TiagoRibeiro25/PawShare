import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import Button from '../../../../../components/Button';
import useJoinSittersList from '../../../../../hooks/reactQuery/sitting/joinSittersList';
import { JoinSittersListData } from '../../../../../hooks/reactQuery/sitting/joinSittersList/types';
import utils from '../../../../../utils';
import { Props } from './types';

const JoinSittersListButton: React.FC<Props> = ({
	sittingId,
	isCandidate,
	isOwner,
}): React.JSX.Element => {
	const [hideButton, setHideButton] = useState<boolean>(isCandidate);
	const [justJoined, setJustJoined] = useState<boolean>(false);

	const { status, mutateAsync, error } = useJoinSittersList({
		sittingId,
	});

	const handlePress = async (): Promise<void> => {
		try {
			await mutateAsync(
				{},
				{
					onSuccess: (resData: JoinSittersListData): void => {
						if (resData.success) {
							setHideButton(true);
							setJustJoined(true);
						}
					},
				},
			);
		} catch (err: unknown) {
			// ...
		}
	};

	useEffect(() => {
		setHideButton(isCandidate);
	}, [isCandidate]);

	if (isOwner) {
		return <></>;
	}

	return (
		<>
			{hideButton ? (
				<Text className="self-center mt-2 text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
					{justJoined ? 'You are now a candidate! 🎉' : 'You are already a candidate 😊'}
				</Text>
			) : (
				<>
					<Button
						className="self-center p-3 mt-6 space-x-3 bg-accent-500 w-60"
						disabled={status === 'pending'}
						onPress={handlePress}
					>
						<Text className="text-lg text-secondary-500 font-zen-kaku-gothic-new-bold">
							{status === 'pending' ? 'Loading...' : 'Join the Sitters List'}
						</Text>
					</Button>

					{status === 'error' && (
						<Text className="self-center mt-6 text-base font-zen-kaku-gothic-new-medium text-error-500">
							{utils.error.getMessage(error)}
						</Text>
					)}
				</>
			)}
		</>
	);
};

export default JoinSittersListButton;
