import path from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.vue$/,
				/\.vue\?vue/, // .vue
				/\.md$/ // .md
			],
			imports: ['vue'],
			dts: 'src/auto-imports.d.ts'
		}),
		Components({
			dts: 'src/components.d.ts',
			dirs: ['src/components']
		})
	],
	resolve: {
		alias: {
			'@shared': path.resolve(__dirname, './src/shared'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@components': path.resolve(__dirname, './src/components'),
			'@services': path.resolve(__dirname, './src/services'),
			'@stores': path.resolve(__dirname, './src/stores'),
		}
	}
});
