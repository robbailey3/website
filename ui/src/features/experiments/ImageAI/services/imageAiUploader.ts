import React from 'react';
import { useImageAI } from './imageAi';
import { ToastType, useToasts } from '@components/common/Toasts/useToasts';

export enum ConfirmationState {
	CONFIRMED,
	REJECTED,
	PENDING,
	NO_IMAGE
}

export enum UploadState {
	NOT_UPLOADED,
	UPLOADING,
	UPLOADED,
	ERROR
}

function loadImagePreview(file: File) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			resolve(e.target?.result as string);
		};
		reader.onerror = (e) => {
			reject(e);
		};
		reader.readAsDataURL(file);
	});
}

export function useImageAiUploader() {
	const [imageSrc, setImageSrc] = React.useState<string | null>(null);

	const [confirmationState, setConfirmationState] =
		React.useState<ConfirmationState>(ConfirmationState.NO_IMAGE);

	const [uploadState, setUploadState] = React.useState<UploadState>(
		UploadState.NOT_UPLOADED
	);

	const { upload } = useImageAI();

	const { addToast } = useToasts();

	async function loadPreview(imageFile: File) {
		try {
			const imageUrl = await loadImagePreview(imageFile);
			setImageSrc(imageUrl);
			setConfirmationState(ConfirmationState.PENDING);
		} catch (e: any) {
			console.error(e);
			addToast({
				type: ToastType.ERROR,
				message: `Error loading image preview: ${e.message}`,
				title: 'Error'
			});
		}
	}

	async function uploadImage(file: File) {
		try {
			setUploadState(UploadState.UPLOADING);
			await upload(file);
		} catch (e: any) {
			console.error(e);
			addToast({
				type: ToastType.ERROR,
				message: `Error uploading image: ${e.message}`,
				title: 'Error'
			});
		}
	}

	return { uploadImage, uploadState, confirmationState, loadPreview, imageSrc };
}
