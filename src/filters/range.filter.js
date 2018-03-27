export default () => (input, total) => {
	total = parseInt(total);
	
	for (let i = 1; i <= total; i++) {
		input.push(i);
	}
	
	return input;
};

export const name = "range";