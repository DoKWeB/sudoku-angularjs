import {name as utilsServiceName} from '../services/utils.service';
import {name as displayedLengthName} from '../services/displayedLength.service';

class SudokuService {
	constructor(utils, displayedLength) {
		this.utils = utils;
		this.displayedLength = displayedLength;
		
		this.sudoku = [];
		this.candidates = [];
		this.mask = [];
		this.pazzle = [];
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
	
	_testCandidate(i, j) {
		let currentCandidate = this.sudoku[i][j],
			p = 0,
			m = 0,
			squareStartI,
			squareStartJ,
			squareEndI,
			squareEndJ;
		
		for (; p < 9; p++) {
			if (p === j) continue;
			if (this.sudoku[i][p] === currentCandidate) {
				return false;
			}
		}
		
		for (p = 0; p < 9; p++) {
			if (p === i) continue;
			if (this.sudoku[p][j] === currentCandidate) {
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
				if (this.sudoku[p][m] === currentCandidate) {
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
		
		for(; i < this.displayedLength.length; i++) {
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
				
				testResult = this._testCandidate(i, j);
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
		
		return {
			pazzle: this.pazzle,
			sudoku: this.sudoku
		};
	}
	
	restart() {
		this.sudoku = [];
		this.candidates = [];
		this.mask = [];
		this.pazzle = [];
		
		return this.init();
	}
}
SudokuService.$inject = [utilsServiceName , displayedLengthName];

export default SudokuService;
export const name = "sudokuService";