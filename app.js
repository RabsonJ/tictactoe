const gameBoard = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
const playerMessage = document.querySelector('#playerMessage');
const resultContainer = document.querySelector('#resultContainer');
const gameResult = document.querySelector('#gameResult');
const resetGame = document.querySelector('#reset');
const option = document.querySelector('#option');

const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

const winCombos = [
	[ 0, 1, 2 ],
	[ 3, 4, 5 ],
	[ 6, 7, 8 ],
	[ 0, 3, 6 ],
	[ 1, 4, 7 ],
	[ 2, 5, 8 ],
	[ 0, 4, 8 ],
	[ 2, 4, 6 ]
];

resetGame.addEventListener('click', initGame);
document.querySelector('#startBtn').addEventListener('click', startGame);

initGame();

const cellsArray = Array.from(cells);
cellsArray.forEach((cell) => cell.addEventListener('click', handleClick, { once: true }));

function handleClick(e) {
	if (e.target.classList.contains(X_CLASS) || e.target.classList.contains(CIRCLE_CLASS)) {
		e.target.removeEventListener('click', handleClick);
	} else {
		e.target.classList.add(humanPlayer);

		if (checkWinner(cells, humanPlayer)) {
			endGame('Congrats!!! You won');
		} else {
			takeTurns();
		}
	}

	if (emptyCells().length === 0 && !checkWinner(cells, X_CLASS) && !checkWinner(cells, CIRCLE_CLASS)) {
		endGame("It's a draw");
		return;
	}
}

// Start Game
let humanPlayer, aiPlayer;
function startGame() {
	const xChoice = document.querySelector('#x').checked;
	const oChoice = document.querySelector('#o').checked;

	if (xChoice || oChoice) {
		gameBoard.style.display = 'grid';
		resetGame.style.display = 'block';
		option.style.display = 'none';
	}

	humanPlayer = xChoice ? X_CLASS : CIRCLE_CLASS;
	aiPlayer = humanPlayer === X_CLASS ? CIRCLE_CLASS : X_CLASS;
}

// Original Game State
function initGame() {
	const xChoice = (document.querySelector('#x').checked = false);
	const oChoice = (document.querySelector('#o').checked = false);

	option.style.display = 'block';
	gameBoard.style.display = 'none';
	resetGame.style.display = 'none';
	cells.forEach((cell) => (cell.classList.contains('x') ? cell.classList.remove('x') : cell.classList.remove('circle')));
	playerMessage.innerHTML = "Let's have some fun";

	resultContainer.style.display = 'none';
}

// Switch to aiPlayer
function takeTurns() {
	cellsArray.forEach((cell) => cell.removeEventListener('click', handleClick));
	if (emptyCells().length !== 0) {
		setTimeout(() => {
			const randEmptyCell = emptyCells()[Math.floor(Math.random() * emptyCells().length)];
			// Add back eventListeners once aiPlayer has moved (after 1sec)
			cellsArray.forEach((cell) => cell.addEventListener('click', handleClick, { once: true }));
			randEmptyCell.classList.add(aiPlayer);
			emptyCells();

			// check if aiPlayer has won after making move
			if (checkWinner(cells, aiPlayer)) {
				endGame('Sorry! You lost');
				return;
			}
			playerMessage.innerHTML = 'Your turn!';
		}, 1000);

		playerMessage.innerHTML = 'My turn!';
	}
}

function endGame(winMessage) {
	gameResult.innerHTML = winMessage;
	resultContainer.style.display = 'flex';
	setTimeout(() => {
		initGame();
		resultContainer.style.display = 'none';
	}, 2500);
	return;
}

// Has any winning condition been met?
function checkWinner(cells, currentClass) {
	return winCombos.some((possible) => {
		return possible.every((index) => {
			return cells[index].classList.contains(currentClass);
		});
	});
}

// Util function to give us empty cells
function emptyCells() {
	return cellsArray.filter((cell) => !cell.classList.contains(X_CLASS) && !cell.classList.contains(CIRCLE_CLASS));
}
