var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	offscreenCanvas = document.createElement('canvas'),
	offscreenContext = offscreenCanvas.getContext('2d'),
	startButton = document.getElementById("startButton"),
	speedSlider = document.getElementById('speedSlider'),

	paused = true,
	speedInput = 0.3,
	circleRadius = 40,
	approachCircleRadius = 100,
	numberCounter = 1,
	opacityCounter = 0,
	opacitySpeed = 0.1,
	approachSpeed = 1,
	approachCounter = 1,
	ready = true,
	points = [];


var Point = function(x, y){
	this.x = x;
	this.y = y;
}

var circleObject = function(point, color) {
	this.x = point.x;
	this.y = point.y;
	this.color = color;
	this.drawn = false;
	this.done = false;

	this.circleCounter = 0;

	this.drawCircle = function(number, opacity) {
		context.save();
		context.fillStyle = this.color;
		context.strokeStyle = 'black';
		context.lineWidth = 8;
		context.globalAlpha = opacity;

		context.shadowColor = 'rgba(0,0,0,0.5)';
		context.shadowOffsetX = 2;
		context.shadowOffsetY = 2;
		context.shadowBlur = 4;

		//se dibuja primero el contorno
		context.beginPath();
		context.arc(this.x, this.y, circleRadius, 0, Math.PI*2, true);
		context.stroke();

		//luego el llenado pero que solo toque el contorno en 1 pixel
		//si se tocan 1 pixel se ve mejor que si no se tocan nada (quedan pixeles vacios)
		context.beginPath();
		context.shadowColor = 'rgba(0,0,0,0)'; //el fill no debe tener sombra
		context.arc(this.x, this.y, circleRadius-3, 0, Math.PI*2, true);
		context.fill();
		
		context.restore();
		this.drawNumber(number, opacity);
	}

	this.drawNumber = function (number, opacity) {
		context.save();
		context.beginPath();
		context.font = '40px Roboto';
		context.lineWidth = 2;
		context.textAlign = "center";
		context.globalAlpha = opacity;
		context.strokeText(number, this.x, this.y+(circleRadius/3));
		context.fillStyle = 'white';
		context.fillText(number, this.x, this.y+(circleRadius/3));
		context.restore();
	}

	this.drawApproachCircle = function(radius) {
		context.save();
		context.strokeStyle = this.color;
		context.beginPath();
		context.arc(this.x, this.y, radius, 0, Math.PI*2, true);
		context.lineWidth = 2;
		context.stroke();
		context.restore();
	}
}

function updatePoints() {
	points[0].x = Math.random() * (800 - 100) + 100;
	points[0].y = Math.random() * (440 - 100) + 100;
}

function getRandomColor() {
	let code = Math.floor(Math.random()*16777215).toString(16);
	return '#'+ code;
}

function createCircle() {
	if (ready){
		updatePoints();
		circle = new circleObject(points[0], getRandomColor())
		console.log('se crea el círculo');
		ready = false;
	} else if (!circle.drawn) {
		
		if (opacitySpeed*opacityCounter < 1) {
			circle.drawCircle(numberCounter, opacitySpeed*opacityCounter);
			opacityCounter += 1;
			console.log('se dibuja el círculo');

		} else {
			circle.drawCircle(numberCounter, 1);
			opacityCounter = 1;
			circle.drawn = true;
		}

	} else if (!circle.done) {

		if (approachCircleRadius - approachSpeed*approachCounter > circleRadius) {
			circle.drawCircle(numberCounter, 1);
			circle.drawApproachCircle(approachCircleRadius - approachSpeed*approachCounter);
			approachCounter += 1;
			console.log('se dibuja el approach');
			//console.log(`${approachCircleRadius}, ${approachSpeed}, ${approachCounter}`);

		} else {
			circle.drawApproachCircle(circleRadius);
			approachCounter = 1;
			circle.done = true;
		}

	} else {
		numberCounter += 1;
		ready = true;
		console.log('siguiente círculo');
	}
}

function updateSpeeds(speedInput){
	opacitySpeed = 0.05*speedInput; 
	approachSpeed = 2*speedInput;
}

function animate() {

	if (!paused){
		if (numberCounter > 10) numberCounter = 1;
		context.fillRect(0,0, canvas.width, canvas.height);
		createCircle();
		requestAnimationFrame(animate);	

		//console.log(`opacityCounter: ${opacityCounter}, opacidad: ${opacitySpeed*opacityCounter}`);
	}
}

startButton.onclick = function (e) {	
	paused = paused ? false : true;
	if (paused) {
		startButton.value = 'Empezar';
	} else {
		//lastTime_2 = new Date().getTime();
		requestAnimationFrame(animate);
		startButton.value = 'Detener';
	}
}

speedSlider.oninput = function(e) {
	speedInput = parseFloat(e.target.value);
	updateSpeeds(speedInput);
	console.log(speedInput);
}

//inicialización general
//hace un fondo gris
//context.font = '48px Helvetica';
updateSpeeds(0.5);
points[0] = new Point(canvas.width/2, canvas.height/2);
context.fillStyle = 'rgba(230,230,230,1.0)'
context.fillRect(0,0, canvas.width, canvas.height);