import * as canvasManager from "./canvas-manager.js"
import * as f137 from "./forka-utils.js"

var stopwatch = new f137.Stopwatch();

var playAreaImg = new Image(),
	areImagesLoaded = false,
	isLoading = false,
	gameStarted = false,
	getTime,

	centerLineHeight = 0; // canvas.height*0.13;

export function draw(canvas, context){
	updateGlobalVariables(canvas, context);

	if (areImagesLoaded){
		background(canvas, context);
		playArea(canvas, context);

	} else if (!isLoading) {
		loadImages();
	}

	if (gameStarted == true){
		//nada por ahora
	}
}

export function startGame(){
	//tambien sirve para resumir
	if (gameStarted == false){
		gameStarted = true;
		console.log("Juego iniciado!");
		stopwatch.start();
		getTime = setInterval(function(){
			console.log("Tiempo transcurrido: " + stopwatch.getElapsedTime() + " ms");
		}, 500);
	}
}

export function stopGame(){
	if(gameStarted == true){
		gameStarted = false;
		console.log("Juego Detenido");
		clearInterval(getTime);
		//funciones de reseteo deberían estar aquí
	}
}

export function pauseGame(){
	if(gameStarted == true){
		gameStarted = false;
	}
}

function background(canvas, context){
	// Esta función es temporal
	// luego quiero que se usen imagenes de fondo
	context.save();
	let grad = context.createLinearGradient(0, 0, 0, canvas.height);
	grad.addColorStop(0, "#1A67E5");
	grad.addColorStop(1, "#000000");
	context.fillStyle = grad;
	context.fillRect(0,0, canvas.width, canvas.height);
	context.restore();
}

function playArea(canvas, context){
	let leftBorder = canvas.width*0.15;
	context.save();
	context.drawImage(playAreaImg, leftBorder, 0, canvas.width-leftBorder*2, canvas.height);
	context.restore();
}

function textInputArea(canvas, context){
	context.save();
	context.fillStyle = 'gray';
	context.fillRect(0,0, canvas.width, canvas.height);
	context.restore();
}

function loadImages(){
	isLoading = true;
	playAreaImg.src = './media/play_area2.png'
	let imageArray = [playAreaImg],
		imagesLoaded = 0,
		imageCount = imageArray.length;

	imageArray.forEach(image => {
		image.onload = function(){
			imagesLoaded++;
			if(imagesLoaded == imageCount && !areImagesLoaded) {
				areImagesLoaded = true;
				isLoading = false;
				console.log("Imagenes cargadas");
			}
		}
	});
}

function updateGlobalVariables(canvas, context){
	// a esta distancia de arriba abajo se encuentra el centro del text input
	centerLineHeight = canvas.height*0.13;
}

