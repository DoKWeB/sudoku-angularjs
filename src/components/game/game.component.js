import template from './game.html';
import {name as settingsName} from '../../services/settings.service';

class controller {
	constructor(settings) {
		this.settings = settings;
	}
	
	start(length) {
		this.settings.length = length;
	}
	
	restart() {
		this.settings.length = 0;
	}
	
	forTestOnly() {
		this.mode = 'test';
		this.start(80);
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
controller.$inject = [settingsName];

export default {
	template,
	controller
};

export const name = "game";