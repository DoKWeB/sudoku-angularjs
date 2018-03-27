module.exports = function () {
	return {
		devServer: { // настройки webpack-dev-server
			stats: 'errors-only', // выводить от webpack только ошибки в консоль
			port: 9000
		}
	};
};