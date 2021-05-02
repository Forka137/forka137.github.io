import * as div from "./div-manager.js"
import * as game from "./state-manager.js"
import * as anm from "./anime-utils.js"
import * as canvasManager from "./canvas-manager.js"

function loadEverything(context) {
	//fillWithFakeSongs();
	div.hideOtherDivs();
	div.setMenuStyleDisplay();
	canvasManager.loadBackground();
	mouseCoordsListener();
	loadListeners();
}

function loadListeners() {
	 //div.updateSongList();
	 div.songSelect.forEach(function(element){
	 	element.addEventListener("mouseenter", (event) => {
			anm.lightOn(element, 'rgb(247, 220, 111)', 500, 20);
			});	
													
		element.addEventListener("mouseleave", (event) => {
			anm.lightOff(element, 'rgb(251, 133, 22)', 500, 0);
			});
		});

	div.menuSelect.forEach(function(element){
		element.addEventListener("mouseenter", (event) => {
			anm.lightOn(element, 'rgb(190, 190, 190)', 500, 0);
			});

		element.addEventListener("mouseleave", (event) => {
			anm.lightOff(element, 'rgba(0, 147, 255, 0.8)', 500, 0);
			});										
	});
		div.goBack.addEventListener("mouseenter", (event) => {
			anm.lightOn(div.goBack, 'rgb(190, 190, 190)', 500, 0);
			});

		div.goBack.addEventListener("mouseleave", (event) => {
			anm.lightOff(div.goBack, 'rgba(0, 147, 255, 0.8)', 500, 0);
			});

		goBackClickListener();
		playClickListener();
		optionsClickListener();
		aboutClickListener();
}

function goBackClickListener(){
	goBack.addEventListener("click", (event) => {
		if (game.getState() == 1 || game.getState() == -1){
			game.setState(0);
		}
	});	
}

function playClickListener(){
	div.menuSelect[0].addEventListener("click", (event) => {
		if (game.getState() == 0){
			game.setState(1);
		}
	});	
}

function optionsClickListener(){
	div.menuSelect[1].addEventListener("click", (event) => {
		if (game.getState() == 0){
			game.setState(-1);
		}
	});	
}

function aboutClickListener(){
	div.menuSelect[2].addEventListener("click", (event) => {
		if (game.getState() == 0){
			game.setState(-2);
		}
	});	
}

function fillWithFakeSongs() {
	for(let i = 5; i < 100; i++){
	div.songList.innerHTML +=`<li class="songSelect"><span class="listText">Canción ${i}</span></li>`;
	}
}

function mouseCoordsListener(){
	document.onmousemove = function(event) {
		canvasManager.updateCoords(event);
		canvasManager.drawMouseCoords();
		canvasManager.backgroundFollorMouse();
	}
}
export {loadEverything};

//canvasManager.canvas.onmousemove(){}
//esta se detenia al momento de pasar por encima de un div.