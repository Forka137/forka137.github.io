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

function loadJSON(callback, filename) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', `./songs/${filename}.json`, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {

            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);

        }
    }
    xobj.send(null);
}

// se llama con una función asi
/*loadJSON(function(response) {
    let data = JSON.parse(response)
  	// hacer algo con el data

}, 'filename');
*/

export {Stopwatch, loadJSON};