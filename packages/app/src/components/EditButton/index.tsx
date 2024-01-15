import React from 'react';
import EditIcon from '../../assets/svg/edit.svg';
import AnimatedScreen from '../AnimatedScreen';
import Button from '../Button';
import Icon from '../Icon';
import { Props } from './types';

const EditButton: React.FC<Props> = ({ onPress }): React.JSX.Element => {
	return (
		<AnimatedScreen animation="SlideInFromBottom">
			<Button className="absolute p-3 right-3 bottom-4 bg-accent-500 " onPress={onPress}>
				<Icon icon={EditIcon} />
			</Button>
		</AnimatedScreen>
	);
};

export default EditButton;
