import template from './cell.html';
import {name as utilsServiceName} from '../../services/utils.service';
import {name as sudokuServiceName} from '../../services/sudoku.service';

class controller {
	constructor(utils, sudokuService) {
		this.utils = utils;
		this.sudokuService = sudokuService;
	}
	
	changeNumber() {
		let number = this.getNumber(),
			params = {
				number,
				index: this.index
			};
		
		if (number > 0 || number === undefined) {
			this.change(params);
		} else {
			this.cell = undefined;
		}
	}
	
	getNumber() {
		return this.cell ? parseInt(this.cell) : undefined;
	}
	
	preMark() {
		let number = this.getNumber();
		
		this.mark({ number: number, index: this.index });
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
	needMark: '<',
	needErrorMark: '<'
};

export default {
	template,
	controller,
	bindings
};

export const name = "cell";