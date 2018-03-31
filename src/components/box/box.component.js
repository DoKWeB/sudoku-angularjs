import template from './box.html';
import {name as sudokuServiceName} from '../../services/sudoku.service';
import {name as utilsServiceName} from '../../services/utils.service';
import {name as settingsName} from '../../services/settings.service';
import {name as timeServiceName} from '../../services/time.service';

class controller {
	constructor(sudokuService, utils, settings, timeService) {
		this.sudokuService = sudokuService;
		this.utils = utils;
		this.settings = settings;
		this.timeService = timeService;
		
		const pazzles = sudokuService.init();
		
		this.sudoku = pazzles.pazzle;
		this.solution = pazzles.sudoku;
		this.source = this.sudoku.slice();
		this.equalsCount = pazzles.equalsCount;
		this.success = false;
		this.activeValue = undefined;
		this.activeIndex = undefined;
		this.needMark = [];
		
		timeService.start();
	}
	
	mark(number, index) {
		this.activeValue = number;
		this.needMark = this.sudokuService.marks(number, index);
	}
	
	change(number, index) {
		this.equalsCount = this.sudokuService.change(number, index);
		this.checkSudoku();
		this.mark(number, index);
		this.activeIndex = undefined;
	}
	
	checkSudoku() {
		this.success = this.sudokuService.checkSudoku();
		
		if (this.success) {
			this.timeService.stop();
		}
	}
	
	restart() {
		this.settings.length = 0;
	}
	
	getTime() {
		return this.timeService.getTime();
	}
	
	setActiveIndex(index) {
		this.activeIndex = index;
	}
	
	takeHint() {
		let index = this.activeIndex;
		
		if (index !== undefined) {
			this.change(this.solution[index], index);
		}
	}
}
controller.$inject = [sudokuServiceName, utilsServiceName, settingsName, timeServiceName];

const bindings = {
	mode: '<'
};

export default {
	template,
	controller,
	bindings
}

export const name = "box";
