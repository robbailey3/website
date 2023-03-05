export interface FormLabelProps {
	children: React.ReactNode;
	htmlFor: string;
}

const FormLabel = (props: FormLabelProps) => {
	const { children, htmlFor } = props;

	return <label htmlFor={htmlFor}>{children}</label>;
};

export default FormLabel;
