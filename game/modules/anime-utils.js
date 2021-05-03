function lightOn(element, color, fadeTime, translate_X) {
	anime.remove(element);	//interrumpe la animación anterior
	//element.style.zIndex = 20;
	anime({
	  targets: element,
	  backgroundColor: color,
	  duration: fadeTime,
	  translateX: translate_X,
	  scale: 1.05,
	  easing: 'easeInOutQuad'
	});
	//console.log("se enciende");
}

function lightOff(element, color, fadeTime, translate_X) {
	//element.style.zIndex = 0;
	anime({
	  targets: element,
	  backgroundColor: color,
	  duration: fadeTime,
	  translateX: translate_X,
	  scale: 1,
	  easing: 'easeInOutQuad'
	});
	//console.log("se apaga");
}

function slideColumn(element, Translate_X, fadeTime){
	anime({
	  targets: element,
	  duration: fadeTime,
	  translateX: Translate_X,
	  easing: 'easeInOutQuad'
	});
}

function aboutTextAnimated(target){
	anime({
		targets: target,
	    scale: [5,1],
	    opacity: [0,1],
	    translateZ: 0,
	    easing: "easeOutExpo",
	    duration: 2000
	});
}

export {lightOn, lightOff, slideColumn, aboutTextAnimated};