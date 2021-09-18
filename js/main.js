const MAIN = document.getElementById("link-content");
const NAVBAR = document.getElementById("navbar");
const NAVBAR_LINKS = document.querySelectorAll("[data-tab-target]");
const LINK_REFERENCES = document.querySelectorAll("[data-tab-content]");
const OPEN_NAVBAR_BUTTONS = document.querySelectorAll("[class=open-navbar-button]");
const CLOSE_NAVBAR_BUTTON = document.getElementById("close-navbar-button");
const FLASHCARD_GRID = document.getElementById("flashcard-grid");
const QUIZ_GUI = document.getElementById('flashcards-quiz');
const CLOSE_QUIZ_BUTTON = document.querySelector('.quiz-back-button');
const NEW_FLASHCARD_FORM_GUI = document.getElementById('new-flashcard-form');
const NEW_FLASHCARD_BUTTON = document.getElementById('new-flashcard-button');
const CLOSE_NEW_FLASHCARD_FORM_BUTTON = document.querySelector('.new-card-back-button');
const FLASHCARD_DISPLAY = document.querySelector('.quiz-flashcard-display');

const flashCards = [
	{
	"name": "spanish",
	"definitions": [
			{
			definition: "hola",
			answer: "hello"
			},
			{
			definition: "adios",
			answer: "goodbye"
			},
			{
			definition: "que tal",
			answer: "what's up"
			},
			{
			definition: "buenos dias",
			answer: "good morning"
			},
			{
			definition: "buenas tardes",
			answer: "good afternoon"
			},
			{
			definition: "buenas noches",
			answer: "good night"
			}
		]
	},

	{
	"name": "science",
	"definitions": [
			{
			definition: "a tube used to precisely measure liquids",
			answer: "graduated cylinder"
			},
			{
			definition: "a stand for a ring, normally used to hold up objects such as wire",
			answer: "ring stand"
			},
			{
			definition: "a container for liquids that does not measure precisely",
			answer: "beaker"
			},
			{
			definition: "a container for liquids that has a wide bottom and narrow neck",
			answer: "erlenmeyer flask"
			},
		]
	}
];

var openQuizEventController;

CLOSE_NAVBAR_BUTTON.addEventListener('click', closeNavBar);
CLOSE_QUIZ_BUTTON.addEventListener('click', closeQuiz);
CLOSE_NEW_FLASHCARD_FORM_BUTTON.addEventListener('click', closeNewFlashcardForm);
NEW_FLASHCARD_BUTTON.addEventListener('click', openNewFlashcardForm);

flashCards.forEach(card => {
	createHomePageCardDisplay(card);
	let cardSelector = document.querySelector('#' + card.name);
	let bigSection = cardSelector.querySelector('.big-section');
	bigSection.addEventListener('click', openQuiz.bind(null, card));
});

NAVBAR_LINKS.forEach(tab => {
	if (!(tab.id === 'close-navbar-button' || tab.id === 'new-flashcard-button')) {
		tab.addEventListener('click', () => {
			const target = document.querySelector(tab.dataset.tabTarget);
			LINK_REFERENCES.forEach(tabContent => tabContent.classList.remove("active"));
			NAVBAR_LINKS.forEach(link => link.classList.remove("active"));
			target.classList.add("active");
			tab.classList.add("active");
		});
	};
});

OPEN_NAVBAR_BUTTONS.forEach(button => {
	button.addEventListener('click', () => {
		if (NAVBAR.classList.contains("closed")) openNavBar();
		else closeNavBar();
	});
});

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
	var definitionCount = inputCard.definitions.length;
	var randomNumberArray = [];
	var clickCount = 1;
	var j = 0;
	for (let i = 0; i < definitionCount; i++) {
		if (randomNumberArray.includes(j)) {
			i--;
		} else {
			randomNumberArray.push(j);
		};
		j = Math.floor(getRandomMinMax(0, definitionCount));
	};
	FLASHCARD_DISPLAY.innerHTML = inputCard.definitions[randomNumberArray[0]].definition;
	openQuizEventController = new AbortController();
	document.addEventListener('keyup', e => {
		if (e.code === 'Enter' || e.code === 'Space') {
			e.preventDefault;
			if (clickCount % 2 === 0) {
				FLASHCARD_DISPLAY.innerHTML = inputCard.definitions[randomNumberArray[clickCount / 2]].definition;
			} else FLASHCARD_DISPLAY.innerHTML += ' = ' + inputCard.definitions[randomNumberArray[(clickCount - 1) / 2]].answer;
			clickCount = (clickCount + 1) % (definitionCount * 2);
		};
	}, { signal: openQuizEventController.signal});
};

function closeQuiz() {
	QUIZ_GUI.style.width = "0";
	openQuizEventController.abort();
}

function openNewFlashcardForm() {
	NEW_FLASHCARD_FORM_GUI.style.width = "100%";
	const form = NEW_FLASHCARD_FORM_GUI.querySelector("form");
	form.innerHTML = `
		<div id="inputs">
			<input type="text" name="name" placeholder="Flashcard Name" required />
			<div>
				<input type="text" name="definition-1" placeholder="Definition #1" required />
				<input type="text" name="answer-1" placeholder="Answer #1" required />
			</div>
		</div>
		<div class="form-modifier-buttons">
			<div id="add-list-definitions">
				<img src="icons/add.svg" alt="Add Flashcard"/>
			</div>
			<div id="remove-list-definitions">
				<img src="icons/remove.svg" alt="Add Flashcard"/>
			</div>
			<input type="submit">
		</div>`;
	var definitionInputsAmount = 1;
	const formInputs = NEW_FLASHCARD_FORM_GUI.querySelector("#inputs");

	document.querySelector('#add-list-definitions').addEventListener('click', () => {
		definitionInputsAmount++;
		formInputs.insertAdjacentHTML("beforeend",
		`<div id="input-` + definitionInputsAmount + `">
			<input type="text" name="definition-` + definitionInputsAmount + `" placeholder="Definition #` + definitionInputsAmount + `" required />
			<input type="text" name="answer-` + definitionInputsAmount + `" placeholder="Answer #` + definitionInputsAmount + `" required />
		</div>`
		);
	});
	document.querySelector('#remove-list-definitions').addEventListener('click', () => {
		let divToRemove = document.querySelector('#input-' + definitionInputsAmount);
		try {
			formInputs.removeChild(divToRemove);
			definitionInputsAmount--;
		} catch (error) {};
	});
	closeNavBar();
};

function closeNewFlashcardForm() {
	NEW_FLASHCARD_FORM_GUI.style.width = "0";
};

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

function getRandomMinMax(min, max) {
	return Math.random() * (max - min) + min;
};

// function removeListeners(object, listenerType, extraPerams) {
// 	object.addEventListener(listenerType, stopProp, extraPerams);
// };

// function stopProp(e) {
//     e.stopImmediatePropagation();
// };
