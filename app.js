const cells = document.querySelectorAll('.cell');
const playerMessage = document.querySelector('#playerMessage');
const resultContainer = document.querySelector('#resultContainer');
const gameResult = document.querySelector('#gameResult');
const resetGame = document.querySelector('#reset').addEventListener('click', cleanCells);
const restartBtn = document.querySelector('.btn-restart').addEventListener('click', cleanCells);

const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

const winningLogic = [
	[ 0, 1, 2 ],
	[ 3, 4, 5 ],
	[ 6, 7, 8 ],
	[ 0, 3, 6 ],
	[ 1, 4, 7 ],
	[ 2, 5, 8 ],
	[ 0, 4, 8 ],
	[ 2, 4, 6 ]
];

initGame();

cells.forEach((cell) => cell.addEventListener('click', handleClick, { once: true }));

let currentPlayer = 'X';

function handleClick(e) {
	const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
	const currentClass = currentPlayer === 'X' ? X_CLASS : CIRCLE_CLASS;
	e.target.classList.add(currentClass);

	const xs = Array.from(cells).filter((cell) => cell.classList.contains('x'));
	const os = Array.from(cells).filter((cell) => cell.classList.contains('circle'));

	if (xs.length + os.length === 9) {
		drawGame();
	}

	if (checkWinner(cells, currentClass)) {
		endGame(currentClass);
	}
	playerMessage.innerHTML = `${nextPlayer}, your turn!`;
	currentPlayer = nextPlayer;
}

function initGame() {
	const welcomeMessage = [
		"Let's get playing!!!",
		'Lets have some fun',
		'Time to flex your brain',
		'A good way to relax'
	];

	const pickMessage = welcomeMessage[Math.floor(Math.random() * welcomeMessage.length)];
	playerMessage.innerHTML = pickMessage;

	resultContainer.style.display = 'none';
}

function cleanCells() {
	cells.forEach((cell) => (cell.classList.contains('x') ? cell.classList.remove('x') : cell.classList.remove('circle')));
	location.reload();
}

function drawGame() {
	gameResult.innerHTML = `It's a draw`;
	resultContainer.style.display = 'flex';
	return;
}

function endGame(currentClass) {
	const winner = currentClass === 'x' ? 'X' : 'O';
	gameResult.innerHTML = `${winner} has won!!!`;

	resultContainer.style.display = 'flex';
}

function checkWinner(cells, currentClass) {
	return winningLogic.some((possible) => {
		return possible.every((index) => {
			return cells[index].classList.contains(currentClass);
		});
	});
}
