const _colors = require('tailwindcss/colors');

exports = module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{html,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				lambster: '#00a2e8',
				'lambster-dark': '#0097d8',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
