import template from './box.html';
import {name as sudokuServiceName} from '../../services/sudoku.service';
import {name as utilsServiceName} from '../../services/utils.service';
import {name as settingsName} from '../../services/settings.service';
import {name as timeServiceName} from '../../services/time.service';

class controller {
	constructor(sudokuService, utils, settings, timeService, $scope, toastr, toastrConfig, $state) {
		this.sudokuService = sudokuService;
		this.utils = utils;
		this.settings = settings;
		this.timeService = timeService;
		this.toastr = toastr;
		this.$scope = $scope;
		this.toastrConfig = toastrConfig;
		this.$state = $state;
	}
	
	$onInit() {
		const modeLength = this.settings.modes[this.mode];
		
		if (modeLength) {
			this.settings.length = modeLength;
		} else {
			this.$state.go('pageNotFound');
		}
		
		const pazzles = this.sudokuService.init();
		
		this.sudoku = pazzles.pazzle;
		this.solution = pazzles.sudoku;
		this.source = this.sudoku.slice();
		this.equalsCount = pazzles.equalsCount;
		this.errorMarks = pazzles.errorMarks;
		this.success = false;
		this.activeValue = undefined;
		this.activeIndex = undefined;
		this.needMark = [];
		this.hints = 0;
		
		this.timeService.start();
		
		this.$scope.$watch('$ctrl.settings.lazyMode', () => {
			let val = this.activeValue,
				index = this.activeIndex;
			
			if (val && index) {
				this.mark(val, index);
			} else if (val) {
				this.mark(val, this.sudoku.indexOf(val));
			}
		});
		
		angular.extend(this.toastrConfig, {
			closeButton: true,
			extendedTimeOut: 1000,
			progressBar: true,
			timeOut: 5000,
			positionClass: 'toast-bottom-right'
		});
	}
	
	mark(number, index) {
		this.activeValue = number;
		this.activeIndex = index;
		this.needMark = this.sudokuService.marks(number, index);
	}
	
	change(number, index) {
		this.equalsCount = this.sudokuService.change(number, index);
		this.checkSudoku();
		this.mark(number, index);
	}
	
	checkSudoku() {
		this.success = this.sudokuService.checkSudoku();
		
		if (this.success) {
			this.timeService.stop();
		}
	}
	
	getTime() {
		return this.timeService.getTime();
	}
	
	takeHint() {
		let index = this.activeIndex,
			val = this.solution[index];
		
		this.change(val, index);
		this.hints++;
		this.toastr.success('-1 hint');
	}
	
	getHinstPhrase() {
		let hints = this.settings.hints - this.hints;
		
		return hints + ' hint' + (hints === 1 ? ' is' : 's are') + ' available from ' + this.settings.hints;
	}
}
controller.$inject = [sudokuServiceName, utilsServiceName, settingsName, timeServiceName, '$scope', 'toastr', 'toastrConfig', '$state'];

const bindings = {
	mode: '<'
};

export default {
	template,
	controller,
	bindings
}

export const name = "box";
