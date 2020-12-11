    // Wrap every letter in a span
var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
document.addEventListener("DOMContentLoaded", function(event){
  anime.timeline({loop: false})
  .add({
    targets: '.tbox',
    scale: [5,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 1337
  }).add({
    targets: '.ml2 .letter',
    scale: [5,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el, i) => 137*i
  }).add({
    targets: '#barra_menu',
    scale: [5,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950
  }).add({
    targets: '.menu_unit',
    scale: [5,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 1500
  });
}); //dom loaded content






  // .add({                             //sirve para remover el texto
  //   targets: '.ml2',
  //   opacity: 0,
  //   duration: 1000,
  //   easing: "easeOutExpo",
  //   delay: 1000
  // });