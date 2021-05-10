import * as div from "./div-manager.js"
import * as game from "./state-manager.js"
import * as anm from "./anime-utils.js"
import * as canvasManager from "./canvas-manager.js"
import * as f137 from "./forka-utils.js"

//load sounds
var acceptSound = new Audio(),
	tickSound = new Audio(),
	backSound = new Audio(),

	isAllLoaded = false,

	areDivsLoaded = false,
	areSoundsLoaded = false,
	isBackgroundLoaded = false,

	isSoundReady = true;

acceptSound.src = './sounds/accept.ogg';
backSound.src = './sounds/back.ogg';
tickSound.src = './sounds/button-click.ogg';

acceptSound.volume = 0.3;
backSound.volume = 0.2;
tickSound.volume = 0.2;

function loader() {
	if (!isAllLoaded){
		if (!isBackgroundLoaded){
			canvasManager.loadBackground(function(r) {
				isBackgroundLoaded = true;
				console.log("Fondo cargado");
			});
		} else if (!areSoundsLoaded) {
			loadSounds(function(r) {
				areSoundsLoaded = true;
				console.log("Sonidos cargados");
			});
		} else if (!areDivsLoaded){
			//fillWithFakeSongs();
			div.showMenu();
			loadListeners();
			areDivsLoaded = true;
			console.log("Divs cargados");
		} else {
			isAllLoaded = true;
			console.log("Todo cargado!");
		}
	}
}

function loadListeners() {
	//div.updateSongList();
	div.songSelect.forEach(function(element){
	 	element.addEventListener("mouseenter", (event) => {
			anm.lightOn(element, 'rgb(247, 220, 111)', 10, 25);
			playSound(tickSound);
			});	
													
		element.addEventListener("mouseleave", (event) => {
			anm.lightOff(element, 'rgb(251, 133, 22)', 500, 0);
			});
		});

	div.menuSelect.forEach(function(element){
		element.addEventListener("mouseenter", (event) => {
			anm.lightOn(element, 'rgb(190, 190, 190)', 10, 0);
			});

		element.addEventListener("mouseleave", (event) => {
			anm.lightOff(element, 'rgba(0, 147, 255, 0.8)', 500, 0);
			});										
	});

	div.goBack.addEventListener("mouseenter", (event) => {
		anm.lightOn(div.goBack, 'rgb(190, 190, 190)', 10, 0);
	});

	div.goBack.addEventListener("mouseleave", (event) => {
		anm.lightOff(div.goBack, 'rgba(0, 147, 255, 0.8)', 500, 0);
	});

		goBackClickListener();
		playClickListener();
		optionsClickListener();
		aboutClickListener();
		mouseCoordsListener();
		songTestListener();
}

function goBackClickListener(){
	div.goBack.addEventListener("click", (event) => {
		goBack(game.getState());
	});	
}

function playClickListener(){
	div.menuSelect[0].addEventListener("click", (event) => {
		if (game.getState() == 0){
			game.setState(1);
		}
		playSound(acceptSound);
	});	
}

function optionsClickListener(){
	div.menuSelect[1].addEventListener("click", (event) => {
		if (game.getState() == 0){
			game.setState(-1);
		}
		playSound(acceptSound);
	});	
}

function aboutClickListener(){
	div.menuSelect[2].addEventListener("click", (event) => {
		if (game.getState() == 0){
			game.setState(-2);
		}
		playSound(acceptSound);
	});	
}

function mouseCoordsListener(){
	document.onmousemove = function(event) {
		canvasManager.updateCoords(event);
		canvasManager.backgroundFollowMouse();
	}
}

function fillWithFakeSongs() {
	for(let i = 5; i < 100; i++){
	div.songList.innerHTML +=`<li class="songSelect"><span class="listText">Canción ${i}</span></li>`;
	}
}

function loadSounds(callback){
	let soundArray = [acceptSound, tickSound, backSound],
		soundsLoaded = 0,
		soundCount = soundArray.length;

	soundArray.forEach(sound => {
		sound.addEventListener('loadeddata', function(){
			soundsLoaded++;
			if(soundsLoaded == soundCount && !areSoundsLoaded) {
				callback();
			}
		});
	});
}

function playSound(sound){
	//isSoundReady debe ser global.
	if (isSoundReady){
		sound.pause();
		sound.currentTime = 0;
		sound.play();
		isSoundReady = false;
		setTimeout(function(){ isSoundReady = true; }, 40);
	}
}

function goBack(state){
	playSound(backSound);
	if (state == 1 || state == -1 || state == -2) {
		game.setState(0);
	} else if (state == 2){
		game.setState(1);
	}
}

function songTestListener(){
	div.song1.addEventListener("click", (event) => {
		// esto es de prueba no más, ahora hay que usar la información entregada
		// de hecho cargar el json acá igual no es necesario
		f137.loadJSON(function(response){
			let data = JSON.parse(response)
		}, 'Fly me to the moon')
		
		playSound(acceptSound);
		canvasManager.setSong('Fly me to the moon');
		game.setState(2);
	});
}
export {loader, goBack};

//canvasManager.canvas.onmousemove(){}
//esta se detenia al momento de pasar por encima de un div.