let steps = []; // Array to hold the steps of queen placements

function solveNQueens() {
    const n = parseInt(document.getElementById('n').value);
    const grid = document.getElementById('puzzleGrid');
    const stepsDiv = document.getElementById('steps'); // Div to display the steps
    grid.innerHTML = ''; // Clear previous grid
    stepsDiv.innerHTML = ''; // Clear previous steps
    grid.style.gridTemplateColumns = `repeat(${n}, 60px)`;

    const board = Array.from({ length: n }, () => Array(n).fill(0));
    steps = []; // Reset steps

    if (placeQueens(board, 0, n)) {
        renderBoard(board, n);
        displaySteps(steps); // Display the recorded steps
    } else {
        alert('No solution exists!');
    }
}

function placeQueens(board, row, n) {
    if (row === n) return true; // All queens are placed

    for (let col = 0; col < n; col++) {
        if (isSafe(board, row, col, n)) {
            board[row][col] = 1; // Place queen
            steps.push([row, col]); // Record step
            if (placeQueens(board, row + 1, n)) return true; // Recur
            board[row][col] = 0; // Backtrack
     
