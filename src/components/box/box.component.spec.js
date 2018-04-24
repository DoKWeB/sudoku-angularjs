describe('BoxComponent', function () {
	beforeEach(angular.mock.module('app'));
	
	describe('Test', function () {
		let controller;
		
		beforeEach(inject(function ($componentController) {
			controller = $componentController('box', {}, {
				mode: 'easy'
			});
			controller.$onInit();
		}));
		
		describe('Test mark() method', function () {
			it('mark(1, 2) should set activeValue and activeIndex', function () {
				controller.mark(1, 2);
				expect(controller.activeValue).toBe(1);
				expect(controller.activeIndex).toBe(2);
			});
		});
		
		describe('Test getTime() method', function () {
			it('getTime() should return 0 seconds', function () {
				expect(controller.getTime()).toBe('0 seconds');
			});
		});
		
		describe('Test getHinstPhrase() method', function () {
			it('getHinstPhrase() should return 5 hints are available from 5', function () {
				expect(controller.getHinstPhrase()).toBe('5 hints are available from 5');
			});
		});
		
		describe('Test takeHint() method', function () {
			it('takeHint() should set hints to 1', function () {
				controller.takeHint();
				expect(controller.hints).toBe(1);
			});
		});
	});
	
	describe('Test redirect', function () {
		let controller,
			$state;
		
		beforeEach(inject(function ($componentController) {
			$state = jasmine.createSpyObj('$state', ['go']);
			controller = $componentController('box', { $state }, {
				mode: 'undefined'
			});
		}));
		
		describe('Test $onInit() method', function () {
			beforeEach(function () {
				controller.$onInit();
			});
			
			it('$onInit should call $state.go', function () {
				expect($state.go).toHaveBeenCalled();
			});
			it('$onInit should call $state.go("pageNotFound")', function () {
				expect($state.go).toHaveBeenCalledWith('pageNotFound');
			});
		});
	});
});