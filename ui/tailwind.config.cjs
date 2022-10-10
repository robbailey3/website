/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		fontFamily: {
			body: ['Quicksand', 'Arial', 'Helvetica', 'Sans-Serif'],
			heading: ['Oswald', 'Arial', 'Helvetica', 'Sans-Serif']
		}
	},
	plugins: []
};
