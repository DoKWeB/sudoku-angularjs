function config($stateProvider, $locationProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: ENV === 'github' ? '#!/' :'/',
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
	}
}
config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

export default config;