import Container from '@components/layout/Container/Container';
import { useAuthContext } from '@features/auth/AuthContext';
import { useScrollPosition } from '@utils/useScrollPosition';
import clsx from 'clsx';
import React from 'react';
import HeaderNavigation from './HeaderNavigation/HeaderNavigation';

const Header = () => {
	const { y } = useScrollPosition();

	const [bgBlur, setBgBlur] = React.useState(false);

	React.useEffect(() => {
		console.log(y);
		setBgBlur(y > 100);
	}, [y]);

	return (
		<header
			className={clsx('shadow fixed top-0 left-0 w-full duration-100', {
				'backdrop-blur-sm': bgBlur,
				'backdrop-blur-0': !bgBlur
			})}
		>
			<div>
				<a
					id="skip-link"
					href="#main"
					className="sr-only focus:not-sr-only focus:p-4 focus:bg-white focus:shadow focus:rounded focus:text-black focus:absolute focus:m-4"
				>
					Skip to content
				</a>
			</div>
			<Container>
				<HeaderNavigation />
			</Container>
		</header>
	);
};

export default Header;
