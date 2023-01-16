import { useIntersectionObserver } from '@utils/useIntersectionObserver';
import { motion, useAnimationControls } from 'framer-motion';
import React from 'react';

export interface FadeInOnEnterProps {
	children: React.ReactNode;
	delay: number;
}

const FadeInOnEnter = (props: FadeInOnEnterProps) => {
	const { children, delay } = props;
	const divEl = React.useRef<HTMLDivElement>(null);
	const { isIntersecting } = useIntersectionObserver(divEl);
	const controls = useAnimationControls();

	React.useEffect(() => {
		if (isIntersecting) {
			controls.start({ opacity: 1, y: 0, transition: { delay } });
		}
	}, [isIntersecting]);

	return (
		<motion.div
			ref={divEl}
			animate={controls}
			initial={{ opacity: 0, y: -100 }}
		>
			{children}
		</motion.div>
	);
};

export default FadeInOnEnter;
