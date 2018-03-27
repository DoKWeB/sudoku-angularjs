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