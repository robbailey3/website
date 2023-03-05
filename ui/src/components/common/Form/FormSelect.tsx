import { AnyObject } from 'yup';
import { CommonFormItemDefinition } from './common';

export interface SelectOption {
	value: string;
	label: string;
}

export type FormInputDefinition<T> = CommonFormItemDefinition<T> & {
	options: SelectOption[];
};

export interface FormInputProps<T> {
	definition: FormInputDefinition<T>;
	value: T[keyof T];
	onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (evt: React.FocusEvent<HTMLInputElement>) => void;
}

const FormInput = <T extends AnyObject>(props: FormInputProps<T>) => {
	return <span>TODO</span>;
};

export default FormInput;
