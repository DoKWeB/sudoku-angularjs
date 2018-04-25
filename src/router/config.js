function config($stateProvider, $locationProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			template: '<game></game>'
		})
		.state('pageNotFound', {
			url: '/404',
			template: '<page-not-found></page-not-found>'
		})
		.state('mode', {
			url: '/mode/:mode',
			template: '<box mode="mode"></box>',
			controller: ['$stateParams', '$scope', function ($stateParams, $scope) {
				$scope.mode = $stateParams.mode;
			}]
		});
	
	$urlRouterProvider.otherwise('/404');
	
	if (ENV !== 'github') {
		$locationProvider.html5Mode(true);
	} else {
		$locationProvider.hashPrefix('!');
	}
}
config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

export default config;