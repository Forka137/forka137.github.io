var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	animateButton = document.getElementById("animateButton"),
	frameRate = document.getElementById("frameRate"),
	frameRate2 = document.getElementById("frameRate2"),
	fpsSlider = document.getElementById('fpsSlider'),

//inicialización de imagenes
	tree = new Image(),
	tree2 = new Image(),
	grass = new Image(),
	cloud = new Image(),
	cloud2 = new Image(),

	paused = true,
	fps = 60,
	fps_2 = 60,
	fps_input = 1, //input va de 0.1 a 1
	lastTime = 0,
	lastTime_2 = 0,
	fps_actual = 0,
	fps_counter = 0,
	delta = 0.16,
	counter_i = 0,

	cloudOffset = 0,
	cloud2Offset = 0,
	grassOffset = 0,
	treeOffset = 0,
	tree2Offset = 0,

	treeSpeed = 15,
	tree2Speed = 40,
	cloudSpeed = 8,
	cloud2Speed = 20,
	grassSpeed = 75;

function updateOffsets(){
	cloudOffset = cloudOffset < canvas.width ?
				  cloudOffset + cloudSpeed/fps_2 : 0;
	//si el offset es igual al ancho del canvas, se reinicia el offset
	//esto significa que la nube ya recorrió una pantalla por completo

	cloud2Offset = cloud2Offset < canvas.width ?
				   cloud2Offset + cloud2Speed/fps_2 : 0;

	treeOffset = treeOffset < canvas.width ?
				 treeOffset + treeSpeed/fps_2 : 0;

	tree2Offset = tree2Offset < canvas.width ?
				  tree2Offset + tree2Speed/fps_2 : 0;

	grassOffset = grassOffset < canvas.width ?
				  grassOffset + grassSpeed/fps_2 : 0;
}

function drawEverything() {
	context.save();
	drawCloud(cloudOffset);
	drawCloud2(cloud2Offset);
	drawTree(treeOffset);
	drawTree2(tree2Offset);
	drawGrass(grassOffset);
	context.restore();
}

function drawCloud(offset){
	context.save();
	context.translate(-offset, 0);
	context.drawImage(cloud, 50, 120);
	context.drawImage(cloud, 600, 250);
	//fuera del canvas
	context.drawImage(cloud, 50 + canvas.width, 120);
	context.drawImage(cloud, 600 + canvas.width, 250);
	context.restore();
}

function drawCloud2(offset){
	context.save();
	context.translate(-offset, 0);
	context.drawImage(cloud2, 700, 30);
	context.drawImage(cloud2, 250, 200);

	context.drawImage(cloud2, 700 + canvas.width, 30);
	context.drawImage(cloud2, 250 + canvas.width, 200);
	context.restore();
}

function drawGrass(offset){
	context.save();
	context.translate(-offset, 0);
	context.drawImage(grass, 1, canvas.height-grass.height);

	context.drawImage(grass, 1 + canvas.width, canvas.height-grass.height);
	context.restore();
}

function drawTree(offset){
	context.save();
	context.translate(-offset, 0);
	context.drawImage(tree, 100, 390);
	context.drawImage(tree, 400, 390);
	context.drawImage(tree, 700, 390);

	context.drawImage(tree, 100 + canvas.width, 390);
	context.drawImage(tree, 400 + canvas.width, 390);
	context.drawImage(tree, 700 + canvas.width, 390);

	context.restore();
}

function drawTree2(offset){
	context.save();
	context.translate(-offset, 0);
	context.drawImage(tree2, 250, 365);
	context.drawImage(tree2, 550, 365);

	context.drawImage(tree2, 250 + canvas.width, 365);
	context.drawImage(tree2, 550 + canvas.width, 365);
	context.restore();
}

function drawSky(){
	context.save();
	let grad = context.createLinearGradient(0, 0, 0, canvas.height-grass.height);

	grad.addColorStop(0, "#87ceeb");
	grad.addColorStop(1, "white");
	context.fillStyle = grad;
	context.fillRect(0,0, canvas.width, canvas.height);
	context.restore();
}


function calculateFpsMax() {
	var now = new Date().getTime();
	fps = 1000 / (now - lastTime);

	lastTime = now;

	if (fps_2 < 300){
	fps_actual = fps_input*fps_2;
	}
}

function updateFps() {
	if (!paused){
		frameRate.innerText = "FPS Max: " + fps.toFixed(1);
		frameRate2.innerText = "FPS Actual: " + fps_actual.toFixed(1);
	} else {
		frameRate.innerText = "FPS Max: 0";
		frameRate2.innerText = "FPS Actual: 0";
	}
}

animateButton.onclick = function (e) {
	paused = paused ? false : true;
	if (paused) {
		animateButton.value = 'Animar';
	} else {
		lastTime_2 = new Date().getTime();
		requestAnimationFrame(animate);
		animateButton.value = 'Detener';
	}
}

fpsSlider.oninput = function(e) {
	fps_input = parseFloat(e.target.value);
	updateText();
}

function animate() {
	if (!paused){
		now_2 = new Date().getTime();
		//delta = (now_2 - lastTime_2)/100;
		//no es necesario delta en este caso, ver calculo de offset
		fps_2 = 1000 / (now_2 - lastTime_2);

		updateOffsets();

		if (Math.floor(fps_counter) == counter_i){
			drawSky();
			drawEverything();
			counter_i += 1;
		}
		if (fps_counter < Math.round(fps_input*fps_2)){
			fps_counter += fps_input;
		} else {
			counter_i = 0;
			fps_counter = 0;
		}
		requestAnimationFrame(animate);
		calculateFpsMax();
		lastTime_2 = now_2;	
	}
}
	

//inicialización general
//context.font = '48px Helvetica';

cloud.src = 'images/cloud.png';
cloud2.src = 'images/cloud2.png';
tree.src = 'images/tree.png';
tree2.src = 'images/tree2.png';
grass.src = 'images/grass.png';


grass.onload = function(e) {
	drawSky();
	drawEverything();
	//se debe user onload, debido a que se cargan de manera asíncrona.
}
setInterval(updateFps, 1000);


//aplicar después
// var imageCount = images.length;
// var imagesLoaded = 0;

// for(var i=0; i<imageCount; i++){
//     images[i].onload = function(){
//         imagesLoaded++;
//         if(imagesLoaded == imageCount){
//             allLoaded();
//         }
//     }
// }

// function allLoaded(){
//     drawImages();
// }