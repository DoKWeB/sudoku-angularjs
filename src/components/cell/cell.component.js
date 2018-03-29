import template from './cell.html';
import {name as utilsServiceName} from '../../services/utils.service';
import {name as sudokuServiceName} from '../../services/sudoku.service';

class controller {
	constructor(utils, sudokuService) {
		this.utils = utils;
		this.sudokuService = sudokuService;
	}
	
	changeNumber() {
		let number = this.cell ? parseInt(this.cell) : undefined,
			params = {
				number,
				index: this.index
			};
		
		this.mark(params);
		this.change(params);
		this.errorMark(number);
	}
	
	errorMark(number) {
		this.needErrorMark = number && !this.sudokuService.testCellValue(this.index);
	}
}
controller.$inject = [utilsServiceName, sudokuServiceName];

const bindings = {
	cell: '<',
	index: '<',
	mark: '&',
	readonly: '<',
	active: '<',
	change: '&',
	needMark: '<'
};

export default {
	template,
	controller,
	bindings
};

export const name = "cell";