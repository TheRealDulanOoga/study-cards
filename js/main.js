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
const QUIZ_GUI = document.getElementById('flashcards-quiz');
const CLOSE_QUIZ_BUTTON = document.querySelector('.quiz-back-button');

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
	createHomePageCardDisplay(card)
	let cardSelector = document.querySelector('#'+card.name);
	let bigSection = cardSelector.querySelector('.big-section');
	bigSection.addEventListener('click', () => openQuiz(card));
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
		if (NAVBAR.classList.contains("closed")) openNavBar();
		else closeNavBar();
	});
});

CLOSE_NAVBAR_BUTTON.addEventListener('click', closeNavBar);
CLOSE_QUIZ_BUTTON.addEventListener('click', closeQuiz);

function openNavBar() {
	NAVBAR.style.height = "70px";
	MAIN.style.marginTop = "70px";
	NAVBAR.classList.add("opened");
	NAVBAR.classList.remove("closed");
};

function closeNavBar() {
	NAVBAR.style.height = "0";
	MAIN.style.marginTop = "0";
	NAVBAR.classList.add("closed");
	NAVBAR.classList.remove("opened");
};

function openQuiz(inputCard) {
	QUIZ_GUI.style.width = "100%";
	closeNavBar();

	const flashcard = document.querySelector('.quiz-flashcard-display');
	const definitionCount = Object.keys(inputCard.definitions).length;
	var randomNumberArray = [];
	let j;
	for (let i = 0; i < definitionCount; i++) {
		do {
		j = Math.round(Math.random() * definitionCount);
		} while (!j == 3);
		randomNumberArray[i] = j;
	};
	flashcard.innerHTML = inputCard.name;
};

function closeQuiz() {
	QUIZ_GUI.style.width = "0";
}

function createHomePageCardDisplay(flashCard) {
	FLASHCARD_GRID.insertAdjacentHTML("beforeend", 
	`<div class="flashcard" id="`+flashCard.name+`">
		<div class="big-section">` + flashCard.name + `</div>
		<div id="flashcard-like" class="flashcard-modifier">
			<img src="icons/filled_star.svg" alt="Like"></img>
		</div>
		<div id="flashcard-edit" class="flashcard-modifier">
			<img src="icons/edit.svg" alt="Edit"></img>
		</div>
	</div>`
	);
};