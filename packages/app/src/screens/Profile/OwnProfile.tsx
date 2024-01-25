import React from 'react';
import AnimatedScreen from '../../components/AnimatedScreen';
import ProfileData from './components/ProfileData';

const OwnProfile: React.FC = (): React.JSX.Element => {
	return (
		<AnimatedScreen animation="FadeIn">
			<ProfileData id="me" />
		</AnimatedScreen>
	);
};

export default OwnProfile;
