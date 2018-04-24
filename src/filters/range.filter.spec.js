describe('RangeFilter', function () {
	beforeEach(angular.mock.module('app'));
	
	describe('Test', function () {
		let rangeFilter;
		
		beforeEach(inject(function (_$filter_) {
			rangeFilter = _$filter_('range');
		}));
		
		describe('Test range', function () {
			it('rangeFilter([], 3) should be [1, 2, 3]', function () {
				expect(rangeFilter([], 3)).toEqual([1, 2, 3]);
			});
		});
	});
});