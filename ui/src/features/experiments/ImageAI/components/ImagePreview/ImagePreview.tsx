import Flex from '@components/layout/Flex/Flex';
import FlexItem from '@components/layout/FlexItem/FlexItem';
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

	return (
		<Flex align="center" justify="center">
			<FlexItem className="max-w-3xl p-8">
				<img src={imgSrc} alt="" className="rounded shadow overflow-hidden" />
			</FlexItem>
		</Flex>
	);
};

export default ImagePreview;
