import template from './box.html';
import {name as sudokuServiceName} from '../../services/sudoku.service';
import {name as utilsServiceName} from '../../services/utils.service';
import {name as displayedLengthName} from '../../services/displayedLength.service';
import {name as timeServiceName} from '../../services/time.service';

class controller {
	constructor(sudokuService, utils, displayedLength, timeService) {
		this.sudokuService = sudokuService;
		this.utils = utils;
		this.displayedLength = displayedLength;
		this.timeService = timeService;
		
		const pazzles = sudokuService.init();
		
		this.sudoku = utils.replaceZeroToUndefinedInArray(utils.decentralizeArray(pazzles.pazzle));
		this.solution = utils.replaceZeroToUndefinedInArray(utils.decentralizeArray(pazzles.sudoku));
		this.source = this.sudoku.slice();
		this.equalsCount = utils.getEqualsCount(this.sudoku);
		this.success = false;
		this.activeValue = undefined;
		this.needMark = [];
		this.lazyMark = false;
		
		timeService.start();
	}
	
	mark(number, index) {
		this.activeValue = number;
		this.marks(number, index);
	}
	
	marks(number, index) {
		this.needMark = [];
		
		if (!number) {
			return;
		}
		
		if (this.lazyMark) {
			let indexes = this.utils.getAllIndexes(this.sudoku, number);
			
			indexes.forEach((index) => this.doMarks(index));
			this.needMark = this.utils.uniqueArray(this.needMark);
		} else {
			this.doMarks(index);
		}
	}
	
	doMarks(index) {
		let horizontal = [],
			vertical = [],
			current = index;
		
		while ((current += 9) <= 80) {
			vertical.push(current);
		}
		current = index;
		while ((current -= 9) >= 0) {
			vertical.push(current);
		}
		
		if (index >= 0 && index <= 8) {
			this.setHorizontalIndexes(0, 8, index, horizontal);
		} else if (index >= 9 && index <= 17) {
			this.setHorizontalIndexes(9, 17, index, horizontal);
		} else if (index >= 18 && index <= 26) {
			this.setHorizontalIndexes(18, 26, index, horizontal);
		} else if (index >= 27 && index <= 35) {
			this.setHorizontalIndexes(27, 35, index, horizontal);
		} else if (index >= 36 && index <= 44) {
			this.setHorizontalIndexes(36, 44, index, horizontal);
		} else if (index >= 45 && index <= 53) {
			this.setHorizontalIndexes(45, 53, index, horizontal);
		} else if (index >= 54 && index <= 62) {
			this.setHorizontalIndexes(54, 62, index, horizontal);
		} else if (index >= 63 && index <= 71) {
			this.setHorizontalIndexes(63, 71, index, horizontal);
		} else {
			this.setHorizontalIndexes(72, 80, index, horizontal);
		}
		
		this.needMark = this.needMark.concat(horizontal.concat(vertical));
	}
	
	change(number, index) {
		number = number ? parseInt(number) : undefined;
		this.sudoku[index] = number;
		this.equalsCount = this.utils.getEqualsCount(this.sudoku);
		this.checkSudoku();
		this.mark(number, index);
	}
	
	checkSudoku() {
		this.success = this.solution.toString() === this.sudoku.toString();
		
		if (this.success) {
			this.timeService.stop();
		}
	}
	
	restart() {
		this.displayedLength.length = 0;
	}
	
	getTime() {
		return this.timeService.getTime();
	}
	
	setHorizontalIndexes(min, max, current, target) {
		let temp = current;
		
		while ((temp += 1) <= max) {
			target.push(temp);
		}
		temp = current;
		while ((temp -= 1) >= min) {
			target.push(temp);
		}
	}
}
controller.$inject = [sudokuServiceName, utilsServiceName, displayedLengthName, timeServiceName];

const bindings = {
	mode: '<'
};

export default {
	template,
	controller,
	bindings
}

export const name = "box";
