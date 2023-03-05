export enum FormItemType {
	INPUT = 'INPUT',
	TEXTAREA = 'TEXTAREA'
}

export interface CommonFormItemDefinition<T> {
	label: string;
	id: string;
	name: string;
	disabled: boolean;
	objKey: string & keyof T;
}
