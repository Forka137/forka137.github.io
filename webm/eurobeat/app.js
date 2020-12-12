import {urlEurobeatVideo} from "../listas/eurobeat.js";
import {urlEurobeatThumbnail} from "../listas/eurobeat.js";
import {eurobeatText} from "../listas/eurobeat.js";
import {eurobeatCode} from "../listas/eurobeat.js";

const darkMode = document.querySelector('p#darkLightMode');			//si no es declarado constante, deja de ser botón inmediatamente
var modeText = document.getElementById('darkLightMode');
var borderHead = document.getElementsByClassName("video_header");

var lightModeName = "Dark "

const colorBlanco = "rgb(255,255,255)";
const colorGris = "rgb(100,100,100)";
const colorNegro = "rgb(0,0,0)";
const colorDiscord = "rgb(54,57,62)";
const colorHeaderL = "rgb(220,220,220)";

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

const toTheTop = document.querySelector('#goToTheTop');
toTheTop.addEventListener("click", () => {						//función para ir arriba.
	topFunction();
});

//objeto tipo webm
function webmVideo(vUrl,tUrl,text,number,code){
	this.videoUrl = vUrl;
	this.thumbUrl = tUrl;
	this.caption = text;
	this.elementNumber = number;
	this.name = code;
	this.addToPage = function(previousElement){
		previousElement.insertAdjacentHTML("afterend",` 
			<div id="eurobeat${this.elementNumber}">
			<div class="video_header">
				<h3>${this.caption}</h3>
				<div id="closeVideo${this.elementNumber}" class="h3 closeVideo">Cerrar</div>
				<div id="shareVideo${this.elementNumber}" class="shareVideo">Compartir</div>
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
		video.innerHTML = `<video id="videoWebm${this.elementNumber}" src=${this.videoUrl} autoplay preload="metadata" controls /></video>`;
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


//crea todas las thumbnail y  los objetos webmVideo
var video = [];
for (let i = 0; i < urlEurobeatVideo.length; i++) {	
	let previousElement = document.getElementById(`eurobeat${i}`);
	video[i] = new webmVideo(urlEurobeatVideo[i], urlEurobeatThumbnail[i], eurobeatText[i],i+1, eurobeatCode[i]);
	video[i].addToPage(previousElement);
	}

//crea todos los listeners
for (let i = 0; i < urlEurobeatVideo.length; i++) {												//al cambiar var i a let i, se solucionó el problema
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
	el3.addEventListener("click", (event) => {									
		video[i].shareVideo();
		});
	}

//video[0].showVideo();
//console.log(urlEurobeatVideo[0])

/*funciona!
var video1 = new webmVideo(urlEurobeatVideo[0], urlEurobeatThumbnail[0], eurobeatText[0]);
video1.addToPage(firstElement,1);

var el = document.getElementById('lastUpdate');
el.textContent = 'Modificado el: ' + document.lastModified;

*/

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


/*
var thumbVideo = document.getElementsByClassName("thumbnail");
var insertVideo = document.getElementById("mind_mind");			
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

console.log(urlEurobeatVideo[0])

*/