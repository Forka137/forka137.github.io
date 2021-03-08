var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	offscreenCanvas = document.createElement('canvas'),
	offscreenContext = offscreenCanvas.getContext('2d'),
	speedSlider = document.getElementById('speedSlider'),
	r2Slider = document.getElementById('r2Slider'),
	r3Slider = document.getElementById('r3Slider'),
	fpsSlider = document.getElementById('fpsSlider'),
	speedOutput = document.getElementById('speedOutput'),
	r2Output = document.getElementById('r2Output'),
	r3Output = document.getElementById('r3Output'),

	counter_i = 0,
	delta = 0.16,
	speed = 1,
	paused = true,
	lengthError = false,
	lastTime = 0,
	now_2 = 0,
	lastTime_2 = 0,
	fps = 0,
	fps_input = 1,
	fps_counter = 1,
	fps_actual = 0,
	animateButton = document.getElementById("animateButton"),
	frameRate = document.getElementById("frameRate"),
	frameRate_2 = document.getElementById("frameRate2"),
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
//la razón por la cual se resta en la componente y
//es por que el eje Y es positivo hacia abajo

function evaluateVariables(){
	theta3 = Math.asin((r4 - r2*Math.sin(theta2))/r3);

	if (r2 + r4 > r3) {
		paused = true;
		animateButton.value = 'Animar';
		drawError();
	}
}

function calculateFpsMax() {
	var now = new Date().getTime();
	fps = 1000 / (now - lastTime);

	lastTime = now;

	if (fps_2 < 300){
	fps_actual = fps_input*fps_2;
	}
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
	context.beginPath(); //esto soluciona el error del rastro que quedaba detrás que raro
	//supongo que todos los dibujos deben empezar con un beginPath, o sino queda algo detrás
	context.shadowColor = 'rgba(0,0,0,0.5)';
	context.shadowOffsetX = 2;
	context.shadowOffsetY = 2;
	context.shadowBlur = 4;
	context.lineWidth = 2;
	context.rect(startX - r2 + r3-10, startY - r4 + rectH/2 + 2, r2+r3-100, r4 - rectH/2);
	context.lineWidth = 2;
	context.stroke();
	context.fillStyle = 'linen';
	context.fillRect(startX - r2 + r3-10, startY - r4 + rectH/2 + 2, r2+r3-100, r4 - rectH/2);
	context.restore();
	//los -10 y -100 de los rectángulos son solo ajustes al ojo para que quede mejor
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

function drawError() {
	context.save();
	context.font = '32px Helvetica';
	context.fillStyle = 'red';
	context.textAlign = 'center';
	context.fillText("Largos Incompatibles", canvas.width/2, 100+canvas.height/2);
	context.fillStyle = 'black';
	context.fillText("R2 + base > R3", canvas.width/2, 150+canvas.height/2);
	context.fillText(`(${r2} + ${r4} > ${r3})`, canvas.width/2, 200+canvas.height/2);
	context.font = '22px Helvetica';
	context.fillText(`(${r2+r4} > ${r3})`, canvas.width/2, 230+canvas.height/2);
	context.restore();
}


function drawFps() {
	context.save();
	context.fillStyle = 'cornflowerblue';
	context.fillText(fps.toFixed() + ' fps', 20, 60);
	context.restore();
}

//no me gustó que se actualice tan rápido, 
//mejor la función setInterval para obtener su valor.
function updateFps() {
	if (!paused){
		frameRate.innerText = "FPS Max: " + fps.toFixed(1);
		frameRate2.innerText = "FPS Actual: " + fps_actual.toFixed(1);
	} else {
		frameRate.innerText = "FPS Max: 0";
		frameRate2.innerText = "FPS Actual: 0";
	}
	//console.log(r2+r3);
}

function updateText () {
	text = parseFloat(speed).toFixed(1);
	speedOutput.innerText = text;
	r2Output.innerText = r2;
	r3Output.innerText = r3;
	//fpsOutput.innerText = fps_input;
}

function windowToCanvas(x, y) { 
	var bbox = canvas.getBoundingClientRect();
	return {x: x - bbox.left * (canvas.width  / bbox.width),
			y: y - bbox.top  * (canvas.height / bbox.height) };
}

function animate() {
	if (!paused) {
		//esto realiza el movimiento
		now_2 = new Date().getTime();
		delta = (now_2 - lastTime_2)/100;
		fps_2 = 1000 / (now_2 - lastTime_2);
		
		//context.clearRect(0,0, canvas.width, canvas.height);
		if (theta2 > 16*Math.PI){						 	
			theta2 = 0;
			//esto solo es para evitar que theta2 se vaya al infinito
		} else {
			theta2 += (Math.PI/180)*speed*delta*6.25;
			//el delta hace que sin importar los fps, el objeto se mueva a la misma velocidad.
		}
		//esto realiza el dibujo por frame.
		//solo se dibuja cuando el fps_counter alcanza el entero siguiente
		//si no lo alcanza, no se dibuja el frame.
		if (Math.floor(fps_counter) == counter_i){
			context.fillRect(0,0, canvas.width, canvas.height);
			evaluateVariables();
			updatePoints();

			drawPistonBase();
			drawPiston();
			drawLines();
			drawjoints();

			counter_i += 1;
		} 

		if (fps_counter < Math.round(fps_input*fps_2)){
			//los fps fraccionados se iran sumando hasta que sean menor que la cantidad total indicada
			//en este caso una fracción de los fps máximos.
			fps_counter += fps_input;

		} else {
			// si se alcanza la fracción de frames necesaria, se reinician los contadores.
			counter_i = 0;
			fps_counter = 0;
		}	

	requestAnimationFrame(animate);
	calculateFpsMax();
	lastTime_2 = now_2;
	//console.log(`sum: ${fps_counter}, frame counter: ${counter_i}`);
	} 
}

function updateFrame() {
 //actualiza el dibujo en 1 frame
context.fillStyle = 'rgba(230,230,230,1.0)'
context.fillRect(0,0, canvas.width, canvas.height);
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
}

//event handler

animateButton.onclick = function (e) {
	paused = paused ? false : true;
	if (paused) {
		animateButton.value = 'Animar';
	} else {
		lastTime_2 = new Date().getTime();
		requestAnimationFrame(animate);
		animateButton.value = 'Detener';
	}
}

speedSlider.oninput = function(e) {
	speed = parseFloat(e.target.value);
	updateText();
}

fpsSlider.oninput = function(e) {
	fps_input = parseFloat(e.target.value);
	updateText();
}

r2Slider.oninput = function(e) {
	r2 = parseInt(e.target.value);
	updateText();
	if (paused) {
	updateFrame();
	}
}
r3Slider.oninput = function(e) {
	r3 = parseInt(e.target.value);
	updateText();
	if (paused) {
	updateFrame();
	}
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