/* eslint-disable indent */
import React from 'react';
import Toast from './Toast/Toast';
import { Subscription, takeWhile, timer } from 'rxjs';
import Flex from '@components/layout/Flex/Flex';
import FlexItem from '@components/layout/FlexItem/FlexItem';

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
		this.canDismiss = canDismiss == undefined ? false : canDismiss;

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

	const [timeoutRef, setTimeoutRef] =
		React.useState<NodeJS.Timeout | null>(null);

	const addToast = (
		toast: Omit<ToastModel, 'active' | 'dismiss'> & { duration?: number }
	) => {
		setToasts((toasts) => [
			...toasts,
			new ToastModel(
				toast.type,
				toast.title,
				toast.message,
				toast.canDismiss,
				toast.duration
			)
		]);
	};

	React.useEffect(() => {
		if (timeoutRef) {
			clearTimeout(timeoutRef);
		}

		setTimeoutRef(
			setTimeout(() => {
				setToasts((toasts) => toasts.filter((toast) => toast.active));
			}, 1000)
		);
	}, [toasts, setToasts]);

	return (
		<ToastContext.Provider value={{ toasts, addToast }}>
			{children}
			<Flex className="fixed bottom-8 right-8 space-y-4" column>
				{toasts.map((toast, index) => (
					<FlexItem key={index}>
						<Toast toast={toast} />
					</FlexItem>
				))}
			</Flex>
		</ToastContext.Provider>
	);
};

export function useToasts() {
	const { addToast } = React.useContext(ToastContext);

	return { addToast };
}
