const _colors = require('tailwindcss/colors')

exports = module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{html,ts,tsx}'],
	theme: {
		// extend: {
		// 	colors: {
		// 		'your-color-name': {
		// 			'700': '#ff0000',
		// 			'800': '#00ff00',
		// 		}
		// 	},
		// },
	},
	plugins: [
		require('@tailwindcss/typography')
	],
};
