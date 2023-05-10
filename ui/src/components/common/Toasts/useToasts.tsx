/* eslint-disable indent */
import React from 'react';
import Toast from './Toast/Toast';
import { Subscription, takeWhile, timer } from 'rxjs';

export enum ToastType {
	INFO,
	ERROR,
	SUCCESS
}

export class ToastModel {
	public type: ToastType;
	public title: string;
	public message: string;
	public canDismiss?: boolean;
	public active = true;

	constructor(
		type: ToastType,
		title: string,
		message: string,
		canDismiss?: boolean,
		duration?: number
	) {
		this.type = type;
		this.title = title;
		this.message = message;
		this.canDismiss = canDismiss == undefined ? true : canDismiss;

		setTimeout(() => {
			this.dismiss();
		}, duration || 5000);
	}

	public dismiss() {
		this.active = false;
	}
}

const ToastContext = React.createContext<{
	toasts: ToastModel[];
	addToast: (
		toast: Omit<ToastModel, 'active' | 'dismiss'> & { duration?: number }
	) => void;
}>({
	toasts: [],
	addToast: () => null
});

export const ToastContextProvider = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const [toasts, setToasts] = React.useState<ToastModel[]>([]);

	const [subscription, setSubscription] = React.useState<Subscription>();

	React.useEffect(() => {
		if (subscription) {
			return;
		}
		setSubscription(
			timer(0, 1000)
				.pipe(takeWhile(() => toasts.length > 0))
				.subscribe(() => {
					setToasts(toasts.filter((toast) => toast.active));
				})
		);

		return () => {
			(subscription as any)?.unsubscribe();
		};
	}, [toasts]);

	const addToast = React.useCallback(
		(toast: Omit<ToastModel, 'active' | 'dismiss'> & { duration?: number }) => {
			setToasts([
				...toasts,
				new ToastModel(
					toast.type,
					toast.title,
					toast.message,
					toast.canDismiss,
					toast.duration
				)
			]);
		},
		[setToasts]
	);

	return (
		<ToastContext.Provider value={{ toasts, addToast }}>
			{children}
			<pre>{JSON.stringify(toasts, null, 2)}</pre>
			<div>
				{toasts.map((toast, index) => (
					<Toast key={index} toast={toast} />
				))}
			</div>
		</ToastContext.Provider>
	);
};

export function useToasts() {
	const { addToast } = React.useContext(ToastContext);

	return { addToast };
}
