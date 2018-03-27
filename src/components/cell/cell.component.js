import template from './cell.html';

class controller {
	changeNumber() {
		let params = {
			number: this.cell,
			index: this.index
		};
		
		this.mark(params);
		this.change(params);
	}
}

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