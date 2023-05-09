import FileField from '@components/common/Form/FileField/FileField';

export interface ImageUploaderProps {
	onFileChange: (file: File) => void;
}

const ImageUploader = (props: ImageUploaderProps) => {
	const { onFileChange } = props;

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
