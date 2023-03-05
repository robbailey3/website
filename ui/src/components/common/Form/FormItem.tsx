import { AnyObject } from 'yup';
import { FormItemType } from './common';
import FormInput, { FormInputDefinition } from './FormInput';
import FormTextarea, { FormTextareaDefinition } from './FormTextarea';

export type FormItemDefinition<T> =
	| FormInputDefinition<T>
	| FormTextareaDefinition<T>;

export interface FormItemProps<T> {
	definition: FormItemDefinition<T>;
	value: T[keyof T];
	onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (evt: React.FocusEvent<HTMLInputElement>) => void;
}

const FormItem = <T extends AnyObject>(props: FormItemProps<T>) => {
	const { definition } = props;

	const { inputType } = definition;

	const getInputComponent = () => {
		switch (inputType) {
			case FormItemType.INPUT:
				return <FormInput {...(props as any)} />;
			case FormItemType.TEXTAREA:
				return <FormTextarea {...(props as any)} />;
			default:
				return <p>Invalid form element</p>;
		}
	};

	return <div>{getInputComponent()}</div>;
};

export default FormItem;
