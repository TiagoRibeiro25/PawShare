import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import utils from '../../utils';
import { Props } from './types';

const AnimatedScreen: React.FC<Props> = ({
	children,
	animation,
	dontAnimateOnMount,
}): React.JSX.Element => {
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const [mounted, setMounted] = useState<boolean>(false);

	const screenHeight = Dimensions.get('window').height;
	const screenWidth = Dimensions.get('window').width;

	useFocusEffect(
		useCallback(() => {
			let anim: Animated.CompositeAnimation;

			if (animation === 'SlideInFromBottom' || animation === 'SlideInFromTop') {
				anim = utils.animation.getVerticalSlide(fadeAnim);
			} else if (animation === 'SlideInFromLeft' || animation === 'SlideInFromRight') {
				anim = utils.animation.getHorizontalSlide(fadeAnim);
			} else {
				anim = utils.animation.getFadeIn(fadeAnim);
			}

			anim.start();

			return () => {
				anim.reset();
				setMounted(true);
			};
		}, [animation, fadeAnim]),
	);

	return (
		<>
			{!dontAnimateOnMount || (dontAnimateOnMount && mounted) ? (
				<Animated.View
					className="flex-1"
					style={[
						utils.animation.getStyleOptions(fadeAnim, animation, screenHeight, screenWidth),
					]}
				>
					{children}
				</Animated.View>
			) : (
				<>{children}</>
			)}
		</>
	);
};

export default AnimatedScreen;
