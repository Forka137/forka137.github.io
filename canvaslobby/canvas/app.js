var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
//c adquiere todos los métodos para 2d.

//variables
var fontHeight = 20,
	margin = 35,
	handTruncation = canvas.width/25,
	hourHandTruncation = canvas.width/10,
	numeralSpacing = 20,
	radius = canvas.height/2 - margin,
	handRadius = radius + numeralSpacing,
	x = canvas.width/2,	
	y = canvas.height/2;				//(x,y) del centro			

//funciones

function drawCircle() {
	c.beginPath();
	c.arc(x, y, radius, 0, Math.PI*2, true);
	c.lineWidth = 6;
	c.stroke();	
}

function drawNumerals(){
	var numerals = [1,2,3,4,5,6,7,8,9,10,11,12],
		angle = 0,
		numeralWidth = 0;

	numerals.forEach(function(numeral){
		angle = Math.PI/6 * (numeral-3);
		numeralWidth = c.measureText(numeral).width;
		c.fillText(numeral, x + handRadius*Math.cos(angle) - numeralWidth/2,
					 		y + handRadius*Math.sin(angle) + fontHeight/3);
	});
}

function drawCenter(){
	c.beginPath();
	c.arc(x, y, 5, 0, Math.PI*2, true);
	c.fill();
}

function drawHand(loc, isHour, weight){
	var angle = (Math.PI*2) * (loc/60) - Math.PI/2,
		handRadius = isHour ? radius - handTruncation - hourHandTruncation
							: radius - handTruncation;
	c.moveTo(x,y);
	c.lineTo(x + handRadius*Math.cos(angle),y + handRadius*Math.sin(angle));
	c.lineWidth = weight;
	c.stroke();
}

function drawHands(){
	var date = new Date,
		hour = date.getHours();

	hour = hour > 12 ? hour -12 : hour;

	drawHand(hour*5 + (date.getMinutes()/60)*5,true,6);
	drawHand(date.getMinutes(), false,4);
	drawHand(date.getSeconds(), false,2);
}

function drawClock(){
	c.clearRect(0,0,x*2,y*2); 	//limpia el canvas desde (0,0) hasta los límites.

	drawCircle();
	drawCenter();
	drawHands();
	drawNumerals();
}

//iniciar reloj

c.font = fontHeight + "px Arial";
loop = setInterval(drawClock, 1000);

/*
c.fillStyle = 'rgba(255, 0, 0, 0.5)';
c.fillRect(100, 100, 100, 100);
c.fillRect(300, 100, 100, 100);
c.fillRect(500, 100, 100, 100);
c.fillRect(700, 100, 100, 100);
c.fillStyle = 'rgba(0, 0, 255, 0.5)';
c.fillRect(100, 300, 100, 100);
c.fillRect(100, 500, 100, 100);

c.beginPath();
c.arc(600, 400, 50, 0, Math.PI * 2, false);
c.strokeStyle = 'green';
c.stroke();

*/