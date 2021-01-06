var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	strokeStyleSelect = document.getElementById('strokeStyleSelect'),
	fillStyleSelect = document.getElementById('fillStyleSelect'),
	sizeSelect = document.getElementById('sizeSelect'),
	fontSelect = document.getElementById('fontSelect'),

	grid_stroke_style = 'lightgray',
	grid_horizontal_spacing = 10,
	grid_vertical_spacing = 10,

	line,
	blinkingInterval,
	blink_time = 1000,
	blink_off = 300,
	mousedown = {},
	fontHeight,
	drawingSurfaceImageData,
	currentImageData;			

TextCursor = function (width, fillStyle, strokeStyle) {
	this.fillStyle = fillStyle || 'rgba(0,0,0,0.5)';
	this.strokeStyle = strokeStyle || 'navy';
	this.width = width || 2;
	this.left = 0;
	this.top = 0;
}

TextCursor.prototype = {
	getHeight: function(context) {
		var h = context.measureText('W').width;
		return h + h/6;
	},

	draw: function(context, left, bottom) {
		context.save();

		this.left = left;	
		this.top = bottom - this.getHeight(context);

		context.beginPath();
		context.rect(this.left, this.top, this.width, this.getHeight(context));

		//context.strokeStyle = this.strokeStyle;
		context.fillStyle = this.fillStyle;
		//context.stroke();
		//se ve mal con stroke y no puedo borrarlo bien
		//le tuve que sumar 2 al get height para borrar la parte de abajo
		context.fill();

		context.restore();
	},

	erase: function (context, imageData) {
		context.putImageData(imageData, 0, 0,
		this.left, this.top,
		this.width+2, this.getHeight(context)+2);
		//2 pixeles extra de ancho (aún no estoy seguro por qué)
		//pero así no deja manchado y no influye mucho más

		//la imagedata de aquí corresponde al canvas antes de clickear la pantalla
		//obtiene lo que sea que haya habido en la posición del cursor
		//y lo vuelve a dibujar
	}
};

var cursor = new TextCursor();

//objeto textline (tipo constructor)
TextLine = function(x, y) {
	this.text = '';
	this.left = x;
	this.bottom = y;
	this.caret = 0; //intercalación
}

//funciones de la clase TextLine
TextLine.prototype = {
	insert: function(text) {
		this.text = this.text.substring(0, this.caret+1) + text +
					this.text.substring(this.caret+1);
		this.caret += text.length;
	},
	//borrar un caracter
	removeCharacterBeforeCaret: function() {
		if (this.caret === 0) {
			return;
		}

		this.text = this.text.substring(0, this.caret-1) +
					this.text.substring(this.caret);

		this.caret--;
	},

	getWidth: function(context) {
		return context.measureText(this.text).width;
	},

	getHeight: function(context) {
		//measureText solo devuelve width
		//se asume que la altura es 1 1/6 del ancho
		var h = context.measureText('W').width;
		return h + h/6;
	},

	draw: function(context) {
		context.save();
		context.textAlign = 'start';
		context.textBaseline = 'bottom';

		context.strokeText(this.text, this.left, this.bottom);
		context.fillText(this.text, this.left, this.bottom);

		context.restore();
	},

	erase: function(context, imageData) {
		context.putImageData(imageData, 0, 0);
		//borra el string anterior puesto en la pantalla
		//por lo que cada vez que escribes una letra
		//dibuja un string nuevo más largo
	}
};


//funciones

//genera lineas horizontales tipo cuaderno
function drawBackground() {
	var step_y = 12,
		top_margin = step_y * 4,
		left_margin = step_y * 3,
		i = context.canvas.height;

	context.strokeStyle = 'lightgray';
	context.lineWidth = 0.5;
	//lineas horizontales
	//las construye de abajo hacia arriba hasta que llegue al top_margin
	while (i > top_margin) {
		context.beginPath();
		context.moveTo(0,i);
		context.lineTo(context.canvas.width, i);
		context.stroke();
		i -= step_y;
	}

	//una sola línea vertical
	context.strokeStyle = 'rgba(200,0,0,0.5)';
	context.lineWidth = 1;
	context.beginPath();
	context.moveTo(left_margin,0);
	context.lineTo(left_margin, context.canvas.height);
	context.stroke();
}

//convierte la posición x,y del mouse (global) en coordenadas x,y del canvas
function windowToCanvas(x, y) { 
	var bbox = canvas.getBoundingClientRect();
	return {x: x - bbox.left * (canvas.width  / bbox.width),
			y: y - bbox.top  * (canvas.height / bbox.height) };
}

