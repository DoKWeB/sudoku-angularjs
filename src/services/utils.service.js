class UtilsService {
	shuffle(arr) {
		for (let j, x, i = arr.length; i; j = parseInt((Math.random() * i).toString()), x = arr[--i], arr[i] = arr[j], arr[j] = x){}
	};
	
	decentralizeArray(arr) {
		let result = [];
		
		arr.forEach((item) => {
			result = result.concat(item);
		});
		
		return this.replaceZeroToUndefinedInArray(result);
	}
	
	centralizeBoxArray(arr, rowSize = 9) {
		let result = [],
			i = 0,
			j = 0,
			k = 0;
		
		for (; i < rowSize; i++) {
			result[i] = [];
			
			for (j = 0; j < rowSize; j++, k++) {
				result[i][j] = arr[k];
			}
		}
		
		return result;
	}
	
	getIndexesOfBoxArray(index) {
		let i = index / 9 ^ 0,
			j = index - (i * 9);
		
		return { i, j };
	}
	
	replaceZeroToUndefinedInArray(arr) {
		return arr.map((item) => item ? item : undefined);
	}
	
	getEqualsCount(arr) {
		const result = {};
		
		arr.forEach((item) => {
			if (item) {
				if (result[item]) {
					result[item]++;
				} else {
					result[item] = 1;
				}
			}
		});
		
		return result;
	}
	
	pet(number) {
		return number > 9 ? number : "0" + number;
	}
	
	getAllIndexes(arr, val) {
		let indexes = [],
			i = -1;
		
		while ((i = arr.indexOf(val, i + 1)) !== -1){
			indexes.push(i);
		}
		
		return indexes;
	}
	
	uniqueArray(arr) {
		return arr.filter((value, index, self) => self.indexOf(value) === index || value === undefined);
	}
	
	getWord(word, number) {
		return number !== 1 ? word + 's' : word;
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
	
	getHorizontalIndexes(index) {
		let horizontal = [];
		
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
		
		return horizontal;
	}
	
	getVerticalIndexes(index) {
		let vertical = [],
			current = index;
		
		while ((current += 9) <= 80) {
			vertical.push(current);
		}
		current = index;
		while ((current -= 9) >= 0) {
			vertical.push(current);
		}
		
		return vertical;
	}
}

export default UtilsService;
export const name = 'utils';