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
	queueIndex = 0,
	queueLength = 0,
	getTime,
	jsonData,
	lastTime = 0,
	nowTime = 0,
	fontSize = 50,

	lyricsArray = [],
	cSpeed = 0.35,

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
		isSongLoaded = false;
		queueIndex = 0;
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
	song.src = "https://cdn.discordapp.com/attachments/650603323296317461/839950727442464828/Evangelion_Fly_Me_To_The_Moon.ogg";
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
		let space = 1.1;
		console.log("ahora se cargan las lyrics");

		queueLength = data.lyricMap.length;

		for(let i = 0; i < queueLength; i++){
			lyricsArray[i] = new TextLyric(space, data.lyricMap[i].lyric, data.lyricMap[i].time-20000);
			space = space + 0.2;
			if (space > 4.4) {
				space = 1.1;
			}
		}
		console.log(lyricsArray);
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
	this.y = 2000; 
	this.lyric = lyric;
	this.hitTime = hitTime;
	this.available = true;
}

TextLyric.prototype = {
	updatePos: function(canvas, context) {
		this.x = canvas.width*0.15*this.leftPos;
		this.y = canvas.height*0.13 - cSpeed * (stopwatch.getElapsedTime() - this.hitTime);
	},

	draw: function(canvas, context) {
		if (this.available){
			if (this.y < canvas.height && this.y > 0) {
			drawText(canvas, context, this.lyric, this.x, this.y);

			} else if (this.y < 0){
				queueIndex++;
				this.available = false;
			}
		}
	}		
}

function scrollText(canvas, context){
	let supIdx = 10 + queueIndex;

	if ((queueIndex + 10) > queueLength) {
		supIdx = queueLength;
	}

	for (let i = queueIndex; i < supIdx; i++){
		lyricsArray[i].updatePos(canvas, context);
		lyricsArray[i].draw(canvas, context);
	}
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