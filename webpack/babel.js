module.exports = function (paths) {
	return {
		module: {
			rules: [
				{
					test: /\.js$/,
					include: paths,
					use: ['babel-loader']
				}
			]
		}
	};
};