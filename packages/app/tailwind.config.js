/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'primary-50': '#F8F5FF',
				'secondary-50': '#83A3FF',
				'secondary-200': '#5863AE',
				'secondary-300': '#414587',
				'secondary-500': '#2B2A63',
				'accent-50': '#F9DFBD',
				'accent-100': '#FBD49D',
				'accent-200': '#FCC97D',
				'accent-300': '#FABF5C',
				'accent-500': '#F8B436',
				'success-50': '#A8D99C',
				'success-100': '#96CD89',
				'success-200': '#83C077',
				'success-300': '#70B464',
				'success-500': '#10652F',
				'error-50': '#FFB4AD',
				'error-100': '#F09992',
				'error-200': '#E17F79',
				'error-500': '#A12121',
				'neutral-50': '#FFFFFF',
				'neutral-500': '#AEAEAE',
			},
		},
	},
	plugins: [],
};
