const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './demos/src/demo.js',
	output: {
		path: path.resolve(__dirname, '../public'),
		filename: 'main.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['env']
				}
			}
		]
	},
	stats: {
		colors: true
	},
	devtool: 'source-map'
};
