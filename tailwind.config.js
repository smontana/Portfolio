/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
			phablet: '640px',
			tabPortrait: '768px',
			tabLandscape: '1024px',
			laptop: '1280px',
			desktop: '1440px',
			wide: '1800px',
		},
    extend: {},
  },
  plugins: [],
}

