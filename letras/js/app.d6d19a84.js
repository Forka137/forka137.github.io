(function(e){function t(t){for(var a,i,s=t[0],l=t[1],r=t[2],b=0,g=[];b<s.length;b++)i=s[b],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&g.push(o[i][0]),o[i]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);u&&u(t);while(g.length)g.shift()();return c.push.apply(c,r||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],a=!0,s=1;s<n.length;s++){var l=n[s];0!==o[l]&&(a=!1)}a&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},o={app:0},c=[];function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var r=0;r<s.length;r++)t(s[r]);var u=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0207":function(e,t,n){e.exports=n.p+"img/properties.0d5bd273.jpg"},"20e4":function(e,t,n){e.exports=n.p+"img/subtitle.20ca6bd1.jpg"},"2f73":function(e,t,n){},"30b3":function(e,t,n){e.exports=n.p+"img/background.6e94363f.png"},"3d46":function(e,t,n){},"4a67":function(e,t,n){"use strict";n("ba81")},5149:function(e,t,n){e.exports=n.p+"img/settings.29231fce.jpg"},"524c":function(e,t,n){"use strict";n("f869")},5329:function(e,t,n){"use strict";n("df22")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("7a23"),o={class:"container"};function c(e,t,n,c,i,s){var l=Object(a["k"])("AnimatedBackground"),r=Object(a["k"])("MiddleBar");return Object(a["h"])(),Object(a["c"])(a["a"],null,[Object(a["g"])(l),Object(a["g"])("div",o,[Object(a["g"])(r)])],64)}var i=Object(a["m"])("data-v-1aacf5ac"),s=i((function(e,t,n,o,c,i){var s=Object(a["k"])("Header"),l=Object(a["k"])("TabSelector"),r=Object(a["k"])("TabOne"),u=Object(a["k"])("TabTwo"),b=Object(a["k"])("TabThree");return Object(a["h"])(),Object(a["c"])("div",{class:"middleBar",style:{minHeight:c.verticalHeight}},[Object(a["g"])(s,{class:"header",title:"Letras"}),Object(a["g"])(l,{onCurrentTab:t[1]||(t[1]=function(e){return i.changeTab(e)})}),0==c.tab?(Object(a["h"])(),Object(a["c"])(r,{key:0})):1==c.tab?(Object(a["h"])(),Object(a["c"])(u,{key:1})):2==c.tab?(Object(a["h"])(),Object(a["c"])(b,{key:2})):Object(a["d"])("",!0)],4)})),l=(n("ac1f"),n("841c"),n("1276"),Object(a["m"])("data-v-fbdac39a"));Object(a["j"])("data-v-fbdac39a");var r={class:"outside-box"},u={class:"box"};Object(a["i"])();var b=l((function(e,t,n,o,c,i){return Object(a["h"])(),Object(a["c"])("div",r,[Object(a["g"])("div",u,[Object(a["g"])("h1",null,Object(a["l"])(n.title),1)])])})),g={name:"Header",props:{title:String},components:{}};n("d906");g.render=b,g.__scopeId="data-v-fbdac39a";var d=g,h=Object(a["m"])("data-v-0f1405f6");Object(a["j"])("data-v-0f1405f6");var p={class:"box"};Object(a["i"])();var f=h((function(e,t,n,o,c,i){return Object(a["h"])(),Object(a["c"])("div",p,[Object(a["g"])("ul",null,[Object(a["g"])("li",{class:"tab",onClick:t[1]||(t[1]=function(e){return i.setTab(0)})},"Home"),Object(a["g"])("li",{class:"tab",onClick:t[2]||(t[2]=function(e){return i.setTab(1)})},"Docs"),Object(a["g"])("li",{class:"tab",onClick:t[3]||(t[3]=function(e){return i.setTab(2)})},"About")])])})),j={name:"TabSelector",data:function(){return{tab:0}},methods:{setTab:function(e){this.$emit("currentTab",e),this.tab=e}},props:{},components:{}};n("f463");j.render=f,j.__scopeId="data-v-0f1405f6";var O=j,m=n("f80e"),y=n.n(m),v=n("854d"),w=n.n(v),k=n("62f0"),T=n.n(k),I=Object(a["m"])("data-v-012398f1");Object(a["j"])("data-v-012398f1");var x=Object(a["g"])("div",{class:"content",id:"content-one"},[Object(a["g"])("div",{class:"column-one"},[Object(a["g"])("h1",null,"A game to type your music!"),Object(a["g"])("p",null,[Object(a["f"])("Inspired by "),Object(a["g"])("a",{href:"https://osu.ppy.sh/home"},"osu!"),Object(a["f"])(" and "),Object(a["g"])("a",{href:"https://sites.google.com/site/ishotyping/"},"Isho Typing"),Object(a["f"])(", i've been developing a little music typing game. It has a built-in song editor, so just put your favorite songs in a folder, synchronize the lyrics, and you're ready to play! ")])]),Object(a["g"])("div",{class:"column-two"},[Object(a["g"])("video",{muted:"",autoplay:"",loop:"",src:y.a})])],-1),S=Object(a["g"])("div",{class:"content",id:"content-two"},[Object(a["g"])("div",{class:"column-one"},[Object(a["g"])("h2",null,"Features"),Object(a["g"])("ul",null,[Object(a["g"])("li",null,"User interface in English and Spanish"),Object(a["g"])("li",null,"Language support for lyrics in Japanese, Chinese and Korean scripts"),Object(a["g"])("li",null,"Spaces in lyrics will autocomplete so you can type faster!"),Object(a["g"])("li",null,"Customizable subtitles"),Object(a["g"])("li",null,"Built-in song editor")])]),Object(a["g"])("div",{class:"column-two"},[Object(a["g"])("img",{id:"scripts",src:w.a})])],-1),P=Object(a["g"])("div",{class:"content",id:"content-three"},[Object(a["g"])("div",{class:"column-one"},[Object(a["g"])("h2",null,"How to play"),Object(a["g"])("p",null,"After selecting a song, the music will start and the lyrics will come up on the screen, you need to type them using the keyboard when they reach the yellow area"),Object(a["g"])("p",null,"The only playable keys are the 26 letters from the US-Keyboard and the Enter key. This key is used for skip lyric lines, you should use it whenever you think you won't be able to type the current line. You can also press Escape to pause the game"),Object(a["g"])("p",null,[Object(a["f"])("You can find more information "),Object(a["g"])("a",{href:"./?tab=1"},"here")])]),Object(a["g"])("div",{class:"column-two"},[Object(a["g"])("img",{id:"playablekeys-img",src:T.a})])],-1),_=Object(a["g"])("div",{class:"content",id:"content-four"},[Object(a["g"])("div",{class:"column-one"},[Object(a["g"])("h2",null,"Download"),Object(a["g"])("p",null,"This game is only available for Windows"),Object(a["g"])("p",null,[Object(a["g"])("span",{class:"download"},[Object(a["g"])("a",{href:"https://drive.google.com/file/d/1G8TykXwN8lrQqEZ0fQL_FEozjTpyO8o9/view?usp=sharing"},"Letras + Song pack"),Object(a["f"])(),Object(a["g"])("span",{class:"fileSize"},"53.9 MB")])]),Object(a["g"])("p",null,[Object(a["g"])("span",{class:"download"},[Object(a["g"])("a",{href:"https://drive.google.com/file/d/1Dks30I7EPcZ0GYjcsCKXwkPZ3v2PRE0R/view?usp=sharing"},"Letras without songs"),Object(a["f"])(),Object(a["g"])("span",{class:"fileSize"},"24.8 MB")])]),Object(a["g"])("p",null,[Object(a["g"])("span",{class:"download"},[Object(a["g"])("a",{href:"https://drive.google.com/file/d/1v4DKA8bArAPgVqf1qU4cNaWiYK709tdb/view?usp=sharing"},"Songpack only"),Object(a["f"])(),Object(a["g"])("span",{class:"fileSize"},"29 MB")])]),Object(a["g"])("p",null,[Object(a["f"])("Last version: "),Object(a["g"])("b",null,"2021.09.03")])]),Object(a["g"])("div",{class:"column-two"},[Object(a["g"])("h2",null,"If you enjoyed the game consider to"),Object(a["g"])("a",{href:"https://ko-fi.com/R5R75FALD",target:"_blank"},[Object(a["g"])("img",{id:"kohi",height:"36",style:{border:"0px",height:"36px"},src:"https://cdn.ko-fi.com/cdn/kofi2.png?v=3",border:"0",alt:"Buy Me a Coffee at ko-fi.com"})]),Object(a["g"])("p",null,[Object(a["f"])("I receive suggestions and ideas at: "),Object(a["g"])("b",null,"letras.game.137@gmail.com")])])],-1);Object(a["i"])();var C=I((function(e,t,n,o,c,i){return Object(a["h"])(),Object(a["c"])(a["a"],null,[x,S,P,_],64)})),A={name:"TabOne",props:{},components:{}};n("9b5a");A.render=C,A.__scopeId="data-v-012398f1";var B=A,H=n("c16d"),E=n.n(H),M=n("f112"),z=n.n(M),F=n("0207"),Y=n.n(F),L=n("cac2"),U=n.n(L),W=n("20e4"),D=n.n(W),J=n("b6db"),q=n.n(J),G=n("b146"),K=n.n(G),N=n("af80"),R=n.n(N),Z=n("5149"),Q=n.n(Z),V=Object(a["m"])("data-v-cfc79b42");Object(a["j"])("data-v-cfc79b42");var X=Object(a["g"])("div",{id:"content-zero"},[Object(a["g"])("h1",null,"Documentation"),Object(a["g"])("div",{class:"column-one"},[Object(a["g"])("p",null,"In this section you will find all about the game."),Object(a["g"])("p",null,"Click or tap the titles below to open them.")])],-1),$=Object(a["g"])("div",{class:"content",id:"content-one"},[Object(a["g"])("div",{class:"column-one"},[Object(a["g"])("p",null,' The game comes with a folder called songs, you need to create a folder inside with the name of the song (or anything really). Inside that last folder you have to put a song in MP3 format and a background in JPG or PNG format. The background needs to be called "background". ')]),Object(a["g"])("div",{class:"column-two"},[Object(a["g"])("img",{id:"songFolder",src:E.a}),Object(a["g"])("p",null,"The song and the folder could have any name")])],-1),ee=Object(a["g"])("div",{class:"content",id:"content-two"},[Object(a["g"])("div",{class:"column-one"},[Object(a["g"])("p",null,"On the right you can select the songs you added to the song folder. You can scroll the list using the mousewheel or the arrow keys."),Object(a["g"])("p",null,"You can also search for any song, artist or author on the top search bar."),Object(a["g"])("p",null,"On the left is the preview information. it contains useful information about the CPM (characters per minute) through the song."),Object(a["g"])("p",null,"Every bar of the graph represents the CPM average of a section of the song. The total average is written on top of the graph.")]),Object(a["g"])("div",{class:"column-two"},[Object(a["g"])("img",{src:z.a}),Object(a["g"])("p",null,"Use the search bar to filter songs")])],-1),te=Object(a["g"])("div",{class:"content",id:"content-two"},[Object(a["g"])("div",{class:"column-one"},[Object(a["g"])("p",null,[Object(a["f"])(" The editor screen has 3 tabs, which are used to add information about the song, synchronize, and adding subtitles to the song."),Object(a["g"])("br")]),Object(a["g"])("h2",null,"Properties tab"),Object(a["g"])("p",null,"There are currently 4 options in this tab. you can input the name of the song, artist, preview time and who created the map."),Object(a["g"])("p",null,"The preview time, is the position in which the song will start in the select song menu."),Object(a["g"])("h2",null,"Input tab"),Object(a["g"])("p",null,[Object(a["f"])(" Here is where you put the lyrics that "),Object(a["g"])("strong",null,"you are going to type"),Object(a["f"])(", so they must contain any of the 26 letters of the US-Keyboard. It can also contain spaces and apostrophes in between letters, since these will be completed automatically in-game. ")]),Object(a["g"])("p",null,' *You can also put special characters such [ and ], this is explained on a latter section. (See "Fast lyrics" below) '),Object(a["g"])("p",null,' If you press the "Insert lyrics" button, you will get a pop-up window where you can paste lyrics. Then they will be automatically separated and put on the timing boxes. To time the lyrics, you need to press the "play" button to start the song, then you can add the times of the beginning and finish of every line by using the buttons "Set start", "Set end" or manually. You can also use the keys F9 and F10 instead of the buttons. '),Object(a["g"])("p",null," When the song is playing, a yellow bar will appear over the lyrics for the amount of time you set. "),Object(a["g"])("p",null,' Using the minus and plus sign buttons you can add a line below or delete it. Use the "Save" button to save the lyrics. They will be saved to a JSON file inside the song folder. '),Object(a["g"])("h2",null,"Subtitle tab"),Object(a["g"])("p",null,' Very similar to the previous tab, here you press the "Insert subtitles" button and you will be able to paste the lyrics of the song. These lyrics could be anything you want and they will be updated by every line. If you want a subtitle to be the same for many lines you just paste it many times as needed. ')]),Object(a["g"])("div",{class:"column-two"},[Object(a["g"])("img",{src:Y.a}),Object(a["g"])("p",null,"The save button saves everything!"),Object(a["g"])("img",{src:U.a}),Object(a["g"])("p",null,"Use F9 and F10 to set the start and end time respectively"),Object(a["g"])("img",{src:D.a}),Object(a["g"])("p",null,"Subtitles are optional!")])],-1),ne=Object(a["g"])("div",{class:"content",id:"content-three"},[Object(a["g"])("div",{class:"column-one"},[Object(a["g"])("p",null,"The position screen allows you to move the lyrics horizontally."),Object(a["g"])("p",null,"Click and drag the lyrics to wherever you like through the song. You can make the map more readable or make patterns with the words."),Object(a["g"])("p",null,"Just like on the input tab, you can seek the song using the player at the top of the screen")]),Object(a["g"])("div",{class:"column-two"},[Object(a["g"])("img",{src:q.a}),Object(a["g"])("p",null,"Remember to save after moving the lyrics!")])],-1),ae=Object(a["g"])("div",{class:"content",id:"content-three"},[Object(a["g"])("div",{class:"column-one"},[Object(a["g"])("p",null,'If you think a line of lyrics goes too fast, you can use the special characters " [ " and " ] "'),Object(a["g"])("p",null,'When you enter the character " [ " the line will turn into a "fast line". Now, the only characters that would be playable would be those inside square brackets'),Object(a["g"])("p",null,'The " ] " is actually not needed, but it makes it looks better. Technically only the letter on the right of the " [ " will be playable.'),Object(a["g"])("p",null,"By doing this, when you play the song you will only need to press the characters inside the brackets and the lyric will autocomplete itself"),Object(a["g"])("p",null,"Then when you play the song, the characters you put inside the brackets will be highlighted while the rest of the lyric will have only the outline")]),Object(a["g"])("div",{class:"column-two"},[Object(a["g"])("img",{src:K.a}),Object(a["g"])("p",null,"It's better to separate fast lines from normal lines"),Object(a["g"])("img",{src:R.a}),Object(a["g"])("p",null,"This is how it would look like while playing")])],-1),oe=Object(a["g"])("div",{class:"content",id:"content-three"},[Object(a["g"])("div",{class:"column-one"},[Object(a["g"])("p",null,"On this menu you can change the window size (you can also press Alt + Enter keys at anytime to change to fullscreen) and the interface language"),Object(a["g"])("p",null,"You can also play songs with the music player"),Object(a["g"])("p",null,'If you have problems with the information displayed for any song, try to reload them pressing the "reload songs" button'),Object(a["g"])("p",null,"On the bottom you can see the version of the game (when it was build) and the link to this website")]),Object(a["g"])("div",{class:"column-two"},[Object(a["g"])("img",{src:Q.a}),Object(a["g"])("p",null,"You can access the settings menu from the main screen")])],-1);Object(a["i"])();var ce=V((function(e,t,n,o,c,i){return Object(a["h"])(),Object(a["c"])(a["a"],null,[X,Object(a["g"])("ul",null,[Object(a["g"])("li",null,[Object(a["g"])("h1",{class:"listParent",onClick:t[1]||(t[1]=function(e){return i.toggle(0)})},"Where do i put the songs?")]),$,Object(a["g"])("li",null,[Object(a["g"])("h1",{class:"listParent",onClick:t[2]||(t[2]=function(e){return i.toggle(1)})},"Song selection menu")]),ee,Object(a["g"])("li",null,[Object(a["g"])("h1",{class:"listParent",onClick:t[3]||(t[3]=function(e){return i.toggle(2)})},"Editor tabs")]),te,Object(a["g"])("li",null,[Object(a["g"])("h1",{class:"listParent",onClick:t[4]||(t[4]=function(e){return i.toggle(3)})},"Position edition")]),ne,Object(a["g"])("li",null,[Object(a["g"])("h1",{class:"listParent",onClick:t[5]||(t[5]=function(e){return i.toggle(4)})},"Fast lyrics")]),ae,Object(a["g"])("li",null,[Object(a["g"])("h1",{class:"listParent",onClick:t[6]||(t[6]=function(e){return i.toggle(5)})},"Settings menu")]),oe])],64)})),ie={name:"TabTwo",data:function(){return{contentArray:document.getElementsByClassName("content")}},props:{},methods:{toggle:function(e){var t=this.contentArray[e];"none"==t.style.maxHeight?t.style.maxHeight=0:t.style.maxHeight="none"}},components:{}};n("524c");ie.render=ce,ie.__scopeId="data-v-cfc79b42";var se=ie,le=Object(a["m"])("data-v-500632ab");Object(a["j"])("data-v-500632ab");var re=Object(a["e"])('<div class="content" id="content-one" data-v-500632ab><div class="column-one" data-v-500632ab><h1 data-v-500632ab>About the game</h1><p data-v-500632ab> This game was made by Forka137 using Godot Engine 3. </p><p data-v-500632ab> I&#39;m a rhythm game fan and i like to type, so i wanted to create a game where i could type song lyrics. I looked through the internet and all i could find was IshoTyping.<br data-v-500632ab> I played it for a while, but making the songs was kind of hard and it wasn&#39;t very customizable, so this looked like a good project. </p><p data-v-500632ab> Also, i&#39;m a language learner. I&#39;ve been learning for a couple of years and i think this is also a great way to keep learning words. I believe getting input and listening to songs is very good.<br data-v-500632ab> Sometimes you are not able to understand what you listen to. But this time since you&#39;ll be typing them, you surely will know what they said! </p><p data-v-500632ab> I hope you like the game, i will continue updating it if people show interest on it. </p><p data-v-500632ab>Contact:<br data-v-500632ab><b data-v-500632ab>letras.game.137@gmail.com</b></p></div><div class="column-two" data-v-500632ab></div></div>',1),ue=Object(a["g"])("div",{class:"content",id:"content-two"},[Object(a["g"])("div",{class:"column-one"},[Object(a["g"])("h1",null,"Release video"),Object(a["g"])("div",{class:"videoWrapper"},[Object(a["g"])("iframe",{width:"560",height:"349",src:"https://www.youtube.com/embed/YJzvHErMGLo",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""})])]),Object(a["g"])("div",{class:"column-two"})],-1);Object(a["i"])();var be=le((function(e,t,n,o,c,i){return Object(a["h"])(),Object(a["c"])(a["a"],null,[re,ue],64)})),ge={name:"TabThree",props:{},components:{}};n("ce8f");ge.render=be,ge.__scopeId="data-v-500632ab";var de=ge,he={name:"MiddleBar",data:function(){return{tab:0,verticalHeight:window.innerHeight+"px"}},props:{},methods:{changeTab:function(e){this.tab=e}},components:{Header:d,TabSelector:O,TabOne:B,TabTwo:se,TabThree:de},mounted:function(){function e(e){var t=window.location.search.substring(1),n=t.split(e);return n[1]}var t=e("tab=");this.tab=t>0&&t<3?t:0}};n("4a67");he.render=s,he.__scopeId="data-v-1aacf5ac";var pe=he,fe=Object(a["m"])("data-v-43cc722a");Object(a["j"])("data-v-43cc722a");var je={id:"canvas",width:"900",height:"540"};Object(a["i"])();var Oe=fe((function(e,t,n,o,c,i){return Object(a["h"])(),Object(a["c"])("canvas",je)})),me=n("30b3"),ye=n.n(me),ve={name:"AnimatedBackground",mounted:function(){var e=document.getElementById("canvas"),t=e.getContext("2d"),n=35,a=0,o=60,c=0,i=new Image;function s(e){t.save(),t.translate(-e,0),t.drawImage(i,0,1080-i.height,1920,1080),t.drawImage(i,1920,1080-i.height,1920,1080),t.restore()}function l(){a=a<1920?a+n/o:0}function r(){var e=(new Date).getTime();o=1e3/(e-c),l(),s(a),requestAnimationFrame(r),c=e}i.src=ye.a,e.width=window.innerWidth,e.height=window.innerHeight,window.addEventListener("resize",(function(){e.width=window.innerWidth,e.height=window.innerHeight})),i.onload=function(){requestAnimationFrame(r),console.log("cargado")}}};n("5329");ve.render=Oe,ve.__scopeId="data-v-43cc722a";var we=ve,ke={name:"App",components:{MiddleBar:pe,AnimatedBackground:we}};n("b49d");ke.render=c;var Te=ke;Object(a["b"])(Te).mount("#app")},"5bec":function(e,t,n){},"62f0":function(e,t,n){e.exports=n.p+"img/playablekeys.6af5b80f.png"},"854d":function(e,t,n){e.exports=n.p+"img/scripts.d1e0f31c.png"},"8a17":function(e,t,n){},"9b5a":function(e,t,n){"use strict";n("2f73")},af80:function(e,t,n){e.exports=n.p+"img/fastwords2.04de24b1.jpg"},b146:function(e,t,n){e.exports=n.p+"img/fastwords.4c6cbcae.jpg"},b49d:function(e,t,n){"use strict";n("5bec")},b6db:function(e,t,n){e.exports=n.p+"img/position.b2bc4729.jpg"},ba81:function(e,t,n){},c16d:function(e,t,n){e.exports=n.p+"img/songfolder.11fbab93.png"},cac2:function(e,t,n){e.exports=n.p+"img/input.a5d69a62.jpg"},ce8f:function(e,t,n){"use strict";n("d888")},d888:function(e,t,n){},d906:function(e,t,n){"use strict";n("3d46")},df22:function(e,t,n){},f112:function(e,t,n){e.exports=n.p+"img/songselectmenu.5646389c.jpg"},f463:function(e,t,n){"use strict";n("8a17")},f80e:function(e,t,n){e.exports=n.p+"media/gameplay.5319b232.webm"},f869:function(e,t,n){}});
//# sourceMappingURL=app.d6d19a84.js.map