//Users Prompt
let rowAndColumn;
let imageNumber;
let row;
let column
let inputValue;
let numCheck;
let numtype;
let result;

const getClosestFactors = (inputValue) => {
	// find the square root of the input value
	const root = Math.sqrt(inputValue);
	console.log(root);


	// if the root is an integer i.e perfect root				
	if (Number.isInteger(root)) {
		console.log("Perfect root: " + root);
		// return a tuple of the root [x, x]
		return [root, root];
	}

	// else 
	// strip/truncate the root, removing decimals, use as divisor
	let divisor = Math.trunc(root);
	console.log({divisor});

	// while divisor is not equal to zero
	// or the remainder of division of the inputValue and current divisor is not equal to zero 
	while (divisor > 0 && ((inputValue % divisor) !== 0)) {
		// decrement divisor
		console.log({inputValue, divisor})
		console.log(inputValue % divisor);
		divisor--
	}

	if (!divisor) {
		alert("Error getting close factors. Divisor invalid: " + divisor);
		throw new Error("Divisor error");
	}


	// return the tuple conatining [divisor, inputValue/divisor]
	return [divisor, inputValue / divisor]
}

window.onload = function () {
	totalSquares = prompt("Please speciy the total number of squares (must be a mutliple of 2,max of 100");
	// if rows and columns are not specified use default
	if (!totalSquares) {
		row = 4;
		column = 4;
	}
	// if specified ensure that the number is valid
	else {
		// ensure the value is a valid number
		if (!(/[0-9]+/.test(totalSquares))) {
			alert("Invalid number: " + totalSquares);
			return;
		}

		// ensure the number is a multiple of 2
		if (totalSquares % 2 !== 0) {
			alert("Not a multiple of 2: " + totalSquares);
			return;
		}
		
		//Ensure the number provided is not more than 100

		 if (totalSquares > 100) {
			  alert("it is more than 100: " + totalSquares);
					return;
		 }

		// get the 2 closest factors
		const factors = getClosestFactors(totalSquares);
		console.log({ factors })
		alert("Factors: " + JSON.stringify(factors));

		// assign to row and column

	}

};



let imagesArray = [
	{ name: "charles",  	 img: "img/charles.jpg", },
	{ name: "charles",  	 img: "img/charles.jpg", },
	{ name: "kat-smith",	 img: "img/kat-smith.jpg", },
	{ name: "kat-smith",	 img: "img/kat-smith.jpg", },
	{ name: "alexandru", 	 img: "img/alexandru.jpg", },
	{ name: "alexandru",	 img: "img/alexandru.jpg", },
	{ name: "chevanon", 	 img: "img/chevanon.jpg", },
	{ name: "chevanon", 	 img: "img/chevanon.jpg", },
	{ name: "ilargian", 	 img: "img/ilargian.jpg", },
	{ name: "ilargian", 	 img: "img/ilargian.jpg", },
	{ name: "muhannad", 	 img: "img/muhannad.jpg", },
	{ name: "muhannad", 	 img: "img/muhannad.jpg", },
	{ name: "nishizuka", 	 img: "img/nishizuka.jpg", },
	{ name: "nishizuka",	 img: "img/nishizuka.jpg", },
	{ name: "steshka",     img: "img/steshka.jpg", },
	{ name: "steshka",     img: "img/steshka.jpg", },
	{ name: "simona",      img: "img/simona.jpg", },
	{ name: "simona",      img: "img/simona.jpg", },
	{ name: "pixabay",     img: "img/pixabay.jpg", },
	{ name: "pixabay",     img: "img/pixabay.jpg", },
	{ name: "pixabay-2",   img: "img/pixabay-2.jpg", },
	{ name: "pixabay-2",   img: "img/pixabay-2.jpg", },
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
		cardsWon += 1;
		scoreBoard.innerHTML = cardsWon;
		setTimeout(checkwon, 500)
	} else {
		firstCardElement.setAttribute("src", "https://res.cloudinary.com/fakod29/image/upload/v1604561420/blank_d3g5ij.png");
		secondCardElement.setAttribute("src", "https://res.cloudinary.com/fakod29/image/upload/v1604561420/blank_d3g5ij.png");
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
