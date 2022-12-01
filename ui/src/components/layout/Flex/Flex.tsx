import { clsx } from 'clsx';

export interface FlexProps {
	wrap?: boolean;
	column?: boolean;
	justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
	align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
	className?: string;
	children: JSX.Element | JSX.Element[];
}

const Flex = (props: FlexProps) => {
	const { wrap, column, justify, align, children, className } = props;

	const getColumnClass = (): string => {
		if (column) {
			return 'flex-col';
		}
		return '';
	};

	const getWrapClass = (): string => {
		if (wrap) {
			return 'flex-wrap';
		}
		return '';
	};

	const getJustifyClass = (): string => {
		if (justify) {
			return `justify-${justify}`;
		}
		return '';
	};

	const getAlignClass = (): string => {
		if (align) {
			return `items-${align}`;
		}
		return '';
	};

	return (
		<div
			data-testid="flex"
			className={clsx(
				'flex',
				getColumnClass(),
				getWrapClass(),
				getJustifyClass(),
				getAlignClass(),
				className
			)}
		>
			{children}
		</div>
	);
};

export default Flex;
