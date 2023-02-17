import React from 'react';
import { useWindowSize } from '@utils/useWindowSize';
import HeaderNavigationLink from './HeaderNavigationLink/HeaderNavigationLink';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export enum NavState {
	OPEN,
	CLOSED
}

const HeaderNavigation = () => {
	const { x } = useWindowSize();

	const [navState, setNavState] = React.useState(NavState.CLOSED);

	const isMobile = () => {
		return x <= 768;
	};

	const toggleMobileNav = () => {
		if (x > 768) {
			return;
		}
		setNavState(navState === NavState.OPEN ? NavState.CLOSED : NavState.OPEN);
	};

	const getMenuHeight = () => {
		if (!isMobile()) {
			return 'auto';
		}
		if (navState === NavState.OPEN) {
			return 'calc(100vh - 3.5rem)';
		}
		return '0';
	};

	return (
		<div className="py-4">
			{isMobile() && (
				<button
					className="p-4 rounded-full hover:bg-gray-100 hover:bg-opacity-50"
					onClick={toggleMobileNav}
				>
					<FontAwesomeIcon icon={faBars} />
				</button>
			)}
			<ul
				className={clsx('flex items-center overflow-hidden duration-300', {
					'flex-col absolute top-full bg-dark bg-opacity-90 w-full z-50':
						isMobile(),
					'p-4': navState === NavState.OPEN,
					'p-0': isMobile() && navState === NavState.CLOSED
				})}
				style={{ height: getMenuHeight() }}
			>
				<HeaderNavigationLink to="/" onClick={toggleMobileNav}>
					Home
				</HeaderNavigationLink>
				{/* <HeaderNavigationLink to="/blog" onClick={toggleMobileNav}>
					Blog
				</HeaderNavigationLink>
				<HeaderNavigationLink to="/cv" onClick={toggleMobileNav}>
					CV
				</HeaderNavigationLink> */}
				<HeaderNavigationLink to="/experiments" onClick={toggleMobileNav}>
					Experiments
				</HeaderNavigationLink>
			</ul>
		</div>
	);
};

export default HeaderNavigation;
