class UtilsService {
	shuffle(arr) {
		for (let j, x, i = arr.length; i; j = parseInt((Math.random() * i).toString()), x = arr[--i], arr[i] = arr[j], arr[j] = x){}
	};
	
	decentralizeArray(arr) {
		let result = [];
		
		arr.forEach((item) => {
			result = result.concat(item);
		});
		
		return result;
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
	
	testCellValue(arr, value, index) {
		let indexes = this.getIndexesOfBoxArray(index),
			sudoku = this.centralizeBoxArray(arr),
			i = indexes.i,
			j = indexes.j,
			p = 0,
			m = 0,
			squareStartI,
			squareStartJ,
			squareEndI,
			squareEndJ;
		
		// horizontal
		for (; p < 9; p++) {
			if (p === j) continue;
			if (sudoku[i][p] === value) {
				return false;
			}
		}
		
		// vertical
		for (p = 0; p < 9; p++) {
			if (p === i) continue;
			if (sudoku[p][j] === value) {
				return false;
			}
		}
		
		squareStartI = parseInt((i / 3).toString()) * 3;
		squareStartJ = parseInt((j / 3).toString()) * 3;
		squareEndI = squareStartI + 3;
		squareEndJ = squareStartJ + 3;
		
		// square
		for (p = squareStartI; p < squareEndI; p++) {
			for (m = squareStartJ; m < squareEndJ; m++) {
				if (p === i && m === j) continue;
				if (sudoku[p][m] === value) {
					return false;
				}
			}
		}
		
		return true;
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
}

export default UtilsService;
export const name = 'utils';