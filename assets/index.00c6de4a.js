import{a,o as l,c,t as h,b as r,d as n,p as v,e as f,f as m,n as g,g as b,h as y}from"./vendor.9d1bff3c.js";const I=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}};I();var p=(e,i)=>{const o=e.__vccOpts||e;for(const[d,t]of i)o[d]=t;return o};const w={name:"AnimatedName",data(){return{}},props:{},methods:{},components:{},mounted(){let e=document.querySelector(".title");e.innerHTML=e.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),document.addEventListener("DOMContentLoaded",function(i){a.timeline({loop:!1}).add({targets:".title span",opacity:[0,1],duration:2e3,easing:"easeOutExpo"},300)})}},$={class:"title"};function x(e,i,o,d,t,s){return l(),c("h1",$,"Forka137")}var k=p(w,[["render",x],["__scopeId","data-v-6e25bd30"]]);const D={name:"Index",data(){return{}},props:{target:{type:String,default:"#"},text:{type:String,default:"[no text]"},id:{type:String,default:"link0"}},methods:{rise(){let e="#"+this.id;a.remove(e),a({targets:e,translateY:[-10],duration:1e3,easing:"easeOutExpo"})},fall(){let e="#"+this.id;a.remove(e),a({targets:e,translateY:[0],duration:1e3,easing:"easeOutExpo"})}},components:{},mounted(){}},E=["id","href"];function P(e,i,o,d,t,s){return l(),c("a",{id:o.id,href:o.target,onMouseover:i[0]||(i[0]=(...u)=>s.rise&&s.rise(...u)),onMouseleave:i[1]||(i[1]=(...u)=>s.fall&&s.fall(...u))},h(o.text),41,E)}var _=p(D,[["render",P],["__scopeId","data-v-9f811002"]]);const S={class:"pages"},L={name:"Index",data(){return{}},props:{},methods:{},components:{},mounted(){a.timeline().add({targets:".pages",opacity:[0,1],duration:2e3,easing:"easeOutExpo"},800)}},O=Object.assign(L,{setup(e){return(i,o)=>(l(),c("div",S,[r(_,{text:"Inicio",target:"#",id:"link1"}),r(_,{text:"Webm",target:"#webm",id:"link2"}),r(_,{text:"Canvas",target:"#canvas",id:"link3"}),r(_,{text:"Minecraft",target:"#minecraft",id:"link4"}),r(_,{text:"Letras",target:"#letras",id:"link5"})]))}});var C=p(O,[["__scopeId","data-v-5d905ac4"]]),B="/assets/webm_preview.c6881047.webm";const M={name:"Webm",data(){return{visible:!1,id:"webm",title:"/wsg/ webm",containerID:"webmContainer",targetID:"#webmContainer"}},props:{scrollPoint:{type:Number,default:100},after:{type:Number,default:300}},methods:{appear(){a.remove(this.targetID);let e=a.timeline();this.unhide(),this.restartVideo(),e.add({targets:this.targetID,opacity:[0,1],duration:1e3,easing:"easeOutExpo"})},disappear(){a.remove(this.targetID);let e=a.timeline();e.add({targets:this.targetID,opacity:[1,0],duration:1e3,easing:"easeOutExpo"}),e.finished.then(this.hide)},show(e){e>this.scrollPoint&&!this.visible?(this.appear(),this.visible=!0):e<this.scrollPoint&&this.visible?(this.disappear(),this.visible=!1):e<this.after&&this.visible&&window.history.replaceState(this.id,this.title,"/#"+this.id)},hide(){let e=document.getElementById(this.containerID);e.style.visibility="hidden"},unhide(){let e=document.getElementById(this.containerID);e.style.visibility="visible"},restartVideo(){let e=document.getElementById("webmPreview");e.currentTime=0}},components:{},mounted(){}},N=e=>(v("data-v-62190d8f"),e=e(),f(),e),q=["id"],j={class:"header"},V=["id"],A={href:"https://forka137.github.io/webm/",target:"_blank"},T=N(()=>n("div",{class:"content"},[n("p",null,"Esta p\xE1gina contiene una peque\xF1a colecci\xF3n de mis videos favoritos del board /wsg/. Estos videos son cortos y todos estan en formato Webm."),n("a",{href:"https://forka137.github.io/webm/eurobeat/",target:"_blank"},[n("video",{id:"webmPreview",muted:"",autoplay:"",loop:"",src:B})]),n("p",{class:"img_footer"},[n("i",null,"Secci\xF3n Eurobeat Edits")]),n("p",null,"Esta fue mi primera p\xE1gina que hice luego de aprender un poco de javascript."),n("p",null,"La p\xE1gina tiene 3 categor\xEDas, los videos se ordenan de manera aleatoria y solo se cargan las miniaturas. Esto significa que es bastante eficiente ya que no carga todos los videos al mismo tiempo (Me enorgullezco). Los videos est\xE1n alojados en Discord.")],-1));function F(e,i,o,d,t,s){return l(),c("div",{class:"container",id:t.containerID},[n("div",j,[n("h1",{id:t.id},[n("a",A,h(t.title),1)],8,V)]),T],8,q)}var W=p(M,[["render",F],["__scopeId","data-v-62190d8f"]]),Y="/assets/canvas_preview.a8438c58.webm";const z={name:"Canvas",data(){return{visible:!1,id:"canvas",title:"Canvas HTML 5",containerID:"canvasContainer",targetID:"#canvasContainer"}},props:{scrollPoint:{type:Number,default:100},after:{type:Number,default:300}},methods:{appear(){window.history.replaceState(this.id,this.title,"/#"+this.id),a.remove(this.targetID);let e=a.timeline();this.unhide(),this.restartVideo(),e.add({targets:this.targetID,opacity:[0,1],duration:1e3,easing:"easeOutExpo"})},disappear(){a.remove(this.targetID);let e=a.timeline();e.add({targets:this.targetID,opacity:[1,0],duration:1e3,easing:"easeOutExpo"}),e.finished.then(this.hide)},show(e){e>this.scrollPoint&&!this.visible?(this.appear(),this.visible=!0):e<this.scrollPoint&&this.visible?(this.disappear(),this.visible=!1):e<this.after&&this.visible&&window.history.replaceState(this.id,this.title,"/#"+this.id)},hide(){let e=document.getElementById(this.containerID);e.style.visibility="hidden"},unhide(){let e=document.getElementById(this.containerID);e.style.visibility="visible"},restartVideo(){let e=document.getElementById("canvasPreview");e.currentTime=0}},components:{},mounted(){}},G=["id"],H={class:"header"},U=["id"],R={href:"https://forka137.github.io/canvaslobby/",target:"_blank"},K=m('<div class="content" data-v-c72b89f2><p data-v-c72b89f2>Aqu\xED est\xE1n las animaciones que hice luego de leer un peque\xF1o libro de canvas en HTML5 (Autor: David Geary).</p><a href="https://forka137.github.io/canvaslobby/canvas9" target="_blank" data-v-c72b89f2><video id="canvasPreview" muted autoplay loop src="'+Y+'" data-v-c72b89f2></video></a><p class="img_footer" data-v-c72b89f2><i data-v-c72b89f2>Este el canvas 9: Animaci\xF3n con Paralaje</i></p><p data-v-c72b89f2>Cada uno de los canvas esta en orden con de acuerdo a mi avance en el libro. Tambi\xE9n hice una <a href="https://forka137.github.io/canvaslobby/canvas7/" target="_blank" data-v-c72b89f2><span class="inline_link" data-v-c72b89f2>animaci\xF3n</span></a> de un mecanismo de biela manivela y pist\xF3n inspirado en una asignatura de la universidad.</p><p data-v-c72b89f2>Sin duda aqu\xED fue donde de verdad aprend\xED javascript y comenz\xF3 mi inter\xE9s por el desarrollo de juegos.</p></div>',1);function J(e,i,o,d,t,s){return l(),c("div",{class:"container",id:t.containerID},[n("div",H,[n("h1",{id:t.id},[n("a",R,h(t.title),1)],8,U)]),K],8,G)}var Q=p(z,[["render",J],["__scopeId","data-v-c72b89f2"]]),X="/assets/minecraft_preview.ed7114d0.webm";const Z={name:"Minecraft",data(){return{visible:!1,id:"minecraft",title:"Proyecto de Minecraft",containerID:"minecraftContainer",targetID:"#minecraftContainer"}},props:{scrollPoint:{type:Number,default:100},after:{type:Number,default:300}},methods:{appear(){window.history.replaceState(this.id,this.title,"/#"+this.id),a.remove(this.targetID);let e=a.timeline();this.unhide(),this.restartVideo(),e.add({targets:this.targetID,opacity:[0,1],duration:1e3,easing:"easeOutExpo"})},disappear(){a.remove(this.targetID);let e=a.timeline();e.add({targets:this.targetID,opacity:[1,0],duration:1e3,easing:"easeOutExpo"}),e.finished.then(this.hide)},show(e){e>this.scrollPoint&&!this.visible?(this.appear(),this.visible=!0):e<this.scrollPoint&&this.visible?(this.disappear(),this.visible=!1):e<this.after&&this.visible&&window.history.replaceState(this.id,this.title,"/#"+this.id)},hide(){let e=document.getElementById(this.containerID);e.style.visibility="hidden"},unhide(){let e=document.getElementById(this.containerID);e.style.visibility="visible"},restartVideo(){let e=document.getElementById("minecraftPreview");e.currentTime=0}},components:{},mounted(){}},ee=["id"],te={class:"header"},ie=["id"],ae={href:"https://forka137.github.io/ufro_en_bloques/",target:"_blank"},se=m('<div class="content" data-v-3c930317><p data-v-3c930317>En esta p\xE1gina se encuentran muchas fotos de mi proyecto de construcci\xF3n de la Universidad de La Frontera en Minecraft.</p><a href="https://forka137.github.io/ufro_en_bloques/" target="_blank" data-v-3c930317><video id="minecraftPreview" muted autoplay loop src="'+X+'" data-v-3c930317></video></a><p class="img_footer" data-v-3c930317><i data-v-3c930317>Vista a\xE9rea de la calle Uruguay</i></p><p data-v-3c930317>Este proyecto lo comenc\xE9 en octubre del a\xF1o 2020 durante la pandemia. Al principio lo mantuve en secreto, y luego invit\xE9 a mis amigos a jugar. Cerca de noviembre del mismo a\xF1o cree una p\xE1gina de instagram (<a href="https://www.instagram.com/ufro_en_bloques/" target="_blank" class="inline_link" data-v-3c930317>@ufro_en_bloques</a>) donde la gente me dejaba bonitos comentarios.</p><p data-v-3c930317>Por \xFAltimo, con ayuda de Unicraft, realizamos un evento el 2021 en donde el server estuvo abierto y tuvimos casi 100 visitantes simultaneos.</p></div>',1);function ne(e,i,o,d,t,s){return l(),c("div",{class:"container",id:t.containerID},[n("div",te,[n("h1",{id:t.id},[n("a",ae,h(t.title),1)],8,ie)]),se],8,ee)}var oe=p(Z,[["render",ne],["__scopeId","data-v-3c930317"]]),re="/assets/gameplay.3f107dfc.webm";const de={name:"Letras",data(){return{visible:!1,id:"letras",title:"Letras",containerID:"letrasContainer",targetID:"#letrasContainer"}},props:{scrollPoint:{type:Number,default:100},after:{type:Number,default:300}},methods:{appear(){window.history.replaceState(this.id,this.title,"/#"+this.id),a.remove(this.targetID);let e=a.timeline();this.unhide(),this.restartVideo(),e.add({targets:this.targetID,opacity:[0,1],duration:1e3,easing:"easeOutExpo"})},disappear(){a.remove(this.targetID);let e=a.timeline();e.add({targets:this.targetID,opacity:[1,0],duration:1e3,easing:"easeOutExpo"}).add({targets:this.targetID,translateY:0}),e.finished.then(this.hide)},show(e){e>this.scrollPoint&&!this.visible?(this.appear(),this.visible=!0):e<this.scrollPoint&&this.visible?(this.disappear(),this.visible=!1):e<this.after&&this.visible&&window.history.replaceState(this.id,this.title,"/#"+this.id)},hide(){let e=document.getElementById(this.containerID);e.style.visibility="hidden"},unhide(){let e=document.getElementById(this.containerID);e.style.visibility="visible"},restartVideo(){let e=document.getElementById("letrasPreview");e.currentTime=0}},components:{},mounted(){}},le=["id"],ce={class:"header"},pe=["id"],ue={href:"https://forka137.github.io/letras/",target:"_blank"},_e=m('<div class="content" data-v-df4bb426><p data-v-df4bb426>P\xE1gina de mi juego &quot;Letras&quot;. Contiene links de descargas, documentaci\xF3n y canciones.</p><a href="https://forka137.github.io/letras/" target="_blank" data-v-df4bb426><video id="letrasPreview" muted autoplay loop src="'+re+'" data-v-df4bb426></video></a><p class="img_footer" data-v-df4bb426><i data-v-df4bb426>Gameplay de Lagtrain (inabakumori)</i></p><p data-v-df4bb426>Letras es mi primer juego creado con <a href="https://godotengine.org" target="_blank" class="inline_link" data-v-df4bb426>Godot Engine</a>. Consiste en escribir la letra de una canci\xF3n mientras la escuchas. El juego lo cree con el objetivo de aprender Godot, mejorar como programador y adem\xE1s aprendar m\xE1s palabras en japon\xE9s.</p><p data-v-df4bb426>Se pueden crear tus propias canciones y usar como reproductor de m\xFAsica (similar al osu!). Estoy muy orgulloso de este proyecto.</p></div>',1);function he(e,i,o,d,t,s){return l(),c("div",{class:"container",id:t.containerID},[n("div",ce,[n("h1",{id:t.id},[n("a",ue,h(t.title),1)],8,pe)]),_e],8,le)}var me=p(de,[["render",he],["__scopeId","data-v-df4bb426"]]);const ve={name:"Footer",data(){return{}},props:{},methods:{},components:{},mounted(){}},fe=e=>(v("data-v-183861fb"),e=e(),f(),e),ge={class:"container"},be=fe(()=>n("div",{class:"footer"},[n("p",null,"Forka137 - 2022")],-1)),ye=[be];function Ie(e,i,o,d,t,s){return l(),c("div",ge,ye)}var we=p(ve,[["render",Ie],["__scopeId","data-v-183861fb"]]);const $e={name:"MiddleBar",data(){return{opacity:0,finished:!1}},props:{color:{type:String,default:"230, 243, 255"}},components:{},created(){window.addEventListener("scroll",this.handleScroll)},mounted(){a.timeline({loop:!1}).add({targets:".bar",translateY:[100,0],duration:1e3,easing:"spring(1, 100, 10, 0)"},400),history.scrollRestoration?history.scrollRestoration="manual":window.onbeforeunload=function(){window.scrollTo(0,0)}},computed:{bgColor(){return`rgba(${this.color}, ${this.opacity})`}},methods:{handleScroll(e){let i=window.pageYOffset;this.$refs.webm.show(i),this.$refs.canvas.show(i),this.$refs.minecraft.show(i),this.$refs.letras.show(i),this.backgroundOpacity(i),i==0&&window.history.replaceState("home","Home","/")},backgroundOpacity(e){if(e<300){let i=e/333;this.opacity=i,this.finished=!1}else this.opacity=.9,this.finished=!0}}},xe=Object.assign($e,{setup(e){return(i,o)=>(l(),c("div",{class:"bar",style:g({"background-color":i.bgColor})},[r(k),r(C),r(W,{ref:"webm",scrollPoint:90,after:800},null,512),r(Q,{ref:"canvas",scrollPoint:800,after:1800},null,512),r(oe,{ref:"minecraft",scrollPoint:1800,after:2600},null,512),r(me,{ref:"letras",scrollPoint:2600},null,512),r(we)],4))}});var ke=p(xe,[["__scopeId","data-v-e4831404"]]);const De={setup(e){return(i,o)=>(l(),b(ke))}};y(De).mount("#app");