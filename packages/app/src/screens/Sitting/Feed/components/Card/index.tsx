import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CalendarIcon from '../../../../../assets/svg/calendar.svg';
import ClockIcon from '../../../../../assets/svg/clock.svg';
import CoinIcon from '../../../../../assets/svg/coin.svg';
import DotIcon from '../../../../../assets/svg/dot.svg';
import FemaleIcon from '../../../../../assets/svg/female.svg';
import LocationIcon from '../../../../../assets/svg/location.svg';
import MaleIcon from '../../../../../assets/svg/male.svg';
import Icon from '../../../../../components/Icon';
import config from '../../../../../config';
import { Sitting } from '../../../../../hooks/reactQuery/sitting/feed/types';
import utils from '../../../../../utils';

type Props = {
	sitting: Sitting;
};

const Card: React.FC<Props> = ({ sitting }): React.JSX.Element => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			className="mb-8"
			activeOpacity={0.8}
			// TODO (tiago): Remove this ts-ignore
			//@ts-ignore
			onPress={(): void => navigation.navigate('SittingDetails', { id: sitting.id })}
		>
			<View className="flex-row items-center justify-between p-5">
				<Text className="mt-1 text-xl text-secondary-500 font-laila-semi-bold">
					{sitting.animal.name}
				</Text>

				<View className="items-center justify-center w-10 h-10 rounded-full bg-secondary-300">
					<Icon icon={sitting.animal.gender === 'Male' ? MaleIcon : FemaleIcon} />
				</View>
			</View>

			<FastImage
				source={{
					uri: sitting.animal.picture || config.fallbacks.sitting.feed.animal.picture,
				}}
				className="w-full h-72"
				resizeMode="cover"
			/>

			<View className="p-5">
				<View className="flex flex-row justify-between mb-3">
					<View className="flex flex-row items-center space-x-2">
						<Icon icon={LocationIcon} />

						<Text className="text-base text-secondary-500 font-zen-kaku-gothic-new-bold">
							{sitting.city}
						</Text>
					</View>
					<View className="flex flex-row items-center space-x-2">
						<Icon icon={CoinIcon} />
						<Text className="text-base text-secondary-500 font-zen-kaku-gothic-new-bold">
							{sitting.coins}
						</Text>
					</View>
				</View>

				<View className="flex flex-row justify-between">
					<View className="flex flex-row items-center space-x-2">
						<Icon icon={CalendarIcon} className="mt-0.5" />

						<Text className="text-base text-secondary-500 font-zen-kaku-gothic-new-regular">
							{utils.formatData.convertDateToLocaleString(sitting.start_date)}
						</Text>
						<View className="pt-1">
							<Icon icon={DotIcon} />
						</View>
						<Text className="text-base text-secondary-500 font-zen-kaku-gothic-new-regular">
							{utils.formatData.convertDateToLocaleString(sitting.end_date)}
						</Text>
					</View>

					<View className="flex flex-row items-center space-x-2">
						<Icon icon={ClockIcon} className="mt-0.5" />
						<Text className="text-base text-secondary-500 font-zen-kaku-gothic-new-bold">
							{utils.formatData.getDifferenceInDays(sitting.start_date, sitting.end_date)} days
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Card;
