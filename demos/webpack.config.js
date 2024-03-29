const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {

	return {
		mode: env === 'production' ? 'development' : 'development',
		entry: './demos/client/demo.js',
		output: {
			path: path.resolve(__dirname, '../public'),
			filename: 'main.js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules)/,
					loader: 'babel-loader'
				}
			]
		},
		devtool: false
	}
};
