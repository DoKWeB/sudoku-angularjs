import {name as utilsServiceName} from '../services/utils.service';

class TimeService {
	constructor($interval, utils) {
		this.$interval = $interval;
		this.utils = utils;
		this.timer = null;
		this.time = 0;
	}
	
	start(interval = 1000) {
		this.stop();
		this.time = 0;
		
		this.timer = this.$interval(() => { this.time++; }, interval);
	}
	
	stop() {
		this.timer && this.$interval.cancel(this.timer);
	}
	
	getTime(needPet = false) {
		let hrs = ~~(this.time / 3600),
			mins = ~~((this.time % 3600) / 60),
			secs = this.time % 60,
			result = "";
		
		if (hrs > 0) {
			result += (needPet ? this.utils.pet(hrs) : hrs) + " " + this.utils.getWord('hour', hrs) + ", ";
		}
		
		if (mins > 0) {
			result += (needPet ? this.utils.pet(mins) : mins) + " " + this.utils.getWord('minute', mins) + ", ";
		}
		
		result += (needPet ? this.utils.pet(secs) : secs) + " " + this.utils.getWord('second', secs);
		
		return result;
	}
}
TimeService.$inject = ['$interval', utilsServiceName];

export default TimeService;
export const name = "timeService";