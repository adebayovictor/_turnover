let imagesArray = [
	{ name: "charles", img: "img/charles.jpg", },
	{ name: "charles", img: "img/charles.jpg", },
	{ name: "kat-smith", img: "img/kat-smith.jpg", },
	{ name: "kat-smith", img: "img/kat-smith.jpg", },
	{ name: "alexandru", img: "img/alexandru.jpg", },
	{ name: "alexandru", img: "img/alexandru.jpg", },
	{ name: "chevanon", img: "img/chevanon.jpg", },
	{ name: "chevanon", img: "img/chevanon.jpg", },
	{ name: "ilargian", img: "img/ilargian.jpg", },
	{ name: "ilargian", img: "img/ilargian.jpg", },
	{ name: "muhannad", img: "img/muhannad.jpg", },
	{ name: "muhannad", img: "img/muhannad.jpg", },
	{ name: "nishizuka", img: "img/nishizuka.jpg", },
	{ name: "nishizuka", img: "img/nishizuka.jpg", },
	{ name: "steshka", img: "img/steshka.jpg", },
	{ name: "steshka", img: "img/steshka.jpg", },
	{ name: "simona", img: "img/simona.jpg", },
	{ name: "simona", img: "img/simona.jpg", },
	{ name: "pixabay", img: "img/pixabay.jpg", },
	{ name: "pixabay", img: "img/pixabay.jpg", },
	{ name: "pixabay-2", img: "img/pixabay-2.jpg", },
	{ name: "pixabay-2", img: "img/pixabay-2.jpg", },
	{ name: "pixabay-160", img: "img/pixabay-160.jpg", },
	{ name: "pixabay-160", img: "img/pixabay-160.jpg", },
]

//Defining Variables
let grid;
let scoreBoard;
let popup;
let playAgain;
let clickBoard;

let imgs;
let cardPairSelected = [];
const cardsSelected = [];
const cardArray = [];
let cardsWon = 0;
let clicks = 0;

document.addEventListener("DOMContentLoaded",
	function () {
		// DOM Variables init
		//Defining Variables And Geting Dom Element

		grid = document.querySelector(".grid");
		scoreBoard = document.querySelector(".scoreboard");
		popup = document.querySelector(".popup");
		playAgain = document.querySelector(".playAgain");
		clickBoard = document.querySelector(".clickboard");

		// create the board
		createBoard(grid, imagesArray);
		arrangeCard();
		playAgain.addEventListener("click", replay);
	});

//CreateBoard Function
function createBoard(grid, array) {
	popup.style.display = "none";
	// create placeholder cards
	array.forEach((_, index) => {
		let img = document.createElement("img");
		img.setAttribute("src", "https://res.cloudinary.com/fakod29/image/upload/v1604561420/blank_d3g5ij.png");
		img.setAttribute("data-id", index);
		img.width = 200;
		img.height = 200;
		grid.appendChild(img);
		img.addEventListener("click", flipCard)

		// add placeholder cards to array
		cardArray.push(img);
	})
}

//ArrangeCard Function
// add image positions randomly and store in imagesArray
function arrangeCard() {
	imagesArray.sort(() => 0.5 - Math.random());
}

//Flip Card Function

function flipCard(e) {
	// get img element for card
	const clickedCard = e.target;

	// prevent clicking an open card
	if (clickedCard.classList.contains("flip")) {
		e.preventDefault();
		return;
	}

	// get index of image card
	const clickedCardIndex = clickedCard.dataset.id;

	// get corresponding image from imagesArray
	const selectedCardImage = imagesArray[clickedCardIndex];

	// add to pair of selected cards
	cardPairSelected.push({ clickedCard, selectedCardImage });

	// add flipping effect
	clickedCard.classList.add("flip");

	// show image
	clickedCard.setAttribute("src", imagesArray[clickedCardIndex].img);

	// when 2 cards have been selected check if they match
	if (cardPairSelected.length >= 2) {
		setTimeout(checkForMatch, 500);
	}
}

//CHECKFORMATCH Function

function checkForMatch() {
	const firstOfPair = cardPairSelected[0];
	const secondOfPair = cardPairSelected[1];

	const firstCardImage = firstOfPair.selectedCardImage;
	const secondCardImage = secondOfPair.selectedCardImage;

	const firstCardElement = firstOfPair.clickedCard;
	const secondCardElement = secondOfPair.clickedCard;

	const firstCardName = firstCardImage.name;
	const secondCardName = secondCardImage.name;

	if (firstCardName == secondCardName) {
		alert("You have found a match");
		cardsWon += 1;
		scoreBoard.innerHTML = cardsWon;
		setTimeout(checkwon, 500)
	} else {
		firstCardElement.setAttribute("src", "https://res.cloudinary.com/fakod29/image/upload/v1604561420/blank_d3g5ij.png");
		secondCardElement.setAttribute("src", "https://res.cloudinary.com/fakod29/image/upload/v1604561420/blank_d3g5ij.png");
		alert("Wrong,please try again");
		firstCardElement.classList.remove("flip");
		secondCardElement.classList.remove("flip");
	}

	cardPairSelected = [];
	clicks += 1;
	clickBoard.innerHTML = clicks;

	function checkwon() {
		if (cardsWon == imagesArray.length / 2) {
			alert("You won")
			setTimeout(() => popup.style.display = "flex", 300);
		}
	}
}

//The Replay Function

function replay() {
	arrangeCard();
	grid.innerHTML = "";
	createBoard(grid, imagesArray);
	cardsWon = 0;
	clicks = 0;
	clickBoard.innerHTML = 0;
	scoreBoard.innerHTML = 0;
	popup.style.display = "none";
}