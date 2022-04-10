import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import checker from 'vite-plugin-checker';
import alias from '@rollup/plugin-alias';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		preact(),
		checker({
			typescript: true,
			eslint: {
				lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
			},
		}),
	],
	build: {
		rollupOptions: {
			plugins: [
				alias({
					entries: [
						{ find: 'react', replacement: 'preact/compat' },
						{ find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
						{ find: 'react-dom', replacement: 'preact/compat' },
						{ find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' },
					],
				}),
			],
		},
	},
});
