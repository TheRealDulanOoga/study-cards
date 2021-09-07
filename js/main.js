/*
TODO -->
*   flash card functionaliy
		-content array containing items with question and answer perameters
		-pick random question and display it in a div
		-when hovering and/or clicking on the tile, it flips or expands to show the answer
		-be able to choose gamemode
			-flash cards
			-quiz
			-display answer and type question
		-display correct or incorrect answer
*   settings
		-choose color theme presets as well as ability to make custom color theme
		-be able to make accounts
		-save settings (with cookies?)
*   making flash card templates
		-have layout for creating flash card templates
		-have option for saving templates with accounts
*   homepage layout
		-side navbar
			-account
			-settings
			-create new
		-grid of your templates
			-consists of a square with a color or gradient assigned in template settings
			-settings button
			-play as flash card button
			-play as quiz button
			-play with typing answers button 
*/

const MAIN = document.getElementById("link-content");
const NAVBAR = document.getElementById("navbar");
const NAVBAR_LINKS = document.querySelectorAll("[data-tab-target]");
const LINK_REFERENCES = document.querySelectorAll("[data-tab-content]");
const OPEN_NAVBAR_BUTTONS = document.querySelectorAll("[class=open-navbar-button]");
const CLOSE_NAVBAR_BUTTON = document.getElementById("close-navbar-button");
const FLASHCARD_GRID = document.getElementById("flashcard-grid");

const flashCards = [
	{
	"name": "spanish",
	"definitions": {
		"hola": "hello",
		"adios": "goodbye",
		"que tal": "what's up",
		"buenos dias": "good morning",
		"buenos tardes": "good afternoon",
		"buenos noches": "good night"
		}
	},

	{
	"name": "science",
	"definitions": {
		"a tube used to precisely measure liquids": "graduated cylinder",
		"a stand for a ring, normally used to hold up objects such as wire": "ring stand",
		"a container for liquids that does not measure precisely": "beaker",
		"a container for liquids that has a wide bottom and narrow neck": "erlenmeyer flask"
		}
	}
];

flashCards.forEach(card => {
	createHomePageCardDisplay(card);
});


NAVBAR_LINKS.forEach(tab => {
	tab.addEventListener('click', () => {
		const target = document.querySelector(tab.dataset.tabTarget);
		LINK_REFERENCES.forEach(tabContent => tabContent.classList.remove("active"));
		NAVBAR_LINKS.forEach(tabX => tabX.classList.remove("active"));
		target.classList.add("active");
		tab.classList.add("active");
	});
});

OPEN_NAVBAR_BUTTONS.forEach(button => {
	button.addEventListener('click', () => {
		if (NAVBAR.classList.contains("closed")) {
			openNavBar();
		} else closeNavBar();
	});
});

CLOSE_NAVBAR_BUTTON.addEventListener('click', () => {
	closeNavBar();
});

function openNavBar() {
	NAVBAR.style.width = "100px";
	MAIN.style.marginLeft = "100px";
	NAVBAR.classList.add("opened");
	NAVBAR.classList.remove("closed");
};

function closeNavBar() {
	NAVBAR.style.width = "0";
	MAIN.style.marginLeft = "0";
	NAVBAR.classList.add("closed");
	NAVBAR.classList.remove("opened");
};

function createHomePageCardDisplay(flashCard) {
	FLASHCARD_GRID.insertAdjacentHTML("beforeend", 
	`<div class="flashcard">
		<div class="big-section">`+ flashCard.name +`</div>
		<div id="edit"></div>
		<div id="play"></div>
		<div id="like"></div>
	</div>`
	);
};