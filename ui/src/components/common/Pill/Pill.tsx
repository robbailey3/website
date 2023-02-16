export interface PillProps {
	children: React.ReactNode;
}

const Pill = (props: PillProps) => {
	const { children } = props;
	return (
		<div className="py-1 px-2 rounded-md bg-primary-400 text-sm">
			{children}
		</div>
	);
};

export default Pill;
