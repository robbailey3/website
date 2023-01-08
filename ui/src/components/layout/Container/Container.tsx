import { ReactNode } from 'react';

export interface ContainerProps {
	className?: string;
	children: ReactNode;
	style?: React.CSSProperties;
}

const Container = (props: ContainerProps) => {
	const { children, className, style } = props;

	return (
		<div className={className} style={style}>
			<div className="container mx-auto px-4 h-full">{children}</div>
		</div>
	);
};

export default Container;
