import clsx from 'clsx';
import { ReactNode } from 'react';

export interface ContainerProps {
	className?: string;
	children: ReactNode;
}

const Container = (props: ContainerProps) => {
	const { children, className } = props;

	return <div className={clsx('container mx-auto', className)}>{children}</div>;
};

export default Container;
