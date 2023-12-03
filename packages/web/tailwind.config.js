/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primaryColor: "#F8F5FF",
				secondaryColor: "#2B2A63",
				tertiaryColor: "#495197",
				quaternaryColor: "#F2B336",
			},
		},
	},
	plugins: [],
};
