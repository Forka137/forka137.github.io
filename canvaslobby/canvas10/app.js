var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	animateButton = document.getElementById("animateButton"),
	frameRate = document.getElementById("frameRate"),
	sheetSelect = document.getElementById("sheetSelect"),
	idleSheet = new Image(),
	attackASheet = new Image(),
	attackBSheet = new Image(),
	runSheet = new Image(),
	jumpSheet = new Image(),
	idleCells = [
		{left: 0,   top: 0, width: 64, height: 64},
		{left: 64,  top: 0, width: 64, height: 64},
		{left: 128, top: 0, width: 64, height: 64},
		{left: 192, top: 0, width: 64, height: 64},
		{left: 256, top: 0, width: 64, height: 64},
		{left: 320, top: 0, width: 64, height: 64},
		{left: 384, top: 0, width: 64, height: 64},
		{left: 448, top: 0, width: 64, height: 64},
		{left: 512, top: 0, width: 64, height: 64},
	],
	attackACells = [
		{left: 0,   top: 0, width: 64, height: 64},
		{left: 64,  top: 0, width: 64, height: 64},
		{left: 128, top: 0, width: 64, height: 64},
		{left: 192, top: 0, width: 64, height: 64},
		{left: 256, top: 0, width: 64, height: 64},
		{left: 320, top: 0, width: 64, height: 64},
		{left: 384, top: 0, width: 64, height: 64},
	],
	attackBCells = [
		{left: 0,   top: 0, width: 64, height: 64},
		{left: 64,  top: 0, width: 64, height: 64},
		{left: 128, top: 0, width: 64, height: 64},
		{left: 192, top: 0, width: 64, height: 64},
		{left: 256, top: 0, width: 64, height: 64},
	],
	runCells = [
		{left: 0,   top: 0, width: 64, height: 64},
		{left: 64,  top: 0, width: 64, height: 64},
		{left: 128, top: 0, width: 64, height: 64},
		{left: 192, top: 0, width: 64, height: 64},
		{left: 256, top: 0, width: 64, height: 64},
		{left: 320, top: 0, width: 64, height: 64},
		{left: 384, top: 0, width: 64, height: 64},
		{left: 448, top: 0, width: 64, height: 64},
	],
	jumpCells = [
		{left: 0,   top: 0, width: 64, height: 64},
		{left: 64,  top: 0, width: 64, height: 64},
		{left: 128, top: 0, width: 64, height: 64},
		{left: 192, top: 0, width: 64, height: 64},
		{left: 256, top: 0, width: 64, height: 64},
		{left: 320, top: 0, width: 64, height: 64},
		{left: 384, top: 0, width: 64, height: 64},
	],
	paused = true,
	fps = 0,
	lastTime = 0,
	loaded = false;
	
//constructor de sprites

var Sprite = function (name, painter, behaviors) {
	if (name !== undefined) 	this.name = name;
	if (painter !== undefined)	this.painter = painter;

	this.top = 0;
	this.left = 0;
	this.width = 64;
	this.height = 64;
	this.velocityX = 0;
	this.velocityY = 0;
	this.visible = true;
	this.animating = false;
	this.behaviors =  behaviors || [];

	return this;
}

//funciones del objeto Sprite

Sprite.prototype = {
	paint: function (context) {
		if (this.painter !== undefined && this.visible) {
			this.painter.paint(this, context);
		}
	},

	update: function (context, time) {
		for (let i = 0; i < this.behaviors.length; ++i) {
			this.behaviors[i].execute(this, context, time);
		}
	}
}

//painter de spritesheets

var SpriteSheetPainter = function (cells) {
	this.cells = cells || [];
	this.cellIndex = 0;
}

SpriteSheetPainter.prototype = {
	advance: function () {
		if (this.cellIndex == this.cells.length-1) { 	//-1 para que el largo sea igual al último index
			this.cellIndex = 0;
		} else {
			this.cellIndex++;
		}
	},

	paint: function (sprite, context) {
		let cell = this.cells[this.cellIndex];
		context.drawImage(spritesheet, cell.left, cell.top, cell.width, cell.height,
						  sprite.left, sprite.top, cell.width*3, cell.height*3);
	}
}

