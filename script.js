document.getElementById('solveBtn').addEventListener('click', () => {
    const n = parseInt(document.getElementById('n').value);
    if (n < 1 || n > 10) {
        alert('Please enter a number between 1 and 10');
        return;
    }
    solveNQueens(n);
});

function solveNQueens(n) {
    const board = document.getElementById('board');
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${n}, 50px)`;
    board.style.gridTemplateRows = `repeat(${n}, 50px)`;

    const solutions = [];
    placeQueens([], n, solutions);

    if (solutions.length > 0) {
        drawBoard(board, solutions[0], n);
    } else {
        alert('No solution found!');
    }
}

function placeQueens(queens, n, solutions) {
    if (queens.length === n) {
        solutions.push([...queens]);
        return;
    }

    for (let col = 0; col < n; col++) {
        if (isSafe(queens, col)) {
            queens.push(col);
            placeQueens(queens, n, solutions);
            queens.pop();
        }
    }
}

function isSafe(queens, col) {
    const row = queens.length;
    for (let i = 0; i < row; i++) {
        if (queens[i] === col || Math.abs(queens[i] - col) === Math.abs(i - row)) {
            return false;
        }
    }
    return true;
}

function drawBoard(board, solution, n) {
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            const square = document.createElement('div');
            square.className = 'square ' + ((row + col) % 2 === 0 ? 'white' : 'black');
            board.appendChild(square);

            if (solution[row] === col) {
                const queen = document.createElement('div');
                queen.className = 'queen';
                square.appendChild(queen);
            }
        }
    }
}
