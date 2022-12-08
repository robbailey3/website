import { MouseEvent, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

export interface HeaderNavigationLinkProps {
	to: string;
	onClick: (evt: MouseEvent) => unknown;
	children: ReactNode;
}

const HeaderNavigationLink = (props: HeaderNavigationLinkProps) => {
	const { to, onClick, children } = props;

	return (
		<li>
			<NavLink
				to={to}
				onClick={onClick}
				className="text-white block px-4 py-2 hover:bg-white hover:bg-opacity-5 duration-200"
			>
				{children}
			</NavLink>
		</li>
	);
};

export default HeaderNavigationLink;
