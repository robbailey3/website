import React from 'react';

export interface ImagePreviewProps {
	file: File;
}

const ImagePreview = (props: ImagePreviewProps) => {
	const { file } = props;

	const [imgSrc, setImgSrc] = React.useState<string>();

	const [isLoading, setIsLoading] = React.useState(false);

	const loadFile = () => {
		setIsLoading(true);
		const reader = new FileReader();
		reader.onload = (e) => {
			setImgSrc(e.target?.result as string);
			setIsLoading(false);
		};
		reader.readAsDataURL(file);
	};

	React.useEffect(() => {
		loadFile();
	}, [file]);

	if (isLoading) return <div>Loading...</div>;

	if (!imgSrc) return <div>No image</div>;

	return <img src={imgSrc} alt="" />;
};

export default ImagePreview;
