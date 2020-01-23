const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './demos/client/demo.js',
	output: {
		path: path.resolve(__dirname, '../public'),
		filename: 'main.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader'
			}
		]
	},
	devtool: false
};
