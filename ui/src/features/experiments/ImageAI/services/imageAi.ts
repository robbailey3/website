import http from 'common/http';
import React from 'react';

export function useImageAI() {
	const [currentImageId, setCurrentImageId] = React.useState<string>();

	async function upload() {}

	async function detectFaces() {
		http.get('/detectFaces');
	}
}
