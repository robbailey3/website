import React from 'react';

export const useIntersectionObserver = (
	el: React.RefObject<HTMLElement | null>,
	threshold = 0
) => {
	const [isIntersecting, setIsIntersecting] = React.useState(false);

	React.useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsIntersecting(true);
					}
				});
			},
			{ threshold }
		);
		if (el.current) {
			observer.observe(el.current);
		}

		return () => {
			if (el.current) {
				observer.unobserve(el.current);
			}
		};
	}, [el.current]);

	return { isIntersecting };
};
