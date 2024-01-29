import React from 'react';
import { View } from 'react-native';
import utils from '../../utils';
import AnimatedScreen from '../AnimatedScreen';
import Input from '../Input';

export type Item = {
	id: string;
	value: string;
};

type Props = {
	className?: string;
	inputClassName?: string;
	type: string;
	list: Item[];
	updateList: (list: Item[]) => void;
};

const DynamicInputList: React.FC<Props> = ({
	className,
	inputClassName,
	type,
	list,
	updateList,
}): React.JSX.Element => {
	const handleItemChange = (id: string, newValue: string) => {
		// Update the list with the new value
		const newList = list.map((listItem) => {
			return listItem.id === id ? { id: listItem.id, value: newValue } : listItem;
		});

		// Check if there are any empty items in the list and remove them
		const updatedList = newList.filter((item) => item.value.trim() !== '');

		// If the last item in the list is not empty, add a new empty item
		if (updatedList[updatedList.length - 1]?.value.trim() !== '') {
			updatedList.push({
				id: (parseInt(updatedList[updatedList.length - 1]?.id || '0', 10) + 1).toString(),
				value: '',
			});
		}

		updateList(updatedList);
	};

	return (
		<View className={`space-y-3 text-secondary-500 ${className}`}>
			{list.map((item: Item, idx: number) => (
				<AnimatedScreen key={`${type}-${item.id}`} animation="SlideInFromBottom">
					<Input
						className={inputClassName}
						value={item.value}
						onChange={(newValue: string) => handleItemChange(item.id, newValue)}
						placeholder={`${utils.formatData.capitalize(type)} ${idx + 1}`}
					/>
				</AnimatedScreen>
			))}
		</View>
	);
};

export default DynamicInputList;
