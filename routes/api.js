'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

const solver = new SudokuSolver()

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

      const { puzzle, coordinate, value} = req.body
      if(!puzzle || !coordinate || !value){
        res.json({ error: 'Required field(s) missing' });
        return;
      }

      const row = coordinate.split('')[0]
      const column = coordinate.split('')[1]
      if(coordinate.length !== 2 || !/[a-i]/i.test(row) || !/[1-9]/g.test(column)){
        res.json({ error: 'Invalid coordinate'});
        return;
      }
      if (!/^[1-9]$/g.test(value)) {
        res.json({ error: 'Invalid value' });
        return;
      }
      
      if(puzzle.length != 81){
        res.json({ error: 'Expected puzzle to be 81 characters long' });
        return;
      }
      if(/[^0-9.]/g.test(puzzle)){
        res.json({ error: 'Invalid characters in puzzle' })
        return
      }
    let validPuzzle = solver.transformData(puzzle)
    let rowtrf = solver.letterToNumber(row)
    if(validPuzzle[rowtrf - 1][column - 1] == value){
      res.json({valid: true})
      return
    }
    let validRow = solver.checkRowPlacement(puzzle, row, column, value);
    let validColumn = solver.checkColPlacement(puzzle, row, column, value);
    let validRegion = solver.checkRegionPlacement(puzzle, row, column, value);
    let conflicts = [];
    if(validRow && validColumn && validRegion){
      res.json({valid: true})
    }else{
      if(!validRow){
        conflicts.push('row')
      }
      if(!validColumn){
        conflicts.push('column')
      }
      if(!validRegion){
        conflicts.push("region")
      }
      res.json({valid:false, conflict: conflicts});
    }



    });
    
  app.route('/api/solve')
    .post((req, res) => {

    const { puzzle }  = req.body
      if(!puzzle){
       res.json({ error: 'Required field missing' })
       return;
      }
      if(puzzle.length != 81){
        res.json({ error: 'Expected puzzle to be 81 characters long' });
        return;
      }
      let matched = /[^0-9.]/g
      if(matched.test(puzzle)){
        res.json({ error: 'Invalid characters in puzzle' })
        return;
      }
     
      let solvedString = solver.solve(puzzle)
    
      if(!solvedString){
        res.json({ error: 'Puzzle cannot be solved' })
        return;
      }else{
        
        res.json({solution: solvedString})
        return;
      }
      
    });
};
