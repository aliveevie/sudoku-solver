const chai = require('chai');
const assert = chai.assert;
const puzzle = require('../controllers/puzzle-strings').puzzlesAndSolutions[0][1]
const puzzle1 = '12345'
const puzzle2 = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver()

suite('Unit Tests', () => {
    suite('Valid String', () => {
        test('Logic handles a valid puzzle string of 81 characters', () => {
            let result = solver.validate(puzzle)
            assert.isTrue(result, true)
        })
        test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
            let result = solver.validate(puzzle1)
            assert.isFalse(result, false)
        })
        test('Logic handles a puzzle string that is not 81 characters in length', () => {
            let result = solver.validate(puzzle1)
            assert.isFalse(result, false)
        })
    })
    suite('Valid row', () => {
        test('Logic Handle valid row placement', () => {
            let result = solver.checkRowPlacement(puzzle2, 'A', 1, 7)
            assert.isTrue(result)
        })
        test('Logic Handle Invalid row placement', () => {
            let result = solver.checkRowPlacement(puzzle, 'A', 1, 6)
            assert.isFalse(result)
        })
    })

    suite('Valid column', () => {
        test('Logic Handle Valid column placement', () => {
            let result = solver.checkColPlacement(puzzle, 'A', 1, 6)
            assert.isFalse(result)
        })
        test('Logic Handle InValid column placement', () => {
            let result = solver.checkColPlacement(puzzle, 'A', 1, 6)
            assert.isFalse(result)
        })
    })
    suite('Valid Region', () => {
        test('Logic handle valid region placement', () => {
            let result = solver.checkRegionPlacement(puzzle2, 'A', 1, 6)
            assert.isTrue(result)
        })
        test('Logic handle Invalid region placement', () => {
            let result = solver.checkRegionPlacement(puzzle, 'A', 1, 6)
            assert.isFalse(result)
        })
    })
    suite('Other Test', () => {
        test('Valid String pass the solver!', () => {
            let result = solver.solve(puzzle2)
            assert.isString(result)
        })
        test('InValid String fail the solver!', () => {
            let result = solver.solve(puzzle1)
            assert.isNotEmpty(result)
        })

        test('Solver returns the expected solution for an incomplete puzzle', () => {
            test('Valid String pass the solver!', () => {
                let result = solver.solve(puzzle2)
                assert.isString(result)
            })
        })
    })
});
