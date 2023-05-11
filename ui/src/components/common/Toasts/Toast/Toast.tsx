import FlexItem from '@components/layout/FlexItem/FlexItem';
import { ToastModel, ToastType } from '../useToasts';
import Flex from '@components/layout/Flex/Flex';
import clsx from 'clsx';
import Button from '@components/common/buttons/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Toast = ({ toast }: { toast: ToastModel }) => {
	const { title, message, type } = toast;

	const toastClass = () => {
		switch (type) {
			case ToastType.SUCCESS:
			default:
				return 'border-green-500';
			case ToastType.ERROR:
				return 'border-red-500';
			case ToastType.INFO:
				return 'border-yellow-500';
		}
	};

	return (
		<div
			className={clsx(
				toastClass(),
				'rounded shadow-2xl pt-4 pb-2 px-4 relative border-2 bg-gray-900'
			)}
		>
			{toast.canDismiss && (
				<div className="absolute top-2 right-2">
					<Button
						variant="ghost"
						size="xs"
						rounded
						onClick={() => toast.dismiss()}
					>
						<>
							<FontAwesomeIcon icon={faTimes} />
							<span className="sr-only">Dismiss</span>
						</>
					</Button>
				</div>
			)}
			<Flex column>
				<FlexItem>
					<h2 className="text-base my-0">{title}</h2>
				</FlexItem>
				<FlexItem>
					<p className="text-sm">{message}</p>
				</FlexItem>
			</Flex>
		</div>
	);
};

export default Toast;
