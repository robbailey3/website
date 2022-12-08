import { clsx } from 'clsx';
import { ButtonSize } from '../buttonSize';
import { ButtonVariant } from '../buttonVariant';

export interface ButtonProps {
	variant?: ButtonVariant;
	size?: ButtonSize;
	rounded?: boolean;
	disabled?: boolean;
	loading?: boolean;
	children: JSX.Element | string;
	onClick: (e: MouseEvent) => any;
}

const Button = (props: ButtonProps) => {
	const { variant, size, rounded, disabled, loading, children } = props;

	const getVariantClass = () => {
		switch (variant) {
			case 'primary':
				return 'bg-primary text-white border-transparent hover:bg-primary-600';
			case 'accent':
				return 'bg-accent text-white border-transparent hover:bg-accent-700';
			case 'outline':
				return 'border-primary text-primary hover:bg-primary hover:bg-opacity-10';
		}
	};

	const getSizeClass = () => {
		switch (size) {
			case 'xs':
				return 'px-1 py-0.5 text-xs';
			case 'sm':
				return 'px-2 py-1 text-sm';
			case 'md':
				return 'px-3 py-2 text-base';
			case 'lg':
				return 'px-4 py-3 text-lg';
			case 'xl':
				return 'px-5 py-4 text-xl';
			default:
				return 'px-3 py-2 text-base';
		}
	};

	const getRoundedClass = () => {
		if (rounded) {
			return 'rounded-full';
		}
		return 'rounded';
	};

	return (
		<button
			className={clsx(
				'duration-200 border',
				getVariantClass(),
				getSizeClass(),
				getRoundedClass(),
				{
					'bg-gray-700 text-gray-900 cursor-not-allowed hover:bg-gray-700':
						disabled
				}
			)}
			disabled={disabled || loading}
			data-testid="button"
		>
			{children}
		</button>
	);
};

export default Button;
