import * as game from "./state-manager.js"

export var	canvas = document.getElementById('canvas'),
			context = canvas.getContext('2d'),
			offscreenCanvas = document.createElement('canvas'),
			offscreenContext = offscreenCanvas.getContext('2d'),

			mouseCoords = false;

var backgroundLoaded = false,
	backgroundImage = new Image(),

	mouseX = 0,
	mouseY = 0,
	offsetX = 0,
	offsetY = 0;

window.addEventListener('resize', resizeCanvas, false);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export function updateBackground(state){
	switch(state){
		case  0:
		case  1:
		case -1:
		case -2:
			drawBackgroundImage();
			break;
		default:
			console.log("switch background default");
	}
}

export function loadBackground(){
	backgroundImage.src = './media/background1.jpg';
	backgroundImage.onload = function(event){
		backgroundLoaded = true;
		drawBackgroundImage(context);
		//aquí quizas deberia hacer una callback function
	}
}

function drawBackgroundImage(){
	if (backgroundLoaded){
		context.save();
		context.translate(-offsetX,-offsetY);
		context.drawImage(backgroundImage, -100, -100, canvas.width*1.2, canvas.height*1.2);
		context.restore();
	}
}

function resizeCanvas(){
	canvas.width =  window.innerWidth;
    canvas.height = window.innerHeight;
    updateBackground(game.getState());
    console.log("se cambia el tamaño: "+ canvas.width);
}

function windowToCanvas(x, y) { 
	var bbox = canvas.getBoundingClientRect();
	return {x: x - bbox.left * (canvas.width  / bbox.width),
			y: y - bbox.top  * (canvas.height / bbox.height) };
}

export function backgroundFollorMouse(){
	let  offX = mouseX - canvas.width/2,
		 offY = mouseY - canvas.width/2;
		 offsetX = Math.floor(offX*0.02);
		 offsetY = Math.floor(offY*0.02);
}

export function drawMouseCoords(){
	if (mouseCoords){
		let loc;
		loc = windowToCanvas(mouseX, mouseY);
		updateBackground(game.getState());
	
		let pos_x = loc.x + 20,
			pos_y = loc.y + 30;

		if (loc.x + 200 > canvas.width){
			pos_x = loc.x - 200;
		}
		if (loc.y + 30 > canvas.height) {
			pos_y = loc.y - 30;
		}

		context.save();
		context.font = "20px Arial";
		context.fillStyle = "white";
		context.fillText(`Coords: x:${loc.x} y:${loc.y}`,pos_x, pos_y);
		context.restore();
	}
}

export function toggleDebugMode(){
	if(mouseCoords){
		mouseCoords = false;
		updateBackground(game.getState());
	} else {
		mouseCoords = true;
		drawMouseCoords(mouseX, mouseY);
	}
}

export function updateCoords(event){
		mouseX = event.clientX;
		mouseY = event.clientY;
}

