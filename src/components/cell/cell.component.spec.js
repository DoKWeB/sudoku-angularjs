describe('CellComponent', function () {
	beforeEach(angular.mock.module('app'));
	
	describe('Test', function () {
		let controller;
		
		beforeEach(inject(function ($componentController) {
			controller = $componentController('cell', {}, {
				change: () => true,
				mark: () => true
			});
		}));
		
		describe('Test changeNumber() method', function () {
			it('changeNumber() should set cell to undefined', function () {
				controller.changeNumber();
				expect(controller.cell).toBe(undefined);
			});
		});
		
		describe('Test preMark() method', function () {
			beforeEach(function () {
				spyOn(controller, 'mark');
			});
			
			it('preMark() should call mark', function () {
				controller.preMark();
				expect(controller.mark).toHaveBeenCalled();
			});
		});
	});
});