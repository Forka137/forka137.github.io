var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	offscreenCanvas = document.createElement('canvas'),
	offscreenContext = offscreenCanvas.getContext('2d'),
	speedSlider = document.getElementById('speedSlider'),
	speedOutput = document.getElementById('speedOutput'),

	speed = 1.0,
	paused = true,
	lastTime = 0,
	fps = 0,
	animateButton = document.getElementById("animateButton"),
	frameRate = document.getElementById("frameRate"),
	points = [],
	startX = 250,
	startY = 300,
	theta2 = Math.PI/4,
	theta3,

	r1,
	r2 = 180,
	r3 = 300,
	r4 = 70,

	rectW = 90,
	rectH = 50,
	jointRadius = 5;

//objeto tipo punto
var Point = function(x, y){
	this.x = x;
	this.y = y;
}

//funciones

function updatePoints() {
	points[1].x = points[0].x + r2*Math.cos(theta2);
	points[1].y = points[0].y - r2*Math.sin(theta2);
	points[2].x = points[1].x + r3*Math.cos(theta3);
	points[2].y = points[1].y - r3*Math.sin(theta3);
}

function evaluateVariables(){
	theta3 = Math.asin((r4 - r2*Math.sin(theta2))/r3);
}

function calculateFps() {
	var now = new Date().getTime();
	fps = 1000 / (now - lastTime);

	lastTime = now;
}

function drawLines() {
	//lineas del mecanismo
	context.save();
	context.beginPath();
	context.moveTo(points[0].x, points[0].y);
	context.lineTo(points[1].x, points[1].y);
	context.lineTo(points[2].x, points[2].y);
	context.lineWidth = 4;
	context.lineCap = 'round';
	context.miterLimit = 1;
	context.stroke();
	context.restore();
}

function drawPistonBase() {
	//rectángulo base
	context.save();
	context.shadowColor = 'rgba(0,0,0,0.5)';
	context.shadowOffsetX = 2;
	context.shadowOffsetY = 2;
	context.shadowBlur = 4;
	context.lineWidth = 2;
	context.rect(startX - r2 + r3, startY - r4 + rectH/2 + 2, 350, r4 - rectH/2);
	context.lineWidth = 2;
	context.stroke();
	context.fillStyle = 'linen';
	context.fillRect(startX - r2 + r3, startY - r4 + rectH/2 + 2, 350, r4 - rectH/2);
	context.restore();
}

function drawPiston(){
	context.save();
	context.beginPath();
	context.shadowColor = 'rgba(0,0,0,0.5)';
	context.shadowOffsetX = 2;
	context.shadowBlur = 4;
	context.lineWidth = 2;
	context.strokeRect(points[2].x - rectW/2, points[2].y - rectH/2, rectW, rectH);
	context.fillStyle = 'cornflowerblue';
	context.fillRect(points[2].x - rectW/2, points[2].y - rectH/2, rectW, rectH);
	context.restore();
}

function drawjoints() {
	context.save();
	context.fillStyle = 'black';
	for (let i=0; i < points.length; i++) {
	context.beginPath();
	context.arc(points[i].x, points[i].y, jointRadius, 0, Math.PI*2, true);
	context.fill();
	}
	context.restore();
}

/*
function drawFps() {
	context.save();
	context.fillStyle = 'cornflowerblue';
	context.fillText(fps.toFixed() + ' fps', 20, 60);
	context.restore();
}
*/
//no me gustó que se actualice tan rápido, 
//mejor la función setInterval para obtener su valor.
function updateFps() {
	if (!paused){
		frameRate.innerText = fps.toFixed(1) + " fps";	
	} else {
		frameRate.innerText = "0 fps";
	}
	
}

function updateText () {
	text = parseFloat(speed).toFixed(1);
	speedOutput.innerText = text;
}

function windowToCanvas(x, y) { 
	var bbox = canvas.getBoundingClientRect();
	return {x: x - bbox.left * (canvas.width  / bbox.width),
			y: y - bbox.top  * (canvas.height / bbox.height) };
}

function animate(time) {
	if (!paused) {
		//context.clearRect(0,0, canvas.width, canvas.height);
		context.fillRect(0,0, canvas.width, canvas.height);
		if (theta2 > 16*Math.PI){
			theta2 = 0;
		} else {
			theta2 += (Math.PI/180)*speed;
		}
		evaluateVariables();
		updatePoints();

		drawPistonBase();
		drawPiston();
		drawLines();
		drawjoints();

		calculateFps();
		requestAnimationFrame(animate);
	}
}

//event handler

animateButton.onclick = function (e) {
	paused = paused ? false : true;
	if (paused) {
		animateButton.value = 'Animar';
	} else {
		requestAnimationFrame(animate);
		animateButton.value = 'Detener';
	}
}

speedSlider.oninput = function(e) {
	speed = e.target.value;
	updateText();
}
// requestAnimationFrame() deja al navegador elegir el Frame Rate.
// esta función se supone que se ajusta al refresco de la pantalla (si es que puede)
// si se quieren fps variables se debe recurrir a otros métodos

//inicialización general
context.font = '48px Helvetica';
context.fillStyle = 'rgba(230,230,230,1.0)'
context.fillRect(0,0, canvas.width, canvas.height);
setInterval(updateFps, 1000);

//inicialización de puntos
evaluateVariables();
	points[0] = new Point(startX, startY);
	points[1] = new Point(startX + r2*Math.cos(theta2),
						  startY - r2*Math.sin(theta2));
	points[2] = new Point(startX + r2*Math.cos(theta2) + r3*Math.cos(theta3),
						  startY - r2*Math.sin(theta2) - r3*Math.sin(theta3));
drawPistonBase();
drawPiston();
drawLines();
drawjoints();