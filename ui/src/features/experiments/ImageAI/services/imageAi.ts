import http from '../../../../common/http';
import React from 'react';
import { APIResponse } from 'types/apiResponse';
import { UploadResponse } from '../models/UploadResponse';
import { DetectFacesResponse } from '../models/DetectFacesResponse';

export function useImageAI() {
	const [currentImageId, setCurrentImageId] = React.useState<string>();

	async function upload(file: File) {
		const formData = new FormData();
		formData.append('file', file);
		const response = await http.post<APIResponse<UploadResponse>>(
			'/upload',
			formData
		);
		setCurrentImageId(response.result.id);
	}

	async function detectFaces() {
		const response = await http.get<APIResponse<DetectFacesResponse>>(
			'/detectFaces'
		);

		return response.result;
	}

	return { currentImageId, upload, detectFaces };
}
