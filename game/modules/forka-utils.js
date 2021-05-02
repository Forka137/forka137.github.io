//funciones multipropósito

//mide el tiempo en milisegundos
var Stopwatch = function() {};

Stopwatch.prototype = {
	startTime: 0,
	running: false,
	elapsed: undefined,

	start: function() {
		this.startTime = new Date().getTime();
		this.elapsedTime = undefined;
		this.running = true;
	},

	stop: function() {
		this.elapsed = (new Date().getTime()) - this.startTime;
		this.running = false;
	},

	getElapsedTime: function () {
		if (this.running) {
			return (new Date().getTime()) - this.startTime;
		} else {
			return this.elapsed;
		}
	},

	isRunning: function() {
		return this.running;
	},

	reset: function () {
		this.elapsed = 0;
	}
}
export {Stopwatch};