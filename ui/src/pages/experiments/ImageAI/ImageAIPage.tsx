import Container from '@components/layout/Container/Container';
import Flex from '@components/layout/Flex/Flex';
import FlexItem from '@components/layout/FlexItem/FlexItem';
import ImagePreview from '@features/experiments/ImageAI/components/ImagePreview/ImagePreview';
import ImageUploader from '@features/experiments/ImageAI/components/ImageUploader/ImageUploader';
import { useImageAI } from '@features/experiments/ImageAI/services/imageAi';
import React from 'react';

const ImageAIPage = () => {
	const { currentImageId } = useImageAI();

	const [file, setFile] = React.useState<File | null>(null);

	return (
		<Container>
			<Flex column>
				{!currentImageId && (
					<FlexItem>
						<ImageUploader onFileChange={setFile} />
					</FlexItem>
				)}
				{file && (
					<FlexItem>
						<ImagePreview file={file} />
					</FlexItem>
				)}
			</Flex>
		</Container>
	);
};

export default ImageAIPage;
