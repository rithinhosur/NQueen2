let boardSize;
let solutions = [];
let steps = [];

function solveNQueens(n) {
    boardSize = n;
    solutions = [];
    steps = [];
    let board = Array.from({ length: n }, () => Array(n).fill(0));
    placeQueens(board, 0);
    displayBoard();
}

function placeQueens(board, row) {
    if (row === boardSize) {
        solutions.push(board.map(row => row.slice()));
        return;
    }
    for (let col = 0; col < boardSize; col++) {
        if (isSafe(board, row, col)) {
            board[row][col] = 1;
            steps.push([row, col]);  // Record step
            placeQueens(board, row + 1);
            board[row][col] = 0;
            steps.pop();  // Backtrack
        }
    }
}

function isSafe(board, row, col) {
    for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) return false;
        if (col - (row - i) >= 0 && board[i][col - (row - i)] === 1) return false;
        if (col + (row - i) < boardSize && board[i][col + (row - i)] === 1) return false;
    }
    return true;
}

function displayBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        boardDiv.appendChild(cell);
    }

    // Place all queens on the board
    steps.forEach((step, index) => {
        const [row, col] = step;
        const cell = boardDiv.children[row * boardSize + col];
        const queen = document.createElement('div');
        queen.className = 'queen';
        cell.appendChild(queen);
    });

    displaySteps();
}

function displaySteps() {
    const stepsDiv = document.getElementById('steps');
    stepsDiv.innerHTML = '';
    
    steps.forEach((step, index) => {
        const [row, col] = step;
        stepsDiv.innerHTML += `Step ${index + 1}: Placed queen at (${row + 1}, ${col + 1})<br>`;
    });
}

document.getElementById('solveButton').addEventListener('click', () => {
    const n = parseInt(document.getElementById('nInput').value);
    if (isNaN(n) || n < 4 || n > 10) {
        alert("Please enter a number between 4 and 10.");
        return;
    }
    solveNQueens(n);
});
