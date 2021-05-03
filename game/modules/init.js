import * as div from "./div-manager.js"
import * as game from "./state-manager.js"
import * as anm from "./anime-utils.js"
import * as canvasManager from "./canvas-manager.js"

//load sounds
var acceptSound = new Audio(),
	tickSound = new Audio(),
	backSound = new Audio(),

	isAllLoaded = false,
	tryToLoad = true,

	isSoundReady = true;

acceptSound.src = './sounds/accept.ogg';
backSound.src = './sounds/back.ogg';
tickSound.src = './sounds/button-click.ogg';

acceptSound.volume = 0.3;
backSound.volume = 0.2;
tickSound.volume = 0.2;

function loadEverything(context) {
	//fillWithFakeSongs();
	div.hideOtherDivs();
	div.setMenuStyleDisplay();
	canvasManager.loadBackground();
	mouseCoordsListener();
	loadSounds();

	while(tryToLoad){
		loadListeners();
	}
}

function loadListeners() {
	if (isAllLoaded = true){
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

		tryToLoad = false;
	}
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
		canvasManager.drawMouseCoords();
		canvasManager.backgroundFollorMouse();
	}
}

function fillWithFakeSongs() {
	for(let i = 5; i < 100; i++){
	div.songList.innerHTML +=`<li class="songSelect"><span class="listText">Canción ${i}</span></li>`;
	}
}

function loadSounds(){
	let soundArray = [acceptSound, tickSound, backSound],
		soundsLoaded = 0,
		soundCount = soundArray.length;

	soundArray.forEach(sound => {
		sound.onload = function() {
			soundsLoaded++;
			if(soundsLoaded == soundCount) {
				isAllLoaded = true;
				//tengo que hacer una función que se encargue de ver que todo se cargue
				//y acá habrá otra variable.
	        }
		}
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
	if (state == 1 || state == -1 || state == -2) {
		game.setState(0);
		playSound(backSound);
	}
}

export {loadEverything, goBack};

//canvasManager.canvas.onmousemove(){}
//esta se detenia al momento de pasar por encima de un div.