const path = require('path'); // позволяет работать с путями одинаково на всех платформах
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const babel = require('./webpack/babel');
const html = require('./webpack/html');
const angular = require('./webpack/angular');

const PATHS = {
	src: path.join(__dirname, 'src'), // src path
};

const common = merge([
	{
		plugins: [
			new webpack.ProvidePlugin({
				angular: 'angular'
			})
		],
		cache: true,
		devtool: 'inline-source-map',
		module: {
			rules: [
				{
					test: /\.js?$/,
					include: PATHS.src,
					use: ['istanbul-instrumenter-loader'],
					enforce: 'post',
				},
			],
		}
	},
	images(),
	babel(),
	html(),
	sass(),
	css(),
	angular(),
]);

module.exports = common;