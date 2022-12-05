import React from 'react';
import { fromEvent, throttleTime } from 'rxjs';

export const useWindowSize = () => {
	const [x, setX] = React.useState(window.innerWidth);
	const [y, setY] = React.useState(window.innerHeight);

	React.useEffect(() => {
		const $windowSubscription = fromEvent(window, 'resize')
			.pipe(throttleTime(100))
			.subscribe({
				next: () => {
					setX(window.innerWidth);
					setY(window.innerHeight);
				}
			});

		return () => {
			$windowSubscription?.unsubscribe();
		};
	}, []);

	return { x, y };
};
