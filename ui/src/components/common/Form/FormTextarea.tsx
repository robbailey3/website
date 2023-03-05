import Flex from '@components/layout/Flex/Flex';
import FlexItem from '@components/layout/FlexItem/FlexItem';
import clsx from 'clsx';
import { ErrorMessage, useField } from 'formik';
import { AnyObject } from 'yup';
import { CommonFormItemDefinition, FormItemType } from './common';
import FormLabel from './FormLabel';

export type FormTextareaDefinition<T> = CommonFormItemDefinition<T> & {
	inputType: FormItemType.TEXTAREA;
	rows: number;
};

export interface FormTextareaProps<T> {
	definition: FormTextareaDefinition<T>;
	value: T[keyof T];
	onChange: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onBlur: (evt: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const FormTextarea = <T extends AnyObject>(props: FormTextareaProps<T>) => {
	const { definition, value, onBlur, onChange } = props;

	const { rows, id, name, label } = definition;

	const [field, meta, helpers] = useField(definition.objKey);

	return (
		<Flex column className="w-full my-4">
			<FlexItem>
				<FormLabel htmlFor={id}>{label}</FormLabel>
			</FlexItem>
			<FlexItem>
				<textarea
					rows={rows}
					value={value as string}
					onChange={onChange}
					onBlur={onBlur}
					name={name}
					className={clsx(
						'w-full border border-gray-200 bg-transparent text-base py-2 px-4 rounded bg-slate-50 bg-opacity-5 shadow',
						{
							'border-red-300': meta.touched && meta.error
						}
					)}
				/>
			</FlexItem>
			<FlexItem>
				{meta.touched && meta.error && (
					<span className="text-red-400 italic text-sm">
						<ErrorMessage name={definition.objKey} />
					</span>
				)}
			</FlexItem>
		</Flex>
	);
};

export default FormTextarea;
