const darkMode = document.querySelector('p#darkLightMode');			//si no es declarado constante, deja de ser botón inmediatamente
var modeText = document.getElementById('darkLightMode');
var borderHead = document.getElementsByClassName("video_header");
var thumbImage = document.getElementsByClassName("thumbnail");

var lightModeName = "Dark "

const colorBlanco = "rgb(255,255,255)";
const colorGris = "rgb(100,100,100)";
const colorNegro = "rgb(0,0,0)";
const colorDiscord = "rgb(54,57,62)";
const colorHeaderL = "rgb(220,220,220)";

//valores por defecto
var colorValue = colorDiscord;
var colorValue2 = colorGris;
var colorValue3 = colorBlanco;

var light = false;

darkMode.addEventListener("click", () => {

	if (light){													//estos if-else asignan los colores según la posición del interruptor de light or dark mode.
		light = false;
		lightModeName = "Light ";
		colorValue = colorDiscord;
		colorValue2 = colorGris;
		colorValue3 = colorBlanco;
		for (var i = 0; i < borderHead.length; i++) {
       	borderHead[i].style.borderBottom = "2px solid gray";
    	}
		

	}else{														//también "parchan" el cambio de borde que no se puede hacer con anime js, oops.
		light = true;
		lightModeName = "Dark ";
		colorValue = colorBlanco;
		colorValue2 = colorHeaderL;
		colorValue3 = colorNegro;
		for (var i = 0; i < borderHead.length; i++) {					//habia que hacer un ciclo for para cambiar cada una de las clases, lol.
        borderHead[i].style.borderBottom ="2px solid rgb(220,220,220)";
    	}

	}
	modeText.textContent = lightModeName+"Mode";
	anime.timeline({
		targets: "body",
		loop: false,
		duration: 1000,
		backgroundColor: colorValue,							//esta bazofia solo acepta strings Xd
		easing: "easeOutExpo"
	}).add({
		targets: "#header",
		loop: false,
		duration: 500,
		backgroundColor: colorValue2,
		easing: "easeOutExpo"
	}).add({
		targets: "h2,h3,li,a:link, p#darkLightMode",
		loop: false,
		duration: 500,
		color: colorValue3,
		easing: "easeOutExpo"
	},-200);													//offset de animación, en este caso quiero que las letras se cambien de color un poco antes.
});

for (i = 0; i < thumbImage.length; i++) {
    thumbImage[i].addEventListener('mouseover', mouseIn);
    thumbImage[i].addEventListener('mouseout', mouseOut);
}

function mouseIn(e){
	anime({
	  targets: e.target,										//no sé por qué esto funciona, no entiendo esto del event handler help
	  scale: 1.05,
	  easing: 'easeInOutQuad',
	  duration: 500							
	});
}

function mouseOut(e){
	anime({
	  targets: e.target,
	  scale: 1,
	  easing: 'easeInOutQuad',
	  duration: 500							
	});
}

var el = document.getElementById('lastUpdate');
el.textContent = 'Modificado el: ' + document.lastModified;
