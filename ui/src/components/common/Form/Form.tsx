import { useState } from 'react';
import { AnyObject, ObjectSchema } from 'yup';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import FormItem, { FormItemDefinition } from './FormItem';
import Button from '../buttons/Button/Button';
import Flex from '@components/layout/Flex/Flex';
import FlexItem from '@components/layout/FlexItem/FlexItem';

export interface FormDefinition<T extends AnyObject> {
	title: string;
	subtitle?: string;
	items: FormItemDefinition<T>[];
}

export interface FormProps<T extends AnyObject> {
	definition: FormDefinition<T>;
	onSubmit: (value: T) => Promise<void>;
	initialValue: T;
	validationSchema: ObjectSchema<T, unknown, unknown, ''>;
}

const Form = <T extends AnyObject>(props: FormProps<T>) => {
	const { definition, initialValue, validationSchema, onSubmit } = props;

	const { title, subtitle, items } = definition;

	return (
		<Formik
			initialValues={initialValue}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleChange, handleBlur, values, submitForm }) => (
				<div>
					<h2>{title}</h2>
					{subtitle && <h3>{subtitle}</h3>}
					<Flex column>
						{items.map((item) => (
							<FlexItem key={item.id}>
								<FormItem<T>
									onChange={handleChange}
									onBlur={handleBlur}
									value={values[item.objKey as string]}
									definition={item}
								/>
							</FlexItem>
						))}
					</Flex>
					<Button type="submit" onClick={submitForm}>
						Submit
					</Button>
				</div>
			)}
		</Formik>
	);
};

export default Form;
