module.exports = function (paths) {
	return {
		module: {
			rules: [
				{
					test: /\.html$/,
					include: paths,
					use: [
						'html-loader'
					]
				}
			]
		}
	};
};