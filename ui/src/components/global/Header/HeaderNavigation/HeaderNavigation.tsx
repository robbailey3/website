import React from 'react';
import { useWindowSize } from '@utils/useWindowSize';
import HeaderNavigationLink from './HeaderNavigationLink/HeaderNavigationLink';
import clsx from 'clsx';

export enum NavState {
	OPENED,
	CLOSED
}

const HeaderNavigation = () => {
	const { x } = useWindowSize();

	const [navState, setNavState] = React.useState(
		x > 768 ? NavState.OPENED : NavState.CLOSED
	);

	const isMobile = () => {
		return x <= 768;
	};

	const toggleMobileNav = () => {
		if (x > 768) {
			return;
		}
		setNavState(
			navState === NavState.OPENED ? NavState.CLOSED : NavState.OPENED
		);
	};
	return (
		<div>
			<ul
				className={clsx('flex items-center p-4 ', {
					'flex-col': isMobile() && navState === NavState.OPENED
				})}
			>
				<HeaderNavigationLink to="/" onClick={toggleMobileNav}>
					Home
				</HeaderNavigationLink>
				<HeaderNavigationLink to="/blog" onClick={toggleMobileNav}>
					Blog
				</HeaderNavigationLink>
				<HeaderNavigationLink to="/cv" onClick={toggleMobileNav}>
					CV
				</HeaderNavigationLink>
				<HeaderNavigationLink to="/experiments" onClick={toggleMobileNav}>
					Experiments
				</HeaderNavigationLink>
			</ul>
		</div>
	);
};

export default HeaderNavigation;
