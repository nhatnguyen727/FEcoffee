const CracoAntDesignPlugin = require('craco-antd');

module.exports = {
	plugins: [
		{
			plugin: CracoAntDesignPlugin,
			options: {
				customizeTheme: {
					'@primary-color': '#007235',
					'@link-color': '#00A862',
					'@border-radius-base': '4px',
				},
			},
		},
	],
	style: {
		postcss: {
			plugins: [require('tailwindcss'), require('autoprefixer')],
		},
	},
};

/* package.json */
// Update the existing calls to react-scripts in the scripts section of your package.json file to use the craco CLI:

// "scripts": {
// -   "start": "react-scripts start",
// +   "start": "craco start",
// -   "build": "react-scripts build",
// +   "build": "craco build"
// -   "test": "react-scripts test",
// +   "test": "craco test"
// }
