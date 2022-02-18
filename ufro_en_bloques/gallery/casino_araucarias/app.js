function lightOn(element) {
	// console.log("se enciende el div");
	const w = window.innerWidth;
	if (w < 1024) element.style.backgroundColor = '#00396E';
}

function lightOff(element) {
	// console.log("se apaga el div");
	const w = window.innerWidth;
	if (w < 1024) element.style.backgroundColor = '#00407B';
}

const navSlide = () => {
	const burger = document.querySelector('.burger-button');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');

	burger.addEventListener('click', () => {
		nav.classList.toggle('nav-active');
		// alterna el valor de la clase
		// animación sin librería, solo usando css
		navLinks.forEach((link, index) => {
			if (link.style.animation) {
				link.style.animation = '';
			}
			else {
				link.style.animation = `navLinkFade 0.5s ease forwards ${index / 2}s`;
			}
		});
	});
	navLinks.forEach((link) => {
		link.addEventListener('mouseenter', () => {
			lightOn(link);
		});
		link.addEventListener('mouseleave', () => {
			lightOff(link);
		});
	});
};

navSlide();

const imgNames = [
	'Entrada y cenicero',
	'Primer piso',
	'Segundo piso',
	'Entrada por detrás',
];

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
	showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
	let i;
	const slides = document.getElementsByClassName("mySlides");
	const dots = document.getElementsByClassName("dot");
	const text = document.getElementById("imageText");
	if (n > slides.length) {slideIndex = 1;}
	if (n < 1) {slideIndex = slides.length;}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
	}
	for (i = 0; i < dots.length; i++) {
  		dots[i].className = dots[i].className.replace(" active", "");
  	}
  	slides[slideIndex - 1].style.display = "flex";
  	dots[slideIndex - 1].className += " active";
  	text.innerHTML = imgNames[slideIndex - 1];
  }