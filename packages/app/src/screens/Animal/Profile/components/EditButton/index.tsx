import React from 'react';
import EditIcon from '../../../../../assets/svg/edit.svg';
import Button from '../../../../../components/Button';
import Icon from '../../../../../components/Icon';

type Props = {
	onPress: () => void;
};

const EditButton: React.FC<Props> = ({ onPress }): React.JSX.Element => {
	return (
		<Button className="absolute p-3 right-3 bottom-4 bg-accent-500 " onPress={onPress}>
			<Icon icon={EditIcon} />
		</Button>
	);
};

export default EditButton;
