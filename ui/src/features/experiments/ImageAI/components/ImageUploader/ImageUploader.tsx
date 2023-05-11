import FileField from '@components/common/Form/FileField/FileField';
import { ToastType, useToasts } from '@components/common/Toasts/useToasts';

export interface ImageUploaderProps {
	onFileChange: (file: File) => void;
}

const ImageUploader = (props: ImageUploaderProps) => {
	const { onFileChange } = props;

	const { addToast } = useToasts();

	const isValidFile = (file: File) => {
		if (file.size > 1024 * 1024 * 2) {
			return false;
		}
		if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
			return false;
		}
		return true;
	};

	const handleFileChange = ($evt: React.ChangeEvent<HTMLInputElement>) => {
		if (!$evt.target.files) {
			return;
		}
		const file = $evt.target.files[0];
		if (!isValidFile(file)) {
			addToast({
				type: ToastType.ERROR,
				title: 'Error',
				message: 'Invalid file type',
				duration: 10_000,
				canDismiss: true
			});

			return;
		}
		onFileChange(file);
	};

	return (
		<div>
			<FileField
				onChange={handleFileChange}
				accept="image/*"
				message="Upload image"
			/>
		</div>
	);
};

export default ImageUploader;
