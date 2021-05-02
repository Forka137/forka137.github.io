import * as anm from "./anime-utils.js"

export 	var		songSelect = document.querySelectorAll('.songSelect'),
				menuSelect = document.querySelectorAll('.menuSelect'),
				songContainer = document.getElementById('songListContainer'),
				menuContainer = document.getElementById('menu'),
				goBack = document.getElementById('goBack'),
				songList = document.getElementById('s'),
				optionContainer = document.getElementById('optionContainer'),
				aboutContainer = document.getElementById('aboutContainer'),
				author = document.getElementById('author');

export function hideMenu() {
		menuContainer.style.display = 'none';
		anm.slideColumn(songContainer, '40vh', 500);
	}

export function showMenu(){
		menuContainer.style.display = 'block';
		anm.slideColumn(songContainer,'-40vh', 500);
	}

export function hideOtherDivs(){
		songContainer.style.display = 'none';
		goBack.style.display = 'none';
		optionContainer.style.display = 'none';
		aboutContainer.style.display = 'none';
	}

export function showSongList(){
		songContainer.style.display = 'block';
	}

export function showBackButton(){
		goBack.style.display = 'block';
	}

export function hideBackButton(){
		goBack.style.display = 'none';
	}

export function showOptions(){
		optionContainer.style.display = 'block';
	}

export function hideOptions(){
		optionContainer.style.display = 'none';
	}

export function showAbout(){
		aboutContainer.style.display = 'block';
	}

export function hideAbout(){
		aboutContainer.style.display = 'none';
	}

export function setMenuStyleDisplay(){
		menuSelect.forEach(function(element){
		element.style.display = 'block';
		});
	}

export function setDisplayNone(){
		songSelect.forEach(function(element){
		element.style.display = 'none';
		});
	}

export function updateSongList(){
	songSelect = document.querySelectorAll('.songSelect');
}

export function showAuthorAnimation(){
	author.innerHTML = author.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
	anm.aboutTextAnimated('#author .letter');
}