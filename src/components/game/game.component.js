import template from './game.html';
import {name as displayedLengthName} from '../../services/displayedLength.service';

class controller {
	constructor(displayedLength) {
		this.displayedLength = displayedLength;
	}
	
	start(length) {
		this.displayedLength.length = length;
	}
	
	veryEasy() {
		this.mode = 'very easy';
		this.start(70);
	}
	
	easy() {
		this.mode = 'easy';
		this.start(50);
	}
	
	medium() {
		this.mode = 'medium';
		this.start(40);
	}
	
	hard() {
		this.mode = 'hard';
		this.start(30);
	}
}
controller.$inject = [displayedLengthName];

export default {
	template,
	controller
};

export const name = "game";