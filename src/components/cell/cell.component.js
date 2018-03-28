import template from './cell.html';
import {name as utilsServiceName} from '../../services/utils.service';

class controller {
	constructor(utils) {
		this.utils = utils;
	}
	
	changeNumber() {
		let params = {
			number: this.cell,
			index: this.index
		};
		
		this.mark(params);
		this.change(params);
		this.errorMark();
	}
	
	errorMark() {
		let value = this.cell ? parseInt(this.cell) : undefined;
		
		this.needErrorMark = value && !this.utils.testCellValue(this.sudoku, value, this.index);
	}
}
controller.$inject = [utilsServiceName];

const bindings = {
	cell: '<',
	index: '<',
	mark: '&',
	readonly: '<',
	active: '<',
	change: '&',
	needMark: '<',
	sudoku: '<'
};

export default {
	template,
	controller,
	bindings
};

export const name = "cell";