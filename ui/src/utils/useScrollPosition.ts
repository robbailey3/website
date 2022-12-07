import React from 'react';
import { fromEvent, throttleTime } from 'rxjs';

export const useScrollPosition = () => {
	const [x, setX] = React.useState(0);
	const [y, setY] = React.useState(0);

	React.useEffect(() => {
		const $scrollSubscription = fromEvent(window, 'scroll')
			.pipe(throttleTime(100))
			.subscribe({
				next: () => {
					setX(window.scrollX);
					setY(window.scrollY);
				}
			});

		return () => {
			$scrollSubscription?.unsubscribe();
		};
	}, []);

	return { x, y };
};
