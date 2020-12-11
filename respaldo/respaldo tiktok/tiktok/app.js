import {urlTiktokVideo} from "../listas/tiktok.js";
import {urlTiktokThumbnail} from "../listas/tiktok.js";

const darkMode = document.querySelector('p#darkLightMode');			//si no es declarado constante, deja de ser botón inmediatamente
var modeText = document.getElementById('darkLightMode');
var borderHead = document.getElementsByClassName("video_header");

var lightModeName = "Dark "

const colorBlanco = "rgb(255,255,255)";
const colorGris = "rgb(100,100,100)";
const colorNegro = "rgb(0,0,0)";
const colorDiscord = "rgb(54,57,62)";
const colorHeaderL = "rgb(220,220,220)";

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

const toTheTop = document.querySelector('#goToTheTop');
toTheTop.addEventListener("click", () => {						//función para ir arriba.
	topFunction();
});


var el = document.getElementById('lastUpdate');
el.textContent = 'Modificado el: ' + document.lastModified;

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

var thumbVideo = document.getElementsByClassName("thumbnail");
var insertVideo = document.getElementById("mind_mind");									//luego cambiar y usar un this o algo asi para no repetir esto siempre
var closeVideo = document.getElementsByClassName("closeVideo");

thumbVideo[0].addEventListener("click", () => {
	thumbVideo[0].style.display = 'none';
	closeVideo[0].style.display = 'initial';
	insertVideo.innerHTML = '</div id="mind_mind"><video title="Jamie Berry - Out Of My Mind"'
	 +'src="https://cdn.discordapp.com/attachments/650597613367853072/650628432333635595/1543747326770_mind_mind.webm#t=0.1" autoplay preload="metadata" controls/></video></div>';
	closeVideo[0].innerHTML = '<h3 class="closeVideo">Cerrar</h3>';
});

closeVideo[0].addEventListener("click", () => {
	thumbVideo[0].style.display = 'block';
	closeVideo[0].style.display = 'none';						//igual es importante para que no se pueda clickear invisible
	insertVideo.innerHTML = '<div id="mind_mind"></div>';
	closeVideo[0].innerHTML = '<h3 class="closeVideo"></h3>';
});

console.log(urlTiktokVideo[0])