const path = require('path');

module.exports = function(config) {
  config.set({
    coverageIstanbulReporter: {
	  dir: path.join(__dirname, 'tmp/coverage'),
    },
	preprocessors: {
		'./src/index.spec.js': ['webpack', 'sourcemap']
	},
	plugins: [
		'karma-jasmine',
		'karma-coverage',
		'karma-webpack',
		'karma-phantomjs-launcher',
		'karma-sourcemap-loader',
		'karma-coverage-istanbul-reporter'
	],
	webpack: require('./webpack.test.config'),
	webpackMiddleware: {
		noInfo:true
	},
	basePath: '',
	frameworks: ['jasmine'],
	files: [
		'./src/index.spec.js',
	],
	reporters: ['progress', 'coverage-istanbul'],
	exclude: [
	],
	port: 9899,
	colors: true,
	logLevel: config.LOG_INFO,
	autoWatch: true,
	browsers: ['PhantomJS'],
	singleRun: false,
  })
};
