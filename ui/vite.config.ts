/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './setupTests.js'
	},
	resolve: {
		alias: {
			'@components': '/src/components',
			'@pages': '/src/pages',
			'@features': '/src/features'
		}
	}
});
