import { clsx } from 'clsx';

export interface FlexProps {
	wrap?: boolean;
	column?: boolean;
	justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
	align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
	className?: string;
	children: React.ReactNode;
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
		switch (justify) {
			case 'around':
				return 'justify-around';
			case 'between':
				return 'justify-between';
			case 'center':
				return 'justify-center';
			case 'end':
				return 'justify-end';
			case 'evenly':
				return 'justify-evenly';
			case 'start':
				return 'justify-start';
			default:
				return '';
		}
	};

	const getAlignClass = (): string => {
		switch (align) {
			case 'baseline':
				return 'items-baseline';
			case 'center':
				return 'items-center';
			case 'end':
				return 'items-end';
			case 'start':
				return 'items-start';
			case 'stretch':
				return 'items-stretch';
			default:
				return '';
		}
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
