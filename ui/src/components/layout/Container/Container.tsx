export interface ContainerProps {
	children: JSX.Element | JSX.Element[];
}

const Container = (props: ContainerProps) => {
	const { children } = props;
	return <div className="container mx-auto">{children}</div>;
};

export default Container;
