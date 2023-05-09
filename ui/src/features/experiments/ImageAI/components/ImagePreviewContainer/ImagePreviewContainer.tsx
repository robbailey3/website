import React, { Suspense } from 'react';
import ImagePreview from '../ImagePreview/ImagePreview';

export interface ImagePreviewContainerProps {
	file: File;
}

const ImagePreviewContainer = (props: ImagePreviewContainerProps) => {
	const { file } = props;

	if (!file) {
		return null;
	}

	return <ImagePreview file={file} />;
};

export default ImagePreviewContainer;
