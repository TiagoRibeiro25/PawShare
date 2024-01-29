import React from 'react';
import EditIcon from '../../assets/svg/edit.svg';
import AnimatedComponent from '../AnimatedComponent';
import Button from '../Button';
import Icon from '../Icon';

type Props = {
	onPress: () => void;
};

const EditButton: React.FC<Props> = ({ onPress }): React.JSX.Element => {
	return (
		<AnimatedComponent animation="SlideInFromBottom">
			<Button className="absolute p-3 right-3 bottom-4 bg-accent-500 " onPress={onPress}>
				<Icon icon={EditIcon} />
			</Button>
		</AnimatedComponent>
	);
};

export default EditButton;
