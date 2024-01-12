import { Animated } from 'react-native';

const getFadeIn = (ref: Animated.Value): Animated.CompositeAnimation => {
	return Animated.timing(ref, {
		toValue: 1,
		duration: 300,
		useNativeDriver: true,
	});
};

const getVerticalSlide = (ref: Animated.Value): Animated.CompositeAnimation => {
	return Animated.timing(ref, {
		toValue: 1,
		duration: 400,
		useNativeDriver: true,
	});
};

const getHorizontalSlide = (ref: Animated.Value): Animated.CompositeAnimation => {
	return Animated.timing(ref, {
		toValue: 1,
		duration: 300,
		useNativeDriver: true,
	});
};

const getStyleOptions = (
	ref: Animated.Value,
	animation: string | undefined,
	height: number,
	width: number,
) => {
	switch (animation) {
		case 'FadeIn':
			return { opacity: ref };
		case 'SlideInFromBottom':
			return {
				transform: [
					{
						translateY: ref.interpolate({ inputRange: [0, 1], outputRange: [height, 0] }),
					},
				],
			};
		case 'SlideInFromTop':
			return {
				transform: [
					{
						translateY: ref.interpolate({ inputRange: [0, 1], outputRange: [-height, 0] }),
					},
				],
			};
		case 'SlideInFromRight':
			return {
				transform: [
					{
						translateX: ref.interpolate({ inputRange: [0, 1], outputRange: [width, 0] }),
					},
				],
			};
		default:
			return { opacity: ref };
	}
};

export default { getFadeIn, getVerticalSlide, getHorizontalSlide, getStyleOptions };
