describe('Time service', function () {
	beforeEach(angular.mock.module('app'));
	
	describe('Tests', function () {
		let timeService;
		
		beforeEach(inject(function (_timeService_) {
			timeService = _timeService_;
		}));
		
		describe('Test start method', function () {
			let $interval;
			
			beforeEach(inject(function (_$interval_) {
				spyOn(timeService, 'stop');
				$interval = _$interval_;
			}));
			
			it('start() should set time', function () {
				timeService.start();
				expect(timeService.time).toBe(0);
			});
			
			it('start() should set timer', function () {
				timeService.start();
				expect(timeService.timer).not.toBeNull();
			});
			
			it('timer should increment time', function () {
				timeService.start();
				$interval.flush(1000);
				expect(timeService.time).toBe(1);
			});
			
			it('start() should call stop()', function () {
				timeService.start();
				expect(timeService.stop).toHaveBeenCalled();
			});
		});
		
		describe('Test getTime method', function () {
			it('getTime() should return 1 second', function () {
				timeService.time = 1;
				expect(timeService.getTime()).toBe("1 second");
			});
			
			it('getTime() should return 2 seconds', function () {
				timeService.time = 2;
				expect(timeService.getTime()).toBe("2 seconds");
			});
			
			it('getTime() should return 1 minute, 1 second', function () {
				timeService.time = 61;
				expect(timeService.getTime()).toBe("1 minute, 1 second");
			});
			
			it('getTime() should return 2 minutes, 1 second', function () {
				timeService.time = 121;
				expect(timeService.getTime()).toBe("2 minutes, 1 second");
			});
			
			it('getTime() should return 1 hour, 1 minute, 1 second', function () {
				timeService.time = 3661;
				expect(timeService.getTime()).toBe("1 hour, 1 minute, 1 second");
			});
			
			it('getTime() should return 2 hours, 1 minute, 1 second', function () {
				timeService.time = 7261;
				expect(timeService.getTime()).toBe("2 hours, 1 minute, 1 second");
			});
			
			describe('Test call utils service methods', function () {
				beforeEach(function () {
					spyOn(timeService.utils, 'getWord');
					spyOn(timeService.utils, 'pet');
				});
				
				it('getTime() should call utils.getWord', function () {
					timeService.getTime();
					expect(timeService.utils.getWord).toHaveBeenCalled();
				});
				
				it('getTime() should not call utils.pet', function () {
					timeService.getTime();
					expect(timeService.utils.pet).not.toHaveBeenCalled();
				});
				
				it('getTime(true) should call utils.pet', function () {
					timeService.getTime(true);
					expect(timeService.utils.pet).toHaveBeenCalled();
				});
			})
		});
	});
});