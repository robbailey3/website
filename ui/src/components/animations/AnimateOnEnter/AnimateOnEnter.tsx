import { useIntersectionObserver } from '@utils/useIntersectionObserver';
import {
	motion,
	Target,
	TargetAndTransition,
	useAnimationControls,
	VariantLabels
} from 'framer-motion';
import React from 'react';

export interface AnimateOnEnterProps {
	children: React.ReactNode;
	animation: TargetAndTransition;
	initial: Target | VariantLabels;
	enterThreshold?: number;
	className?: string;
}

const AnimateOnEnter = (props: AnimateOnEnterProps) => {
	const { children, animation, initial, enterThreshold, className } = props;
	const divEl = React.useRef<HTMLDivElement>(null);
	const { isIntersecting } = useIntersectionObserver(
		divEl,
		enterThreshold ?? 0
	);
	const controls = useAnimationControls();

	React.useEffect(() => {
		if (isIntersecting) {
			controls.start(animation);
		}
	}, [isIntersecting]);

	return (
		<motion.div
			ref={divEl}
			animate={controls}
			initial={initial}
			className={className}
		>
			{children}
		</motion.div>
	);
};

export default AnimateOnEnter;
