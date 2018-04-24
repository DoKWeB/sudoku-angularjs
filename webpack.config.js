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
	build: path.join(__dirname, 'docs') // build path
};

const common = function (isGithub) {
	return merge([
		{
			entry: {// точка входа приложения
				'index': PATHS.src + '/index.js' // страница index
			},
			output: { // точка выхода
				path: PATHS.build, // куда поместить бандл
				filename: 'js/[name].js', // имя бандла,
				publicPath: isGithub ? './' : '/'
			},
			plugins: [
				new HtmlWebpackPlugin({
					filename: 'index.html',
					chunks: ['index', 'common'],
					template: PATHS.src + '/index.pug',
					github: isGithub
				}),
				new webpack.optimize.CommonsChunkPlugin({
					name: 'common'
				}),
				new webpack.ProvidePlugin({
					angular: 'angular'
				})
			]
		},
		pug(),
		images(),
		babel(),
		html(),
		angular()
	]);
};

module.exports = function (env) {
	let isGithub = env === 'github';
	
	if (env === 'production' || isGithub) {
		return merge([
			common(isGithub),
			extractCSS(),
			uglifyJS(),
		]);
	}
	if (env === 'development') {
		return merge([
			common(isGithub),
			devserver(),
			sass(),
			css(),
			{
				devtool: 'source-map'
			}
		]);
	}
};