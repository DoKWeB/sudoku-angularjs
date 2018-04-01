import {name as utilsServiceName} from '../services/utils.service';
import {name as settingsName} from './settings.service';

class SudokuService {
	constructor(utils, settings) {
		this.utils = utils;
		this.settings = settings;
		
		this.sudoku = [];
		this.candidates = [];
		this.mask = [];
		this.pazzle = [];
		this.decentralizeSudoku = [];
		this.decentralizePazzle = [];
		this.errorMarks = [];
	}
	
	_initValues() {
		let i = 0,
			j = 0;
		
		for (; i < 9; i++) {
			this.sudoku[i] = [];
			this.pazzle[i] = [];
			this.candidates[i] = [];
			
			for (j = 0; j < 9; j++) {
				this.candidates[i][j] = [];
			}
		}
		
		for (i = 0; i < 81; i++) {
			this.mask[i] = 0;
		}
	}
	
	_initCandidates() {
		let i = 0,
			j;
		
		for (; i < 9; i++) {
			for (j = 0; j < 9; j++) {
				this._initCandidate(i, j);
			}
		}
	}
	
	_initCandidate(i, j) {
		let k = 0;
		
		for (; k < 9; k++) {
			this.candidates[i][j][k] = k + 1;
		}
		
		this.utils.shuffle(this.candidates[i][j]);
	}
	
	_getCandidate(i, j) {
		let k = 0,
			candidateValue;
		
		for (; k < 9; k++) {
			if (this.candidates[i][j][k] !== 0) {
				candidateValue = this.candidates[i][j][k];
				this.candidates[i][j][k] = 0;
				
				return candidateValue;
			}
		}
		
		return 0;
	}
	
	_testCandidate(sudoku, i, j) {
		let currentCandidate = sudoku[i][j],
			p = 0,
			m = 0,
			squareStartI,
			squareStartJ,
			squareEndI,
			squareEndJ;
		
		for (; p < 9; p++) {
			if (p === j) continue;
			if (sudoku[i][p] === currentCandidate) {
				return false;
			}
		}
		
		for (p = 0; p < 9; p++) {
			if (p === i) continue;
			if (sudoku[p][j] === currentCandidate) {
				return false;
			}
		}
		
		squareStartI = parseInt((i / 3).toString()) * 3;
		squareStartJ = parseInt((j / 3).toString()) * 3;
		squareEndI = squareStartI + 3;
		squareEndJ = squareStartJ + 3;
		
		for (p = squareStartI; p < squareEndI; p++) {
			for (m = squareStartJ; m < squareEndJ; m++) {
				if (p === i && m === j) continue;
				if (sudoku[p][m] === currentCandidate) {
					return false;
				}
			}
		}
		
		return true;
	}
	
	_applyMask() {
		let i = 0,
			j = 0,
			m = 0;
		
		for(; i < this.settings.length; i++) {
			this.mask[i] = 1;
		}
		
		this.utils.shuffle(this.mask);
		
		for(i = 0; i < 9; i++) {
			for(j = 0; j < 9; j++) {
				this.pazzle[i][j] = this.sudoku[i][j] * this.mask[m];
				m++;
			}
		}
	}
	
	testCellValue(index) {
		let indexes = this.utils.getIndexesOfBoxArray(index),
			sudoku = this.utils.centralizeBoxArray(this.decentralizePazzle);
		
		return this._testCandidate(sudoku, indexes.i, indexes.j);
	}
	
	init() {
		let candidateValue,
			i = 0,
			j = 0,
			testResult = false;
		
		this._initValues();
		this._initCandidates();
		
		do {
			do {
				candidateValue = this._getCandidate(i, j);
				this.sudoku[i][j] = candidateValue;
				
				if (candidateValue === 0) {
					this._initCandidate(i, j);
					
					if (j === 0) {
						j = 8;
						i--;
					} else {
						j--;
					}
					
					this.sudoku[i][j] = 0;
					break;
				}
				
				testResult = this._testCandidate(this.sudoku, i, j);
			} while (testResult === false);
			
			if (testResult === true) {
				if (j === 8) {
					j = 0;
					i++;
				} else {
					j++;
				}
			}
		} while (!this.sudoku[8][8]);
		
		this._applyMask();
		this.decentralizeSudoku = this.utils.decentralizeArray(this.sudoku);
		this.decentralizePazzle = this.utils.decentralizeArray(this.pazzle);
		
		return {
			pazzle: this.decentralizePazzle,
			sudoku: this.decentralizeSudoku,
			equalsCount: this.utils.getEqualsCount(this.decentralizePazzle),
			errorMarks: this.errorMarks
		};
	}
	
	getSudoku() {
		return this.decentralizePazzle;
	}
	
	restart() {
		this.sudoku = [];
		this.candidates = [];
		this.mask = [];
		this.pazzle = [];
		this.errorMarks = [];
		
		return this.init();
	}
	
	checkSudoku() {
		return this.decentralizeSudoku.toString() === this.decentralizePazzle.toString();
	}
	
	change(number, index) {
		this.decentralizePazzle[index] = number;
		this.testErrorCell(number, index);
		this.checkErrorMarks();
		
		return this.utils.getEqualsCount(this.decentralizePazzle);
	}
	
	marks(number, index) {
		let needMark = [];
		
		if (!number) {
			return needMark;
		}
		
		if (this.settings.lazyMode) {
			let indexes = this.utils.getAllIndexes(this.decentralizePazzle, number);
			
			indexes.forEach((index) => {
				needMark = needMark.concat(this.doMarks(index));
			});
			
			return this.utils.uniqueArray(needMark);
		}
		
		return this.doMarks(index);
	}
	
	doMarks(index) {
		let horizontal = this.utils.getHorizontalIndexes(index),
			vertical = this.utils.getVerticalIndexes(index);
		
		return horizontal.concat(vertical);
	}
	
	testErrorCell(number, index) {
		if (number && !this.testCellValue(index)) {
			this.errorMarks[index] = true;
			return true;
		}
		
		return false;
	}
	
	checkErrorMarks() {
		Object.keys(this.errorMarks).forEach((index) => {
			if (this.errorMarks[index] === true && (this.decentralizePazzle[index] === undefined || this.testCellValue(index))) {
				delete this.errorMarks[index];
			}
		});
	}
}
SudokuService.$inject = [utilsServiceName , settingsName];

export default SudokuService;
export const name = "sudokuService";