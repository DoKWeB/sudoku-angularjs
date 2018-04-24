describe('Utils service', function () {
	beforeEach(angular.mock.module('app'));
	
	describe('Tests', function () {
		let utils;
		
		beforeEach(inject(function (_utils_) {
			utils = _utils_;
		}));
		
		describe('Test uniqueArray method', function () {
			it('uniqueArray([1, 2, 3, 2]) should be [1, 2, 3]', function () {
				expect(utils.uniqueArray([1, 2, 3, 2])).toEqual([1, 2, 3]);
			});
			it('uniqueArray([]) should be []', function () {
				expect(utils.uniqueArray([])).toEqual([]);
			});
		});
		
		describe('Test getWord method', function () {
			it('getWord("second", 4) should be seconds', function () {
				expect(utils.getWord('second', 4)).toBe('seconds');
			});
			
			it('getWord("second", 1) should be second', function () {
				expect(utils.getWord('second', 1)).toBe('second');
			});
		});
		
		describe('Test getAllIndexes method', function () {
			it('getAllIndexes([1, 4, 5, 1, 3, 1], 1) should be [0, 3, 5]', function () {
				expect(utils.getAllIndexes([1, 4, 5, 1, 3, 1], 1)).toEqual([0, 3, 5]);
			});
			
			it('getAllIndexes([], 1) should be []', function () {
				expect(utils.getAllIndexes([], 1)).toEqual([]);
			});
		});
		
		describe('Test pet method', function () {
			it('pet(9) should be "09"', function () {
				expect(utils.pet(9)).toBe("09");
			});
			
			it('pet(12) should be 12', function () {
				expect(utils.pet(12)).toBe(12);
			});
		});
		
		describe('Test replaceZeroToUndefinedInArray method', function () {
			it('replaceZeroToUndefinedInArray([1, 0, 3, 0]) should be [1, undefined, 3, undefined]', function () {
				expect(utils.replaceZeroToUndefinedInArray([1, 0, 3, 0])).toEqual([1, undefined, 3, undefined]);
			});
			
			it('replaceZeroToUndefinedInArray([1, 0, 3, 4]) should be [1, undefined, 3, 4]', function () {
				expect(utils.replaceZeroToUndefinedInArray([1, 0, 3, 4])).toEqual([1, undefined, 3, 4]);
			});
			
			it('replaceZeroToUndefinedInArray([1, 2, 3, 4]) should be [1, 2, 3, 4]', function () {
				expect(utils.replaceZeroToUndefinedInArray([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
			});
		});
		
		describe('Test getDecentralizeIndex method', function () {
			it('getDecentralizeIndex(0, 0) should be 0', function () {
				expect(utils.getDecentralizeIndex(0, 0)).toBe(0);
			});
			
			it('getDecentralizeIndex(3, 0) should be 18', function () {
				expect(utils.getDecentralizeIndex(2, 0)).toBe(18);
			});
			
			it('getDecentralizeIndex(8, 8) should be 80', function () {
				expect(utils.getDecentralizeIndex(8, 8)).toBe(80);
			});
		});
		
		describe('Test getIndexesOfBoxArray method', function () {
			it('getIndexesOfBoxArray(0) should be { i: 0, j: 0 }', function () {
				expect(utils.getIndexesOfBoxArray(0)).toEqual({
					i: 0,
					j: 0
				});
			});
			
			it('getIndexesOfBoxArray(18) should be { i: 2, j: 0 }', function () {
				expect(utils.getIndexesOfBoxArray(18)).toEqual({
					i: 2,
					j: 0
				});
			});
			
			it('getIndexesOfBoxArray(80) should be { i: 8, j: 8 }', function () {
				expect(utils.getIndexesOfBoxArray(80)).toEqual({
					i: 8,
					j: 8
				});
			});
		});
		
		describe('Test decentralizeArray method', function () {
			describe('replaceZeroToUndefinedInArray', function () {
				beforeEach(function () {
					spyOn(utils, 'replaceZeroToUndefinedInArray').and.returnValue([]);
				});
				
				it('replaceZeroToUndefinedInArray to have been called', function () {
					utils.decentralizeArray([]);
					expect(utils.replaceZeroToUndefinedInArray).toHaveBeenCalled();
				});
				
				it('decentralizeArray([]) should be []', function () {
					expect(utils.decentralizeArray([])).toEqual([]);
				});
			});
			
			it('decentralizeArray([[1, 2, 3], [4, 5, 6]]) should be [1, 2, 3, 4, 5, 6]', function () {
				expect(utils.decentralizeArray([[1, 2, 3], [4, 5, 6]])).toEqual([1, 2, 3, 4, 5, 6]);
			});
			
			it('decentralizeArray([[0, 1, 2], [0, 3, 4]]) should be [undefined, 1, 2, undefined, 3, 4]', function () {
				expect(utils.decentralizeArray([[0, 1, 2], [0, 3, 4]])).toEqual([undefined, 1, 2, undefined, 3, 4]);
			});
		});
		
		describe('Test centralizeBoxArray method', function () {
			it('centralizeBoxArray([]) should be []', function () {
				expect(utils.centralizeBoxArray([], 0)).toEqual([]);
			});
			
			it('centralizeBoxArray([1, 2, 3, 4], 2) should be [[1, 2], [3, 4]]', function () {
				expect(utils.centralizeBoxArray([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
			});
		});
		
		describe('Test getEqualsCount method', function () {
			it('getEqualsCount([1, 2, 3, 1, 2, 1]) should be { 1: 3, 2: 2, 3: 1 }', function () {
				expect(utils.getEqualsCount([1, 2, 3, 1, 2, 1])).toEqual({ 1: 3, 2: 2, 3: 1 });
			});
		});
		
		describe('Test getEqualsCount method', function () {
			it('getEqualsCount([1, 2, 3, 1, 2, 1]) should be { 1: 3, 2: 2, 3: 1 }', function () {
				expect(utils.getEqualsCount([1, 2, 3, 1, 2, 1])).toEqual({ 1: 3, 2: 2, 3: 1 });
			});
		});
		
		describe('Test setHorizontalIndexes method', function () {
			let testArr = [];
			
			it('setHorizontalIndexes(2, 6, 4, []) should be [5, 6, 3, 2]', function () {
				utils.setHorizontalIndexes(2, 6, 4, testArr);
				expect(testArr).toEqual([5, 6, 3, 2]);
			});
		});
		
		describe('Test getHorizontalIndexes method', function () {
			it('getHorizontalIndexes(4) should be [5, 6, 7, 8, 3, 2, 1, 0]', function () {
				expect(utils.getHorizontalIndexes(4)).toEqual([5, 6, 7, 8, 3, 2, 1, 0]);
			});
			
			it('getHorizontalIndexes(13) should be [14, 15, 16, 17, 12, 11, 10, 9]', function () {
				expect(utils.getHorizontalIndexes(13)).toEqual([14, 15, 16, 17, 12, 11, 10, 9]);
			});
			
			it('getHorizontalIndexes(22) should be [23, 24, 25, 26, 21, 20, 19, 18]', function () {
				expect(utils.getHorizontalIndexes(22)).toEqual([23, 24, 25, 26, 21, 20, 19, 18]);
			});
			
			it('getHorizontalIndexes(31) should be [32, 33, 34, 35, 30, 29, 28, 27]', function () {
				expect(utils.getHorizontalIndexes(31)).toEqual([32, 33, 34, 35, 30, 29, 28, 27]);
			});
			
			it('getHorizontalIndexes(40) should be [41, 42, 43, 44, 39, 38, 37, 36]', function () {
				expect(utils.getHorizontalIndexes(40)).toEqual([41, 42, 43, 44, 39, 38, 37, 36]);
			});
			
			it('getHorizontalIndexes(49) should be [50, 51, 52, 53, 48, 47, 46, 45]', function () {
				expect(utils.getHorizontalIndexes(49)).toEqual([50, 51, 52, 53, 48, 47, 46, 45]);
			});
			
			it('getHorizontalIndexes(58) should be [59, 60, 61, 62, 57, 56, 55, 54]', function () {
				expect(utils.getHorizontalIndexes(58)).toEqual([59, 60, 61, 62, 57, 56, 55, 54]);
			});
			
			it('getHorizontalIndexes(67) should be [68, 69, 70, 71, 66, 65, 64, 63]', function () {
				expect(utils.getHorizontalIndexes(67)).toEqual([68, 69, 70, 71, 66, 65, 64, 63]);
			});
			
			it('getHorizontalIndexes(76) should be [68, 69, 70, 71, 66, 65, 64, 63]', function () {
				expect(utils.getHorizontalIndexes(76)).toEqual([77, 78, 79, 80, 75, 74, 73, 72]);
			});
		});
		
		describe('Test getVerticalIndexes method', function () {
			it('getVerticalIndexes(27) should be [36, 45, 54, 63, 72, 18, 9, 0]', function () {
				expect(utils.getVerticalIndexes(27)).toEqual([36, 45, 54, 63, 72, 18, 9, 0]);
			});
		});
		
		describe('Test shuffle method', function () {
			let testArr1 = [],
				testArr2 = [0];
			
			it('shuffle([]) should be []', function () {
				utils.shuffle(testArr1);
				expect(testArr1).toEqual([]);
			});
			
			it('shuffle([0]) should be [0]', function () {
				utils.shuffle(testArr2);
				expect(testArr2).toEqual([0]);
			});
		});
	});
});