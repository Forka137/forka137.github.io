import * as f137 from "./modules/forka-utils.js"
import * as init from "./modules/init.js"
import * as game from "./modules/state-manager.js"
import * as canvasManager from "./modules/canvas-manager.js"

var canvas = canvasManager.canvas,
	context = canvasManager.context,
	offscreenCanvas = canvasManager.offScreenCanvas,
	offscreenContext = canvasManager.offScreenContext;

//inicialización general
//carga los listeners y otras cosas
init.loadEverything(context);
game.setState(0);

function animate() {
	if (true){
		canvasManager.updateBackground(game.getState());
		requestAnimationFrame(animate);
	}
}

animate();

//modo debug
document.addEventListener('keydown', logKey);
function logKey(e) {
  	let keyCode = e.code;
  	if (keyCode == 'F8'){
  			canvasManager.toggleDebugMode();

  	} else if(keyCode == 'F9'){
  			console.log("se presiona F9 jz");

  	} else if(keyCode == 'Escape'){
  			init.goBack(game.getState());

  	}
}	


//   ./ current directory
// 	../ parent directorys