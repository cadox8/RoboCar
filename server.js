const five = require('johnny-five');

const boards = new five.Boards(["A", "B", "C"]);

boards.on('ready', () => {
    let EnginesBoard = require('./boards/EnginesBoard')(five, boards.byId("A"));
    let LedsBoard = require('./boards/LedsBoard')(five, boards.byId("B"));
    let SensorsBoard = require('./boards/SensorsBoard')(five, boards.byId("C"), LedsBoard[0], LedsBoard[1], EnginesBoard[0], EnginesBoard[1]);
    //let PiBoard = require('./boards/PiBoard')(five);
});