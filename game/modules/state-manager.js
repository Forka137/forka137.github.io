import * as div from "./div-manager.js"
import * as canvasManager from "./canvas-manager.js"

var state = 0;

function setState(n){
	switch (n) {
		case 0: //menu de inicio
			state = 0;
			div.showMenu();
			div.hideSongList();
			div.hideBackButton();
			div.hideOptions();
			div.hideAbout();
			canvasManager.updateBackground(0);
			break;

		case 1: //Seleccionar canción
			state = 1;
			div.hideMenu();
			div.showSongList();
			div.showBackButton();
			canvasManager.updateBackground(1);
			break;

		case -1: //opciones
			state = -1;
			div.hideMenu();
			div.showOptions();
			div.showBackButton();
			canvasManager.updateBackground(-1);
			break;
			
		case -2: //Acerca de
			state = -1;
			div.hideMenu();
			div.showAbout();
			div.showBackButton();
			div.showAuthorAnimation();
			canvasManager.updateBackground(-2);
			break;
	}
}
function getState(){
	return state;
}

export {setState, getState};