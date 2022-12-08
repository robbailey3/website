import { render, screen } from '@testing-library/react';
import Flex from './Flex';

describe('[COMPONENT]: Flex', () => {
	it('should render children correctly', () => {
		render(
			<Flex>
				<div>Test</div>
			</Flex>
		);

		expect(screen.getByText('Test')).toBeInTheDocument();
	});

	it('should apply the flex-col class when column is true', () => {
		render(
			<Flex column>
				<div>Test</div>
			</Flex>
		);

		expect(screen.getByTestId('flex')).toHaveClass('flex-col');
	});

	it('should apply the flex-wrap class when wrap is true', () => {
		render(
			<Flex wrap>
				<div>Test</div>
			</Flex>
		);

		expect(screen.getByTestId('flex')).toHaveClass('flex-wrap');
	});

	test.each(['start', 'end', 'center', 'between', 'around', 'evenly'] as any[])(
		'should apply the correct justify class when justify is %s',
		(justify: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly') => {
			render(
				<Flex justify={justify}>
					<div>Test</div>
				</Flex>
			);

			expect(screen.getByTestId('flex')).toHaveClass(`justify-${justify}`);
		}
	);
});
