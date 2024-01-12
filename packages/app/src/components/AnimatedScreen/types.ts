import { PropsWithChildren } from 'react';

export interface Props extends PropsWithChildren {
	animation?:
		| 'FadeIn'
		| 'SlideInFromLeft'
		| 'SlideInFromRight'
		| 'SlideInFromTop'
		| 'SlideInFromBottom';
	dontAnimateOnMount?: boolean;
}
