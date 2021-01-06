var canvas = document.getElementById('canvas'),
	c = canvas.getContext('2d'),
	eraseAllButton = document.getElementById('eraseAllButton'),
	strokeStyleSelect = document.getElementById('strokeStyleSelect'),
	guidewireCheckbox = document.getElementById('guidewireCheckbox'),
	widthSelect = document.getElementById('widthSelect'),
	drawingSurfaceImageData,
	mousedown = {},														//creación de objetos
	rubberbandRect = {},
	dragging = false,
	guidewires = guidewireCheckbox.checked,
	rubberWidth = 2;

//funciones

//genera lineas verticales con movimiento en x y horizontales con movimiento en y dado un paso.
function drawGrid(c, color, stepx, stepy) {
	c.strokeStyle = color;
	c.lineWidth = 0.5;

	for (i = stepx + 0.5; i < c.canvas.width; i +=stepx){
		c.beginPath();
		c.moveTo(i, 0);
		c.lineTo(i, c.canvas.height);
		c.stroke();
	}

	for (i = stepy + 0.5; i < c.canvas.height; i +=stepy){
		c.beginPath();
		c.moveTo(0, i);
		c.lineTo(c.canvas.width, i);
		c.stroke();
	} 
}
//convierte la posición x,y del mouse (global) en coordenadas x,y del canvas
function windowToCanvas(x, y) { 
	var bbox = canvas.getBoundingClientRect();
	return {x: x - bbox.left * (canvas.width  / bbox.width),
			y: y - bbox.top  * (canvas.height / bbox.height) };
}

//devuelve un pantallazo del canvas (en imágen)
function saveDrawingSurface() {
	drawingSurfaceImageData = c.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreDrawingSurface() {
	c.putImageData(drawingSurfaceImageData, 0, 0);
}

//elásticos

function updateRubberbandRectangle(loc) {
	rubberbandRect.width = Math.abs(loc.x - mousedown.x);
	rubberbandRect.height = Math.abs(loc.y - mousedown.y);

	if (loc.x > mousedown.x) rubberbandRect.left = mousedown.x;
	else					 rubberbandRect.left = loc.x;

	if (loc.y > mousedown.y) rubberbandRect.top = mousedown.y;
	else					 rubberbandRect.top = loc.y;
}

function drawRubberbandShape(loc) {				//posición x,y del mouse
	c.beginPath();
	c.moveTo(mousedown.x, mousedown.y);
	c.lineTo(loc.x, loc.y);
	c.lineWidth = widthSelect.value;
	c.stroke();
	}

function updateRubberband(loc) {
	updateRubberbandRectangle(loc);
	drawRubberbandShape(loc);
}

//lineas guía

function drawHorizontalLine(x, y) {
	c.beginPath();
	c.moveTo(mousedown.x, y+0.5);
	c.lineTo(x, y+0.5);
	c.stroke();
	//segunda linea
	c.beginPath();
	c.moveTo(mousedown.x, mousedown.y+0.5);
	c.lineTo(x, mousedown.y+0.5)
	c.stroke();
}

function drawVerticalLine(x, y) {
	c.beginPath();
	c.moveTo(x+0.5,mousedown.y);
	c.lineTo(x+0.5, y);
	c.stroke();
	//segunda linea
	c.beginPath();
	c.moveTo(mousedown.x+0.5,mousedown.y);
	c.lineTo(mousedown.x+0.5, y);
	c.stroke();
}

function drawGuidewires(x, y) {
	c.save();
	c.strokeStyle = 'rgba(0,0,230,0.4)';
	c.lineWidth = 2;
	drawVerticalLine(x, y);
	drawHorizontalLine(x, y);
	c.restore();
}

function showBoxSize(x, y){
	c.save();
	c.font = "20px Arial";
	c.strokeStyle = "black";
	x_size = Math.floor(Math.abs(mousedown.x - x));
	y_size = Math.floor(Math.abs(mousedown.y - y));
	c.fillText(`x:${x_size} y:${y_size}`,x+10 , y+20);
	c.restore();
}
//event handlers

canvas.onmousedown = function(event) {
	var loc = windowToCanvas(event.clientX, event.clientY);
	event.preventDefault();
	saveDrawingSurface();
	mousedown.x = loc.x;									//guarda la posición en el momento que hice click
	mousedown.y = loc.y;
	dragging = true;
	
	//debug
	//console.log("mousedown");
	//console.log(`posición real x:${event.clientX} y:${event.clientY}`)
	//console.log(`posición relativa x:${loc.x} y:${loc.y}`)
}

canvas.onmousemove = function(event) {
	var loc;

	if (dragging) {
		event.preventDefault();
		loc = windowToCanvas(event.clientX, event.clientY);
		restoreDrawingSurface();
		updateRubberband(loc);

		if (guidewires) {
			drawGuidewires(loc.x, loc.y);
			showBoxSize(loc.x, loc.y);
		}
	}
	//console.log(`mousemove x:${event.clientX} y:${event.clientY}`);
}

canvas.onmouseup = function(event) {
	loc = windowToCanvas(event.clientX, event.clientY);
	restoreDrawingSurface();
	updateRubberband(loc);
	dragging = false;
}

//botones del html

eraseAllButton.onclick = function(event) {
	c.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid(c,'lightgray', 20, 20); 
	saveDrawingSurface();
	c.strokeStyle = strokeStyleSelect.value;
}

strokeStyleSelect.onchange = function(event) {
	c.strokeStyle = strokeStyleSelect.value;
}

widthSelect.onchange = function(event) {
	c.lineWidth = widthSelect.value;
}

guidewireCheckbox.onchange = function(event) {
	guidewires = guidewireCheckbox.checked;
}

//inicio


drawGrid(c,'lightgray',20,20);
c.strokeStyle = strokeStyleSelect.value;		//importante que vaya después de la gris para reemplazar el contexto gris por azul
c.lineWidth = widthSelect.value;

//canvas.getBoundingClientRect()
//devuelve propiedades del elemento tales como:
//bottom: 697, height: 604, left: 184.5, right: 984.5, top: 93, width: 800





