import React from 'react';
import { ElementType, ReactNode } from 'react';

export interface BoxProps {
	children: ReactNode;
	component: ElementType;
}

const Box = (props: BoxProps) => {
	const { children, component } = props;

	const generateClassName = (): string => {
		return '';
	};

	return React.createElement(
		component,
		{
			className: generateClassName()
		},
		children
	);
};

export default Box;
