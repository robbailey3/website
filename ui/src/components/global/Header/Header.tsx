import Container from '@components/layout/Container/Container';
import HeaderNavigation from './HeaderNavigation/HeaderNavigation';

const Header = () => {
	return (
		<header className="shadow bg-white bg-opacity-5">
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
