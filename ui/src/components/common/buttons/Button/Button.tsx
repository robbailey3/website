import { ButtonSize } from '../buttonSize';
import { ButtonVariant } from '../buttonVariant';

export interface ButtonProps {
	variant?: ButtonVariant;
	size?: ButtonSize;
	rounded?: boolean;
	disabled?: boolean;
	loading?: boolean;
	children: JSX.Element | string;
}

const Button = (props: ButtonProps) => {
	const { variant, size, rounded, disabled, loading, children } = props;

	return <button>{children}</button>;
};

export default Button;