//devuelve un pantallazo del canvas (en imágen)
function saveDrawingSurface() {
	drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreDrawingSurface() {
	context.putImageData(drawingSurfaceImageData, 0, 0);
}

function setFont() {
	context.font = sizeSelect.value + 'px ' + fontSelect.value;
}

function blinkCursor(x, y) {
	clearInterval(blinkingInterval);
	blinkingInterval = setInterval( function (e) {
		cursor.erase(context, currentImageData);

		setTimeout( function (e) {
			if (cursor.left == x &&									
				cursor.top + cursor.getHeight(context) == y) {
				cursor.draw(context, x, y);
			}
		}, 300);
	}, 1000);
}

function moveCursorAndDrawLine(x, y, sameLine) {
	sameLine = sameLine || false;
	if (sameLine) {
	//si el cursor está en la misma linea, borrara el cursor
	//reemplazando con el rectángulo del imageData anterior
			cursor.erase(context, drawingSurfaceImageData);
	} else {
		//si el cursor se va a otra linea, reemplazará
		//lo que estaba debajo con el imageData actual
			cursor.erase(context, currentImageData);
	}
	
	saveDrawingSurface();
	context.save();
	setShadow();
	line.draw(context);
	//necesito hacer esto para que la sombra solo se aplique
	//a las letras y no al cursor
	context.restore();
	currentImageData = context.getImageData(0, 0, canvas.width, canvas.height);
	cursor.draw(context, x, y);
	blinkCursor(x, y);
}

function showBoxSize(x, y){
	let radius = Math.abs(x - mousedown.x) + parseInt(widthSelect.value);
	context.save();
	context.font = "20px Arial";
	context.strokeStyle = "black";
	context.fillText(`R:${radius}`,x+10 , y+20);
	context.restore();
}

function setShadow(){
	context.shadowColor = 'rgba(0,0,0,0.5)';
	context.shadowOffsetX = 1;
	context.shadowOffsetY = 1;
	context.shadowBlur = 2;
}

function updateText(){
	if (line) {
		context.lineWidth = Math.floor(sizeSelect.value/16);
		context.save();
		line.erase(context, drawingSurfaceImageData);
		moveCursorAndDrawLine(line.left + line.getWidth(context), line.bottom, true);
		context.restore();
	}
}
//event handlers

canvas.onmousedown = function(event) {
	var loc = windowToCanvas(event.clientX, event.clientY);
		fontHeight = context.measureText('W').width;
	
	fontHeight += fontHeight/6;
	mousedown.x = loc.x;									//guarda la posición en el momento que hice click
	mousedown.y = loc.y;
	line = new TextLine(mousedown.x, mousedown.y);
	moveCursorAndDrawLine(mousedown.x, mousedown.y);

	//debug
	//console.log("mousedown");
	//console.log(`posición real x:${event.clientX} y:${event.clientY}`)
	//console.log(`posición relativa x:${loc.x} y:${loc.y}`)
}

//botones del html

strokeStyleSelect.onchange = function(event) {
	context.strokeStyle = strokeStyleSelect.value;
	updateText();
}

sizeSelect.onchange = function(event) {
	setFont();
	updateText();
}

fontSelect.onchange = function(event) {
	setFont();
	updateText();
}

fillStyleSelect.onchange = function(event) {
	context.fillStyle = fillStyleSelect.value;
	updateText();
}

//handlers para el teclado

document.onkeydown = function (e) {
	if (e.keyCode === 8 || e.keyCode === 13) {
		//8 es el backspace y 13 es el enter
		e.preventDefault();
	}

	if (e.keyCode === 8) {
		context.save();

		line.erase(context, drawingSurfaceImageData);
		line.removeCharacterBeforeCaret();
		moveCursorAndDrawLine(line.left + line.getWidth(context), line.bottom, true);
		context.restore();

	}
}

document.onkeypress = function (e) {
	var key = String.fromCharCode(e.which);

	if (e.keyCode !== 8 && !e.ctrlKey && !e.metaKey) {
		e.preventDefault();

		context.save();
		line.erase(context, drawingSurfaceImageData);
		//borra el último string
		line.insert(key);
		//actualiza el string de this.text;
		moveCursorAndDrawLine(line.left + line.getWidth(context), line.bottom, true);
		//dibuja el nuevo string con un fill y stroke.
		context.restore();
	}
}
//inicio


drawBackground();
context.strokeStyle = strokeStyleSelect.value;	
context.fillStyle = fillStyleSelect.value;
context.lineWidth = Math.floor(sizeSelect.value/16);
setFont();
saveDrawingSurface();
currentImageData = drawingSurfaceImageData;
updateText();
//cada vez que se usa moveCursorAndD(); esta función hace un saveDrawing();
//lo que significa que guarda el estado del canvas justo después de borrar el cursor con cursor.erase();

//al hacer un keystroke, se borra 