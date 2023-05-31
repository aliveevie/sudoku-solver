const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite('Post Testing', () => {
    test('Solve a puzzle with valid puzzle string:', () => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.text, '{"solution":"769235418851496372432178956174569283395842761628713549283657194516924837947381625"}')
            })
    
    })
     test('Solve a puzzle with invalid length:', () => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .send({
                puzzle: '.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.text, '{"error":"Expected puzzle to be 81 characters long"}')
            })
    
    })
    test('Solve a missing puzzle with valid puzzle string:', () => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .send({
                puzzle: ''
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.text, '{"error":"Required field missing"}')
            })
    
    })
    test('Solve a  puzzle with Invalid puzzle string length:', () => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .send({
                puzzle: '..2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.p'
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.text, '{"error":"Expected puzzle to be 81 characters long"}')
            })
    
    })
    test('Solve a puzzle that cannot be solved:', () => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.1'
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.text, '{"error":"Puzzle cannot be solved"}')
            })
    
    })

  })
  suite('/api/check', () => {
    test('Check a puzzle placement with all fields', () => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.1',
                coordinate: 'A1',
                value: 7
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.text, '{"valid":true}')
            })
    })
      test('Check a puzzle placement with one fields', () => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.1',
                coordinate: 'A1',
                value: 3
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.text, '{"valid":false,"conflict":["region"]}')
            })
    })
    test('Check a puzzle placement with multiple placement conflicts:', () => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.1',
                coordinate: 'A1',
                value: 5
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.text, '{"valid":false,"conflict":["row","column","region"]}')
            })
    })
      test('Check a puzzle placement with all placement conflicts:', () => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.1',
                coordinate: 'A1',
                value: 5
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.text, '{"valid":false,"conflict":["row","column","region"]}')
            })
    })
      test('Check a puzzle placement with a missing fields conflicts:', () => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.1',
               
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.text, '{"error":"Required field(s) missing"}')
            })
    })
      test('Check a puzzle placement with invalid characters', () => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.1',
                coordinate: 'A',
                value: 1
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.text, '{"error":"Invalid coordinate"}')
            })
    })
    test('Check a puzzle placement with invalid length characters', () => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432.....1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.1',
                coordinate: 'A1',
                value: 1
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.text, '{"error":"Expected puzzle to be 81 characters long"}')
            })
    })
      test('Check a puzzle placement with invalid placement coordinate:', () => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432.....1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.1',
                coordinate: 'Ac',
                value: 1
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.text, '{"error":"Invalid coordinate"}')
            })
    })
      test('Check a puzzle placement with invalid placement coordinate:', () => {
        chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432.....1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.1',
                coordinate: 'A1',
                value: 'a'
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.text, '{"error":"Invalid value"}')
            })
    })
  })
});

