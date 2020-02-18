let engines;

const five = require('johnny-five');

const boards = new five.Boards(["A", "B"]);

// ------------------------------
const EnginesBoard = require('./boards/EnginesBoard');
//const LedsBoard = require('./boards/LedsBoard');
const SensorsBoard = require('./boards/SensorsBoard');

boards.on('ready', () => {
    engines = new EnginesBoard(five, boards.byId("A"));
    //let leds = new LedsBoard(five, boards.byId("B"));
    let sensors = new SensorsBoard(five, boards.byId("B"), engines);
});