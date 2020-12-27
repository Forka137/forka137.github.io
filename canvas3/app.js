var canvas = document.getElementById('canvas'),
	c = canvas.getContext('2d'),
	eraseAllButton = document.getElementById('eraseAllButton'),
	strokeStyleSelect = document.getElementById('strokeStyleSelect'),
	fillStyleSelect = document.getElementById('fillStyleSelect'),
	guidewireCheckbox = document.getElementById('guidewireCheckbox'),
	fillCheckbox = document.getElementById('fillCheckbox'),
	widthSelect = document.getElementById('widthSelect'),
	sidesSelect = document.getElementById('sidesSelect'),
	rotateCheckbox = document.getElementById('rotateCheckbox'),
	drawingSurfaceImageData,
	mousedown = {},														//creación de objetos
	rubberbandRect = {},
	dragging = false,
	guidewires = guidewireCheckbox.checked,
	rRotation = rotateCheckbox.checked,
	rubberWidth = 2,
	startAngle = 0;

//objeto point (tipo constructor)
var Point = function(x, y){
	this.x = x;
	this.y = y;
}

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

function updateRubberband(loc) {
	updateRubberbandRectangle(loc);
	drawRubberbandShape(loc, sidesSelect.value, startAngle);
}


function updateRubberbandRectangle(loc) {
	rubberbandRect.width = Math.abs(loc.x - mousedown.x);
	rubberbandRect.height = Math.abs(loc.y - mousedown.y);

	if (loc.x > mousedown.x) rubberbandRect.left = mousedown.x;
	else					 rubberbandRect.left = loc.x;

	if (loc.y > mousedown.y) rubberbandRect.top = mousedown.y;
	else					 rubberbandRect.top = loc.y;
}

function getPolygonPoints(centerX, centerY, radius, sides, startAngle){
	var points = [],
		angle = startAngle || 0;

	for (let i=0; i < sides; i++) {
		points.push(new Point(centerX + radius * Math.sin(angle),
							  centerY - radius * Math.cos(angle)));
		angle += 2*Math.PI/sides;
	}
	return points;
}

function createPolygonPath(centerX, centerY, radius, sides, startAngle){
	var points = getPolygonPoints(centerX, centerY, radius, sides, startAngle);
	c.beginPath();
	c.moveTo(points[0].x, points[0].y);

	for (let i = 1; i < sides; i++){
		c.lineTo(points[i].x, points[i].y);
	}
	c.closePath();
}

function drawRubberbandShape(loc, sides, startAngle){
	createPolygonPath(mousedown.x, mousedown.y, rubberbandRect.width, parseInt(sides),
					  (Math.PI / 180) * parseInt(startAngle));
	c.stroke();

	if (fillCheckbox.checked) {
		c.fill();
	}
}

//lineas guía

function drawGuideCircle(x) {
	c.beginPath();
	let radius = Math.abs(x - mousedown.x) + parseInt(widthSelect.value); 
	c.arc(mousedown.x, mousedown.y,radius,0,2*Math.PI,true);
	c.stroke();
}

function drawGuidewires(x) {
	c.save();
	c.strokeStyle = 'rgba(0,0,230,0.4)';
	c.lineWidth = 2;
	drawGuideCircle(x)
	c.restore();
}

function showBoxSize(x, y){
	let radius = Math.abs(x - mousedown.x) + parseInt(widthSelect.value);
	c.save();
	c.font = "20px Arial";
	c.strokeStyle = "black";
	c.fillText(`R:${radius}`,x+10 , y+20);
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

	if(rRotation) {
		startAngle = Math.floor(Math.random() * 360) + 1;
	} else {
		startAngle = 0;
	}
	
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
			drawGuidewires(loc.x);
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
	c.lineWidth = widthSelect.value; 
}

strokeStyleSelect.onchange = function(event) {
	c.strokeStyle = strokeStyleSelect.value;
}

widthSelect.onchange = function(event) {
	c.lineWidth = widthSelect.value;
}

fillStyleSelect.onchange = function(event) {
	c.fillStyle = fillStyleSelect.value;
}

guidewireCheckbox.onchange = function(event) {
	guidewires = guidewireCheckbox.checked;
}

rotateCheckbox.onchange = function(event) {
	rRotation = rotateCheckbox.checked;
}

//inicio


drawGrid(c,'lightgray',20,20);
c.strokeStyle = strokeStyleSelect.value;		//importante que vaya después de la gris para reemplazar el contexto gris por azul
c.fillStyle = fillStyleSelect.value;
c.sidesSelect = sidesSelect.value;
c.lineWidth = widthSelect.value;

//canvas.getBoundingClientRect()
//devuelve propiedades del elemento tales como:
//bottom: 697, height: 604, left: 184.5, right: 984.5, top: 93, width: 800
