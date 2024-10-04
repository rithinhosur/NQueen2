def print_board(board):
    N = len(board)
    for i in range(N):
        row = ''
        for j in range(N):
            if board[i][j]:
                row += 'Q '
            else:
                row += '. '
        print(row)
    print()


def is_safe(board, row, col):
    N = len(board)
    # Check this column on upper side
    for i in range(row):
        if board[i][col]:
            return False

    # Check upper diagonal on left side
    for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
        if board[i][j]:
            return False

    # Check upper diagonal on right side
    for i, j in zip(range(row, -1, -1), range(col, N)):
        if board[i][j]:
            return False

    return True


def solve_n_queens_util(board, row, solutions):
    N = len(board)
    if row >= N:
        solutions.append([''.join('Q' if board[i][j] else '.' for j in range(N)) for i in range(N)])
        return

    for col in range(N):
        if is_safe(board, row, col):
            board[row][col] = True
            solve_n_queens_util(board, row + 1, solutions)
            board[row][col] = False  # backtrack


def solve_n_queens(N):
    board = [[False for _ in range(N)] for _ in range(N)]
    solutions = []
    solve_n_queens_util(board, 0, solutions)
    return solutions


# Example usage:
N = int(input("Enter the number of queens (N): "))
solutions = solve_n_queens(N)

print(f"Total solutions for {N}-Queens: {len(solutions)}\n")
for index, solution in enumerate(solutions):
    print(f"Solution {index + 1}:")
    print_board([[1 if char == 'Q' else 0 for char in row] for row in solution])
