import FlexItem from '@components/layout/FlexItem/FlexItem';
import { ToastModel, ToastType } from '../useToasts';
import Flex from '@components/layout/Flex/Flex';
import clsx from 'clsx';

const Toast = ({ toast }: { toast: ToastModel }) => {
	const { title, message, type } = toast;

	const toastClass = () => {
		switch (type) {
			case ToastType.SUCCESS:
			default:
				return 'border-green-500 bg-green-50';
			case ToastType.ERROR:
				return 'border-red-500 bg-red-50';
			case ToastType.INFO:
				return 'border-yellow-500 bg-yellow-50';
		}
	};

	return (
		<div className={clsx(toastClass)}>
			<Flex>
				<FlexItem>
					<h2>{title}</h2>
				</FlexItem>
				<FlexItem>
					<p>{message}</p>
				</FlexItem>
			</Flex>
		</div>
	);
};

export default Toast;
