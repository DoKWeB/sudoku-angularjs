module.exports = function (paths) {
	return {
		module: {
			rules: [
				{
					test: require.resolve('angular'),
					include: paths,
					use: ['exports-loader?window.angular']
				}
			]
		}
	};
};