class SudokuSolver {

  validate(puzzleString) {
    let pattern = /[0-9.]/
    let puzzle = pattern.test(puzzleString)
    if(puzzle && puzzleString.length === 81){
      return true;
    }
      return false;
  }

  letterToNumber(row){
    switch(row.toUpperCase()){
      case 'A':
        return 1
      case 'B':
        return 2
      case 'C':
        return 3
      case 'D':
        return 4
      case 'E':
        return 5
      case 'F':
        return 6
      case 'G':
        return 7
      case 'H':
        return 8
      case 'I':
        return 9
      default:
        return 'none'
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let board = this.transformData(puzzleString)
    row = this.letterToNumber(row)
    
    if(board[row - 1][column - 1] !== 0){
       return false
    }
    for(let i = 0; i < 9; i++){
     if(board[row - 1][i] == value){
        return false
     }
    }
    return true;
  
  }

  checkColPlacement(puzzleString, row, column, value) {
    let board = this.transformData(puzzleString)
    row = this.letterToNumber(row)
    
    if(board[row - 1][column - 1] !== 0){
       return false
    }
    for(let i = 0; i < 9; i++){
     if(board[i]){
        if(board[i][column - 1] == value){
          return false
        }
     }
    }
    return true
  }

  checkRegionPlacement(puzzleString, row, column, value) {
      let board = this.transformData(puzzleString)
      row = this.letterToNumber(row)
      if(board[row - 1][column - 1] !== 0){
        return false
     }
     let startRow = row - (row % 3)
     let startCol = column - (column % 3)
     for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if(board[i + startRow][j + startCol] == value){
          return false
        }
      }
     }
     return true
    
  }


solveSudoku(board) {
    if (this.solveHelper(board)) {
      return board;
    }
    return null;
  }

solveHelper(board) {
    const [row, col] = this.findEmptyCell(board);
  
    if (row === -1 && col === -1) {
      return true; // No empty cells left, Sudoku solved
    }
  
    for (let num = 1; num <= 9; num++) {
      if (this.isValid(board, row, col, num)) {
        board[row][col] = num;
  
        if (this.solveHelper(board)) {
          return true;
        }
  
        board[row][col] = 0; // Undo the choice and try the next number
      }
    }
  
    return false; // No valid number found, backtrack
  }
  
  findEmptyCell(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return [-1, -1]; // No empty cells left
  }
  
  isValid(board, row, col, num) {
    // Check row
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num) {
        return false;
      }
    }
  
    // Check column
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) {
        return false;
      }
    }
  
    // Check 3x3 grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }
  
    return true; // Number is valid in this position
  }
  
  transformData(data) {
    const board = [];
    let index = 0;
  
    for (let row = 0; row < 9; row++) {
      const rowData = [];
      for (let col = 0; col < 9; col++) {
        const cellValue = data[index++];
        rowData.push(cellValue === '.' ? 0 : parseInt(cellValue));
      }
      board.push(rowData);
    }
  
    return board;
  }

tranformedBack(data){
  return data.flat().join('')
}


  solve(puzzleString) {
    let board =  this.transformData(puzzleString)
    let solved = this.solveSudoku(board)
    if(!solved) return false;

    let solvedBoard = this.tranformedBack(solved)
    console.log(solvedBoard)
    return solvedBoard
  }
}

module.exports = SudokuSolver;

