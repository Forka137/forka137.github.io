var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	offscreenCanvas = document.createElement('canvas'),
	offscreenContext = offscreenCanvas.getContext('2d'),

	paused = true,
	disc = null,
	lastTime = 0,
	fps = 0,
	discs = [
		{
			x: 150,
			y: 250,
			lastX: 150,
			lastY: 250,
			velocityX: -3.2,
			velocityY: 3.5,
			radius: 25,
			color: 'rgba(255,255,0,1)',
			strokeStyle: 'gray'
		},

		{
			x: 50,
			y: 150,
			lastX: 50,
			lastY: 150,
			velocityX: 2.8,
			velocityY: 2.5,
			radius: 30,
			color: 'rgba(100,145,230,1.0)',
			strokeStyle: 'blue'
		},

		{
			x: 150,
			y: 75,
			lastX: 150,
			lastY: 75,
			velocityX: 1.8,
			velocityY: 1.2,
			radius: 50,
			color: 'rgba(255,0,0,1.0)',
			strokeStyle: 'orange'
		},

		{
			x: 100,
			y: 300,
			lastX: 100,
			lastY: 300,
			velocityX: 4,
			velocityY: 2,
			radius: 35,
			color: 'rgba(0,255,0,1.0)',
			strokeStyle: 'gray'
		}
	],
	numDiscs = discs.length,
	animateButton = document.getElementById("animateButton"),
	frameRate = document.getElementById("frameRate");

//funciones

function update() {

	for (let i=0; i < numDiscs; i++) {
		disc = discs[i];

		//colisiones con los bordes
		if (disc.x + disc.velocityX + disc.radius >
				context.canvas.width ||
				disc.x + disc.velocityX - disc.radius < 0) {
			disc.velocityX = -disc.velocityX;
		}

		if (disc.y + disc.velocityY + disc.radius >
				context.canvas.height ||
				disc.y + disc.velocityY - disc.radius < 0) {
		disc.velocityY = -disc.velocityY;
		}
		disc.x += disc.velocityX;
		disc.y += disc.velocityY;
	}
}

function calculateFps() {
	var now = new Date().getTime();
	fps = 1000 / (now - lastTime);

	lastTime = now;
}

function draw() {
	for (let i=0; i < numDiscs; i++) {
		disc = discs[i];
		context.save();
		context.beginPath();
		context.arc(disc.x, disc.y, disc.radius, 0, Math.PI*2, false);
		context.fillStyle = disc.color;
		context.strokeStyle = disc.strokeStyle;
		context.fill();
		context.stroke();
		context.restore();
	}
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
function windowToCanvas(x, y) { 
	var bbox = canvas.getBoundingClientRect();
	return {x: x - bbox.left * (canvas.width  / bbox.width),
			y: y - bbox.top  * (canvas.height / bbox.height) };
}

function animate(time) {
	if (!paused) {
		//context.clearRect(0,0, canvas.width, canvas.height);
		context.fillRect(0,0, canvas.width, canvas.height);
		update();
		draw();
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
// requestAnimationFrame() deja al navegador elegir el Frame Rate.
// esta función se supone que se ajusta al refresco de la pantalla (si es que puede)
// si se quieren fps variables se debe recurrir a otros métodos

//inicialización 
context.font = '48px Helvetica';
context.fillStyle = 'rgba(230,230,230,1.0)'
context.fillRect(0,0, canvas.width, canvas.height);
setInterval(updateFps, 1000);

for (let i=0; i < numDiscs; i++) {
	disc = discs[i];
	context.save();
	context.beginPath();
	context.arc(disc.x, disc.y, disc.radius, 0, Math.PI*2, false);
	context.fillStyle = disc.color;
	context.strokeStyle = disc.strokeStyle;
	context.fill();
	context.stroke();
	context.restore();
}