var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),

	//crear una canvas que no está ligado a ningún elemento del DOM
	offscreenCanvas = document.createElement('canvas'),
	offscreenContext = offscreenCanvas.getContext('2d'),

	scaleSlider = document.getElementById('scaleSlider'),
	scaleOutput = document.getElementById('scaleOutput'),

	image = new Image(),
	scale = 1.0,
	minimum_scale = 1.0,
	maximum_scale = 3.0;

//funciones

function drawScaled() {
	var w = canvas.width,
		h = canvas.height,
		sw = w * scale,
		sh = h * scale;

	context.drawImage(offscreenCanvas, 0, 0, offscreenCanvas.width, offscreenCanvas.height,
					  -sw/2 + w/2, -sh/2 + h/2, sw, sh);
	//dibuja la imagen del canvas fuera de pantalla en el canvas normal
	//drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)

	//sx, sy = posición de la imágen fuente
	//sw, sh = rectángulo de la imágen fuente
	//dx, dy = posición en el canvas
	//dw, dh = rectángulo en el canvas

	//en este caso a medida que scale crece, el rectángulo en el canvas será más grande
	//que él, por lo tanto parte de la imagen se ocultara y se agrandará el centro.
}

function drawScaleText (value) {
	var text = parseFloat(value).toFixed(2);
	var percent = parseFloat(value - minimum_scale) /
				  parseFloat(maximum_scale - minimum_scale);
				//función normalizadora para cualquier rango

	scaleOutput.innerText = text;
	percent = percent < 0.5 ? 0.5 : percent;
	scaleOutput.style.fontSize = percent*1.5 + "em";
}

function drawCenterText(context, canvas) {
	context.save();
	context.font = '50px arial';
	context.textAlign = 'center';
	context.strokeStyle = 'navy';
	context.fillStyle = 'white';
	context.shadowColor = 'rgba(0,0,0,0.5)';
	context.shadowOffsetX = 2;
	context.shadowOffsetY = 2;
	context.shadowBlur = 4;
	context.strokeText("Texto centrado", canvas.width/2, canvas.height/2);
	context.fillText("Texto centrado", canvas.width/2, canvas.height/2);
	context.restore();
}
//convierte la posición x,y del mouse (global) en coordenadas x,y del canvas
function windowToCanvas(x, y) { 
	var bbox = canvas.getBoundingClientRect();
	return {x: x - bbox.left * (canvas.width  / bbox.width),
			y: y - bbox.top  * (canvas.height / bbox.height) };
}

//listeners and handlers

scaleSlider.oninput = function(e) {
	scale = e.target.value;

	drawScaled();
	drawScaleText(scale);
}
//oninput ejecuta la función cada vez que se mueve el slider
//onchange solo la ejecuta cuando dejas de moverlo (en el último valor que lo dejaste)

//inicio

offscreenCanvas.width = 1920;
offscreenCanvas.height = 1080;

//la imagen tiene una resolución de 1080p
image.src = 'landscape.png';

//la imagen debe cargarse primero o sino el canvas no mostrará nada
image.onload = function(e) {
	//función del tipo drawImage(image, dx, dy, dw, dh)
	offscreenContext.drawImage(image, 0, 0, 1920, 1080);
	drawScaleText(scaleSlider.value);
	drawCenterText(offscreenContext, offscreenCanvas);
	context.drawImage(offscreenCanvas, 0, 0, canvas.width, canvas.height);
	//el canvas visible es de 900x540
}

//drag and drop function

canvas.addEventListener('dragenter', function(e) {
	e.preventDefault();
	e.dataTransfer.effectAllowed = 'copy';
}, false);

canvas.addEventListener('dragover', function(e) {
	e.preventDefault();
}, false);

window.requestFileSystem = 
			window.requestFileSystem || window.webkitRequestFileSystem;

canvas.addEventListener('drop', function (e) {
	var file = e.dataTransfer.files[0];

	window.requestFileSystem(window.TEMPORARY, 5*1024*2014,
		function (fs) {
			fs.root.getFile(file.name, {create: true},
				function (fileEntry) {
					fileEntry.createWriter( function (writer) {
						writer.write(file);
					});
					image.src = fileEntry.toURL();
				},
				function (e) {
					alert(e.code);
				}
			);
		},
		function (e) {
			alert(e.code);
		}
	);
}, false);

//antes
/*image.onload = function(e) {
	context.drawImage(image, 0, 0, canvas.width, canvas.height);
	drawCenterText(context, canvas);
	//función del tipo drawImage(image, dx, dy, dw, dh)
	offscreenContext.drawImage(image, 0, 0, 1920, 1080);
	drawScaleText(scaleSlider.value);
	drawCenterText(offscreenContext, offscreenCanvas);
}
*/