animateButton.onclick = function (e) {
	if (loaded){
		paused = paused ? false : true;
		if (paused) {
			animateButton.value = 'Animar';
		} else {
			requestAnimationFrame(animate);
			animateButton.value = 'Detener';
		}
	}
}

sheetSelect.onchange = function(event) {
	if (loaded){
		sprite.painter.cellIndex = 0;
		switch(sheetSelect.value){
			case 'idleSheet':
				spritesheet = idleSheet;
				sprite.painter.cells = idleCells;
				break;

			case 'attackASheet':
				spritesheet = attackASheet;
				sprite.painter.cells = attackACells;
				break;

			case 'attackBSheet':
				spritesheet = attackBSheet;
				sprite.painter.cells = attackBCells;
				break;

			case 'runSheet':
				spritesheet = runSheet;
				sprite.painter.cells = runCells;
				break;

			case 'jumpSheet':
				spritesheet = jumpSheet;
				sprite.painter.cells = jumpCells;
				break;

			default:
				spritesheet = idleSheet;
				sprite.painter.cells = idleCells;
		}
		context.fillRect(0,0, canvas.width, canvas.height);
		context.drawImage(spritesheet, canvas.width/2 - spritesheet.width/2, 0);
		sprite.paint(context);
	}
}

function calculateSpriteFps() {
// 	var now = new Date().getTime();
// 	fps = 1000 / (now - lastTime);

// 	lastTime = now;
	fps = pageCounter;
	}

function updateFps() {
	if (!paused){
		frameRate.innerText = "FPS: " + fps.toFixed(1);
	} else {
		frameRate.innerText = "FPS: 0";
	}
	pageCounter = 0;
}

var sprite = new Sprite('monito', new SpriteSheetPainter(idleCells)),
interval,
pageCounter = 0,  //se usa para los fps del sprite
lastAdvance = 0,
pageflipInterval = 120;

function animate(time){
	if (!paused) {
		context.fillRect(0,0, canvas.width, canvas.height);
		context.drawImage(spritesheet, canvas.width/2 - spritesheet.width/2, 0);
		sprite.paint(context);
		calculateSpriteFps();

		if(time - lastAdvance > pageflipInterval) {
			sprite.painter.advance();
			lastAdvance = time;
			pageCounter++;
			//console.log('se actualiza');
		}
		requestAnimationFrame(animate);
	}
}


//inicialización general

idleSheet.src = 'images/idlesheet.png';
attackASheet.src = 'images/attackAsheet.png';
attackBSheet.src = 'images/attackBsheet.png';
runSheet.src = 'images/runsheet.png';
jumpSheet.src = 'images/jumpsheet.png';

imageArray = [idleSheet, attackASheet, attackBSheet, runSheet, jumpSheet];

spritesheet = idleSheet; //por defecto

sprite.left = canvas.width/2 - 64; //justo en el centro
sprite.top = 150;

var imageCount = imageArray.length;
var imagesLoaded = 0;

//se asegura de cargar todo antes de dejarte animar
imageArray.forEach(image => {
	image.onload = function() {
		imagesLoaded++;
		if(imagesLoaded == imageCount){
			context.drawImage(spritesheet, canvas.width/2 - spritesheet.width/2, 0);
			sprite.paint(context);
			loaded = true;
        }
	}
});


//solo para cargar una cosa
// spritesheet.onload = function(e) {
// 	context.drawImage(spritesheet, canvas.width/2 - spritesheet.width/2, 0);
// 	sprite.paint(context);
// 	loaded = true;
// }

setInterval(updateFps, 1000);
//hace un fondo gris
//context.font = '48px Helvetica';
context.fillStyle = 'rgba(230,230,230,1.0)'
context.fillRect(0,0, canvas.width, canvas.height);


//si se pone animate(time) esa variable time se ira actualizando cada vez que
//haga una iteración