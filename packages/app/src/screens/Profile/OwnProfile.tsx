import React from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';
import ProfileData from './components/ProfileData';

const OwnProfile: React.FC = (): React.JSX.Element => {
	return (
		<AnimatedComponent animation="FadeIn">
			<ProfileData isLoggedUser />
		</AnimatedComponent>
	);
};

export default OwnProfile;
