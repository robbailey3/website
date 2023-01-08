import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

export interface IconLinkProps {
	icon: IconProp;
	href: string;
	alt: string;
	size?: 'sm' | 'md' | 'lg';
}

const IconLink = (props: IconLinkProps) => {
	const { icon, href, alt, size } = props;

	const getSizeClass = () => {
		switch (size) {
			case 'sm':
				return 'text-2xl';
			case 'md':
			default:
				return 'text-4xl';
			case 'lg':
				return 'text-7xl';
		}
	};

	return (
		<a href={href} className={clsx(getSizeClass(), 'hover:opacity-75')}>
			<span className="sr-only">{alt}</span>
			<FontAwesomeIcon icon={icon} />
		</a>
	);
};

export default IconLink;
