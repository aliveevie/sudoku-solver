let puzzle = require('./controllers/puzzle-strings').puzzlesAndSolutions[0][0]
console.log(puzzle)
let puzzle2 = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
function checkRowPlacement(puzzleString, row, column, value) {
  let board = transformData(puzzleString)
  row = letterToNumber(row)
  
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

function letterToNumber(row){
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

function transformData(data) {
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

let result1 = transformData(puzzle)
let result = checkRowPlacement(puzzle2, 'A', 1, 6)
console.log(result)
console.log(result1)