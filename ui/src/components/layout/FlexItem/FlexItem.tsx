import { clsx } from 'clsx';

export interface FlexItemProps {
	grow?: boolean;
	shrink?: boolean;
	className?: string;
	children: JSX.Element | JSX.Element[] | string;
}

const FlexItem = (props: FlexItemProps) => {
	const { children, grow, shrink, className } = props;

	const getGrowClass = () => {
		if (grow) {
			return 'grow';
		}
		return '';
	};

	const getShrinkClass = () => {
		if (shrink) {
			return 'shrink';
		}
		return '';
	};

	return (
		<div
			className={clsx(getGrowClass(), getShrinkClass(), className)}
			data-testid="flex-item"
		>
			{children}
		</div>
	);
};

export default FlexItem;
