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

const common = merge([
	{
		entry: {// точка входа приложения
			'index': PATHS.src + '/index.js' // страница index
		},
		output: { // точка выхода
			path: PATHS.build, // куда поместить бандл
			filename: 'js/[name].js', // имя бандла,
			publicPath: '/'
		},
		plugins: [
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

function getPlugin(env) {
	return {
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				chunks: ['index', 'common'],
				template: PATHS.src + '/index.pug',
				github: env === 'github'
			})
		]
	};
}

module.exports = function (env) {
	if (env === 'production' || env === 'github') {
		return merge([
			common,
			getPlugin(env),
			extractCSS(),
			uglifyJS(),
		]);
	}
	if (env === 'development') {
		return merge([
			common,
			getPlugin(env),
			devserver(),
			sass(),
			css(),
			{
				devtool: 'source-map'
			}
		]);
	}
};