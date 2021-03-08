var //listaSelect = document.getElementsByClassName('listaSelect'),
	listaSelect = document.querySelectorAll('.listaSelect'),
	ventana = document.getElementById('ventana'),
	canvasBlock = document.getElementById('canvasBlock'),
	firma = document.getElementById('firma'),
	fadeTime = 500,

	canvasList = ['canvas/index.html',
				  'canvas2/index.html',
				  'canvas3/index.html',
				  'canvas4/index.html',
				  'canvas5/index.html',
				  'canvas6/index.html',
				  'canvas7/index.html',
				  'canvas8/index.html'];

function lightOn(element) {
	anime.remove(element);	//interrumpe la animación anterior
	anime({
	  targets: element,
	  color: 'rgb(255, 255, 255)',
	  duration: 10,
	  scale:1.02,
	  easing: 'easeInOutQuad'
	});
	//console.log("se enciende");
}

function lightOff(element) {
	anime({
	  targets: element,
	  color: 'rgb(190, 190, 190)',
	  duration: fadeTime,
	  scale:1,
	  easing: 'easeInOutQuad'
	});
	//console.log("se apaga");
}

function createIframe(element, number) {
	let ref = canvasList[number];
	//parche para el tamaño
	let width, height;
	if (number < 4){
		width = 800,
		height = 600;
	} else {
		width = 900,
		height = 590;
	}
	element.innerHTML = `<iframe id="ventana" src="${ref}" scrolling="no" width="${width}" height="${height}"></iframe>`;
	ventana = document.getElementById('ventana');
	//console.log("se crea ventana"+ref);
	animateVentana();
}

function animateVentana() {
	ventana.style.transform = "translate(-1000px) scale(0.2)";
	anime.remove(ventana);
	var t1 = anime.timeline({
		easing: 'easeOutExpo',
		duration: 1000
	})
	t1.add({
		targets: ventana,
		duration: 500,
		translateX: 1000
	})
	.add({
		targets: ventana,
		scale: 1
	},500);
}

function animateFirma() {
	anime.remove(firma);
	firma.style.transform = 'scale(1) ';
	anime({
	  targets: firma,
	  duration: 600,
	  scale:1.05,
	  direction: 'alternate'
	});
}

//inicio

//listeners para el menú
for (let i = 0; i < listaSelect.length; i++) {												
	listaSelect[i].addEventListener("mouseenter", (event) => {
		lightOn(listaSelect[i]);
	});

	listaSelect[i].addEventListener("mouseleave", (event) => {
		lightOff(listaSelect[i]);
	});
}

//listeners de click para cada iframe
for (let i = 0; i < canvasList.length; i++){
	listaSelect[i].addEventListener("click", (event) => {
	createIframe(canvasBlock, i);
	});
}

firma.addEventListener("mouseenter", (event) => {
animateFirma();
});

ventana.onload = function(){
    ventana.style.height = ventana.contentWindow.document.body.scrollHeight + 'px';
    ventana.style.width = ventana.contentWindow.document.body.scrollWidth + 'px';
}
