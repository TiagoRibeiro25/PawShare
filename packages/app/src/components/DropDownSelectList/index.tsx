import React from 'react';
import { Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import ArrowDown from '../../assets/svg/dropdown_arrow.svg';
import utils from '../../utils';
import Icon from '../Icon';
import styles from './styles';
import { Props } from './types';

const [_, SCREEN_HEIGHT] = utils.screen.getSize();

const DropDownSelectList: React.FC<Props> = ({
	data,
	setSelected,
	label,
	defaultOption,
	searchPlaceholder,
	className,
}): React.JSX.Element => {
	return (
		<View className={className}>
			{label && (
				<Text className="mb-1 text-base text-secondary-500 font-zen-kaku-gothic-new-bold">
					{label}
				</Text>
			)}

			<SelectList
				setSelected={setSelected}
				data={data}
				save="value"
				searchPlaceholder={searchPlaceholder}
				defaultOption={defaultOption}
				boxStyles={styles.boxStyles}
				inputStyles={styles.inputStyles}
				dropdownStyles={styles.dropdownStyles}
				dropdownTextStyles={styles.dropdownTextStyles}
				arrowicon={<Icon icon={ArrowDown} className="self-center mt-1" />}
				closeicon={<Icon icon={ArrowDown} className="self-center mt-1 rotate-180" />}
				maxHeight={SCREEN_HEIGHT * 0.4}
				searchicon={<Icon icon={ArrowDown} className="hidden" />}
				fontFamily="ZenKakuGothicNew-Medium"
			/>
		</View>
	);
};

export default DropDownSelectList;
