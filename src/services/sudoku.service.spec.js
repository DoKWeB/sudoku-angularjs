describe('SudokuService', function () {
	beforeEach(angular.mock.module('app'));
	
	describe('Test', function () {
		let sudokuService;
		
		beforeEach(inject(function (_sudokuService_) {
			sudokuService = _sudokuService_;
		}));
		
		describe('Test init method', function () {
			it('init() should return Object', function () {
				sudokuService.settings.length = 40;
				expect(typeof(sudokuService.init())).toBe('object');
			});
		});
		
		describe('Test testCellValue method', function () {
			it('testCellValue(5) should return boolean', function () {
				sudokuService.init();
				expect(sudokuService.testCellValue(5)).toEqual(jasmine.any(Boolean));
			});
		});
		
		describe('Test getSudoku method', function () {
			it('getSudoku() should return decentralizePazzle', function () {
				sudokuService.init();
				expect(sudokuService.getSudoku()).toEqual(sudokuService.decentralizePazzle);
			});
		});
		
		describe('Test checkSudoku method', function () {
			it('checkSudoku() should return boolean', function () {
				sudokuService.init();
				expect(sudokuService.checkSudoku()).toEqual(jasmine.any(Boolean));
			});
			
			it('checkSudoku() should return true', function () {
				sudokuService.settings.length = 81;
				sudokuService.init();
				expect(sudokuService.checkSudoku()).toBe(true);
			});
			
			it('checkSudoku() should return false', function () {
				sudokuService.settings.length = 81;
				sudokuService.init();
				sudokuService.decentralizePazzle[80] = undefined;
				expect(sudokuService.checkSudoku()).toBe(false);
			});
			
			it('checkSudoku() should return false', function () {
				sudokuService.settings.length = 81;
				sudokuService.init();
				sudokuService.decentralizePazzle[80] = sudokuService.decentralizePazzle[80] === 1 ? 2 : 1;
				expect(sudokuService.checkSudoku()).toBe(false);
			});
		});
		
		describe('Test change() method', function () {
			beforeEach(function () {
				sudokuService.init();
			});
			
			it('change(1, 1) should return Object', function () {
				expect(typeof(sudokuService.change(1, 1))).toBe('object');
			});
		});
		
		describe('Test marks() method', function () {
			beforeEach(function () {
				sudokuService.init();
			});
			
			it('marks(undefined, 1) should return Object', function () {
				expect(typeof(sudokuService.marks(undefined, 1))).toBe('object');
			});
			
			it('marks(undefined, 1) and settings.lazyMode is true should return Object', function () {
				sudokuService.settings.lazyMode = true;
				expect(typeof(sudokuService.marks(undefined, 1))).toBe('object');
			});
			
			it('marks(1, 1) should return Object', function () {
				expect(typeof(sudokuService.marks(1, 1))).toBe('object');
			});
		});
	});
});