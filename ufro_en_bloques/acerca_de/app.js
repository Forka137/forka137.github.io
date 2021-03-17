function lightOn(element) {
	//console.log("se enciende el div");
	let w = window.innerWidth;
	if (w < 1024) element.style.backgroundColor = '#00396E';
}

function lightOff(element) {
	//console.log("se apaga el div");
	let w = window.innerWidth;
	if (w < 1024) element.style.backgroundColor = '#00407B';
}

const navSlide = () => {
	const burger = document.querySelector('.burger-button');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');

	burger.addEventListener('click', () =>{
		nav.classList.toggle('nav-active');
		//alterna el valor de la clase
		//animación sin librería, solo usando css
	navLinks.forEach((link, index) =>{
		if (link.style.animation) {
			link.style.animation = '';
		} else {
			link.style.animation = `navLinkFade 0.5s ease forwards ${index/2}s`;
		}
	});

	navLinks.forEach((link) => {
		link.addEventListener("mouseenter", (event) => {
		lightOn(link);
		});

	link.addEventListener("mouseleave", (event) => {
		lightOff(link);
		});
	});
});
		
}

navSlide();