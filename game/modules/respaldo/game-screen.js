import * as canvasManager from "./canvas-manager.js"
import * as f137 from "./forka-utils.js"

var stopwatch = new f137.Stopwatch();

var playAreaImg = new Image(),
	song = new Audio(),
	areImagesLoaded = false,
	isSongLoaded = false,
	songDuration = 0,
	isLoading = false,
	gameStarted = false,
	isQueueReady = false,
	getTime,
	jsonData,
	lastTime = 0,
	nowTime = 0,
	fontSize = 50,

	lyricsArray,
	cSpeed = 1000,
	cSpeedLast = 0,
	lastHitTime = 0, 

	canvasWidth = 0,
	canvasHeight = 0,
	centerLineHeight = 0; // canvas.height*0.13;

export function draw(canvas, context){
	updateGlobalVariables(canvas, context);

	if (areImagesLoaded){
		background(canvas, context);
		playArea(canvas, context);

	} else if (!isLoading) {
		isLoading = true;
		loadImages();
	}

	if (isQueueReady == true){
			scrollText(canvas, context);
	}
}

export function startGame(songName){
	if (gameStarted == false){
		isSongLoaded = false;
		gameStarted = true;

		loadSong(function(){
			if (isSongLoaded == false){
				isSongLoaded = true;
				lyricQueue(songName);
				console.log("Juego iniciado!");
			}
		}, songName);
	}
}

export function stopGame(){
	if(gameStarted == true){
		gameStarted = false;
		console.log("Juego Detenido");
		clearInterval(getTime);
		song.pause();
		song.currentTime = 0;
		isQueueReady = false;
		//funciones de reseteo deberían estar aquí
	}
}

export function pauseGame(){
	if(gameStarted == true){
		gameStarted = false;
	}
}

export function printCurrentTime(){
	if(stopwatch){
		console.log("F9: " + stopwatch.getElapsedTime());
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
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	fontSize = Math.floor(50*(canvas.width/1920));

	// let now = new Date().getTime();
	// delta = (now - lastTime);
	// lastTime = now;
}

function loadSong(callback, songName){
	console.log("cargando canción:"+songName);
	song = new Audio();
	song.src = `./songs/${songName}/song.ogg`;
	song.addEventListener('loadeddata', () => {
	  songDuration = song.duration;
		console.log("Canción cargada");
		callback();
	});
}

function drawText(canvas, context, text, x, y) {
	context.save();
	context.font = `${fontSize}px Verdana`;
	context.textAlign = 'start';
	context.textBaseline = 'middle';
	context.strokeStyle = 'brown';
	context.fillStyle = 'pink';
	context.strokeText(text, x, y);
	context.fillText(text, x, y);
	context.restore();
}

function lyricQueue(songName){
	f137.loadJSON(function(response){
		let data = JSON.parse(response)
		console.log("ahora se cargan las lyrics");

		//console.log(data.lyricMap.length);
		// antes de hacerlo automático voy a probar que tal funciona
		// de forma manual
		let leftBorder = canvasWidth*0.15;

		var lyric1 = new TextLyric(1.1, 'Fly', 5000),
			lyric2 = new TextLyric(1.5, 'me', 5700),
			lyric3 = new TextLyric(2.0, 'to', 6000),
			lyric4 = new TextLyric(2.5, 'the', 6300),
			lyric5 = new TextLyric(3.0, 'moon', 6800),

			lyric6 = new TextLyric(1.1, 'and', 7770),
			lyric7 = new TextLyric(1.5, 'let', 8000),
			lyric8 = new TextLyric(2.0, 'me', 8300),
			lyric9 = new TextLyric(2.5, 'play', 8700),
			lyric10 = new TextLyric(3.0, 'among', 9900),
			lyric11 = new TextLyric(3.8, 'the', 10300),
			lyric12 = new TextLyric(4.3, 'stars', 10770);

		lyricsArray = [lyric1, lyric2, lyric3, lyric4, lyric5,
					lyric6, lyric7, lyric8, lyric9, lyric10, lyric11, lyric12];

		song.currentTime = 20;			
		song.play();
		stopwatch.start();
		isQueueReady = true;
		getTime = setInterval(function(){
			console.log("Tiempo transcurrido: " + stopwatch.getElapsedTime() + " ms");
		}, 500);

	}, songName);
}

function TextLyric(leftPos, lyric, hitTime) {
	this.leftPos = leftPos;
	this.x = canvasWidth*0.15*this.leftPos;
	this.y = 2000; // por mientras se dibujan afuera
	this.lyric = lyric;
	this.hitTime = hitTime;

	//la razón de este if es causar una velocidad cSpeed que aparente ser igual para todas las palabras
	if (cSpeedLast == 0) {
		this.cSpeed = cSpeed;

	} else {
		this.cSpeed = cSpeedLast*(this.hitTime/lastHitTime);
		
	}
	cSpeedLast = this.cSpeed;
	lastHitTime = this.hitTime;
}

TextLyric.prototype = {
	updatePos: function(canvas, context) {
		this.x = canvas.width*0.15*this.leftPos;
		this.y = canvas.height*0.13 + this.cSpeed*(1 - (stopwatch.getElapsedTime()/this.hitTime));
	},

	draw: function(canvas, context) {
		if (this.y < canvas.height && this.y > 0) {
			drawText(canvas, context, this.lyric, this.x, this.y);
		}
	}
}

function scrollText(canvas, context){
	lyricsArray.forEach(function(lyric){
		lyric.updatePos(canvas, context);
		lyric.draw(canvas, context);
	});
}


// function TextLyric(leftPos, lyric, hitTime) {
// 	this.leftPos = leftPos;
// 	this.hitTime = hitTime;
// 	this.x = canvasWidth*0.15*leftPos;
// 	this.y = canvas.height*0.13 + cSpeed*(hitTime/16.67);
// 	this.lyric = lyric;
// }

// TextLyric.prototype = {
// 	updatePos: function(canvas, context) {
// 		this.x = canvas.width*0.15*this.leftPos;
// 		this.y = this.y - cSpeed;
// 	},

// 	draw: function(canvas, context) {
// 		if (this.y < canvas.height) {
// 			drawText(canvas, context, this.lyric, this.x, this.y);
// 		}
// 	}
// }