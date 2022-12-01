import { render, screen } from '@testing-library/react';
import FlexItem from './FlexItem';

describe('[COMPONENT]: FlexItem', () => {
	it('should render children', () => {
		render(<FlexItem>FlexItem</FlexItem>);

		expect(screen.getByText('FlexItem')).toBeInTheDocument();
	});

	it('should apply the grow class when grow is true', () => {
		render(<FlexItem grow>FlexItem</FlexItem>);

		expect(screen.getByTestId('flex-item')).toHaveClass('grow');
	});

	it('should apply the shrink class when shrink is true', () => {
		render(<FlexItem shrink>FlexItem</FlexItem>);

		expect(screen.getByTestId('flex-item')).toHaveClass('shrink');
	});
});
