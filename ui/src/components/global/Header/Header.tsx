import Container from '@components/layout/Container/Container';
import clsx from 'clsx';
import HeaderNavigation from './HeaderNavigation/HeaderNavigation';

const Header = () => {
	return (
		<header className={clsx('w-full duration-100 z-50 bg-dark bg-opacity-80')}>
			<div>
				<a
					id="skip-link"
					href="#main"
					className="sr-only focus:not-sr-only focus:p-4 focus:bg-white focus:shadow focus:rounded focus:text-black focus:absolute focus:m-4 focus:z-50"
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
