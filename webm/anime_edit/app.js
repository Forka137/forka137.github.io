import {urlAnime_editVideo} from "../listas/anime_edit.js";
import {urlAnime_editThumbnail} from "../listas/anime_edit.js";
import {anime_editText} from "../listas/anime_edit.js";
import {anime_editCode} from "../listas/anime_edit.js";

const darkMode = document.querySelector('#darkLightMode');			//si no es declarado constante, deja de ser botón inmediatamente
var modeText = document.getElementById('darkLightMode');
var borderHead = document.getElementsByClassName("video_header");

var lightModeName = "oscuro "

const colorBlanco = "rgb(255,255,255)";
const colorGris = "rgb(100,100,100)";
const colorNegro = "rgb(0,0,0)";
const colorDiscord = "rgb(54,57,62)";
const colorHeaderL = "rgb(220,220,220)";
const colorContent = "rgb(60,60,60)";
const colorContentW = "rgb(245,245,245)";

var colorValue = colorDiscord;
var colorValue2 = colorGris;
var colorValue3 = colorBlanco;
var colorValue4 = colorContent;

var light = false;

darkMode.addEventListener("click", () => {

	if (light){													//estos if-else asignan los colores según la posición del interruptor de light or dark mode.
		light = false;
		lightModeName = "claro";
		colorValue = colorDiscord;
		colorValue2 = colorGris;
		colorValue3 = colorBlanco;
		colorValue4 = colorContent;
		for (var i = 0; i < borderHead.length; i++) {
       	borderHead[i].style.borderBottom = "2px solid gray";
    	}
		
	}else{														//también "parchan" el cambio de borde que no se puede hacer con anime js, oops.
		light = true;
		lightModeName = "oscuro";
		colorValue = colorBlanco;
		colorValue2 = colorHeaderL;
		colorValue3 = colorNegro;
		colorValue4 = colorContentW;
		for (var i = 0; i < borderHead.length; i++) {					//habia que hacer un ciclo for para cambiar cada una de las clases, lol.
        borderHead[i].style.borderBottom ="2px solid rgb(220,220,220)";
    	}

	}
	modeText.textContent = "Fondo "+lightModeName;
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
		targets: "#main_box",
		loop: false,
		duration: 500,
		backgroundColor: colorValue4,
		easing: "easeOutExpo"
	},-100).add({
		targets: "h2,h3,li,a:link, #darkLightMode, .shareVideo, .closeVideo",
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

//objeto tipo webm
function webmVideo(vUrl,tUrl,text,number, code){
	this.videoUrl = vUrl;
	this.thumbUrl = tUrl;
	this.caption = text;
	this.elementNumber = number;
	this.name = code;
	this.addToPage = function(previousElement){
		previousElement.insertAdjacentHTML("afterend",` 
			<div id="anime_edit${this.elementNumber}">
			<div class="video_header">
				<h3>${this.caption}</h3>
				<div id="closeVideo${this.elementNumber}" class="h3 closeVideo"><a href="#">Cerrar<a/></div>
				<div id="shareVideo${this.elementNumber}" class="shareVideo"><a href="#">Compartir<a/></div>
			</div>
			<img id="thumb${this.elementNumber}" class="thumbnail" src=${this.thumbUrl} loading="lazy"/>
			<div id="videoWebm${this.elementNumber}"></div>
		</div>
		`
		);
	}
	this.showVideo = function(){
		let thumbnail = document.getElementById(`thumb${this.elementNumber}`);
		let video = document.getElementById(`videoWebm${this.elementNumber}`);
		let close = document.getElementById(`closeVideo${this.elementNumber}`);
		thumbnail.style.display = 'none';
		close.style.display = 'inline';
		video.innerHTML = `<video id="videoWebm${this.elementNumber}" src=${this.videoUrl} autoplay preload="metadata" controls loop /></video>`;
	}
	this.hideVideo = function(){
		let thumbnail = document.getElementById(`thumb${this.elementNumber}`);
		let video = document.getElementById(`videoWebm${this.elementNumber}`);
		let close = document.getElementById(`closeVideo${this.elementNumber}`);
		thumbnail.style.display = 'block';
		close.style.display = 'none';
		video.innerHTML = `<div id="videoWebm${this.elementNumber}"/></div>`;
	}
	this.shareVideo = function(){
		window.open(`../allvideos/${this.name}.html`,'_blank');
	}
}

//se debe crear la variable isArray antes de ejecutar shuffleArray, porque se usa dentro.
var isArray = Array.isArray || function(value) {
  return {}.toString.call(value) !== "[object Array]"
};

//randomiza los videos
shuffleArray(urlAnime_editVideo, urlAnime_editThumbnail, anime_editText, anime_editCode);

//crea todas las thumbnail y  los objetos webmVideo
var video = [];
for (let i = 0; i < urlAnime_editVideo.length; i++) {	
	let previousElement = document.getElementById(`anime_edit${i}`);
	video[i] = new webmVideo(urlAnime_editVideo[i], urlAnime_editThumbnail[i], anime_editText[i],i+1, anime_editCode[i]);
	video[i].addToPage(previousElement);
	}

//crea todos los listeners
for (let i = 0; i < urlAnime_editVideo.length; i++) {												//al cambiar var i a let i, se solucionó el problema
	let el = document.getElementById(`thumb${i+1}`);		//los thumb empiezan en 1			//de más abajo que console.log marcaba siempre 7
	let el2 = document.getElementById(`closeVideo${i+1}`);	//los closeVideo también
	let el3 = document.getElementById(`shareVideo${i+1}`);
	el.addEventListener("click", (event) => {
		//console.log(i);										//marca 7 wtf
		video[i].showVideo();
		});
	el2.addEventListener("click", (event) => {									
		video[i].hideVideo();
		});
	//vamos a probar el share
	el3.addEventListener("click", (event) => {									
		video[i].shareVideo();
		});
	}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


//algoritmo basado en fisher-yates (me lo robé de stackoverflow)
function shuffleArray() {
  var arrLength = 0;
  var argsLength = arguments.length;
  var rnd, tmp;

  for (let index = 0; index < argsLength; index += 1) {
    if (!isArray(arguments[index])) {
      throw new TypeError("Argument is not an array.");
    }

    if (index === 0) {
      arrLength = arguments[0].length;
    }

    if (arrLength !== arguments[index].length) {
      throw new RangeError("Array lengths do not match.");
    }
  }

  while (arrLength) {
    rnd = Math.floor(Math.random() * arrLength);
    arrLength -= 1;
    for (let argsIndex = 0; argsIndex < argsLength; argsIndex += 1) {
      tmp = arguments[argsIndex][arrLength];
      arguments[argsIndex][arrLength] = arguments[argsIndex][rnd];
      arguments[argsIndex][rnd] = tmp;
    }
  }
}


//sobre el anime_editCode[i];
//sucede que quiero que todos los videos tengan su página disponible para compartir más facilmente
//entonces necesito darles un código único de manera que siempre el objeto pueda tener una referencia a dicha página html
//eso es todo


