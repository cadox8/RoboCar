const five = require('johnny-five');

const boards = new five.Boards(["A", "B", "C"]);

/*const HEARTH = ["01100110", "10011001", "10000001", "10000001", "01000010", "00100100", "00011000", "00000000"];
const BLINK = ["11111111", "11111111", "11111111", "11111111", "11111111", "11111111", "11111111", "11111111"];*/

boards.on('ready', () => {
    let EnginesBoard = require('./boards/EnginesBoard')(five, boards.byId("A"));
    let LedsBoard = require('./boards/LedsBoard')(five, boards.byId("B"));
    let SensorsBoard = require('./boards/SensorsBoard')(five, boards.byId("C"), LedsBoard[0], LedsBoard[1], EnginesBoard);

   /* // Primary Board

    let pin2 = new five.Led({
        board: boards.byId("A"),
        pin: 13
    });
    pin2.on();


    // Second Board

    let pin = new five.Led({
        board: boards.byId("B"),
        pin: 13
    });

    let max = new five.Led.Matrix({
        board: boards.byId("B"),
        pins: {
            data: 2,
            clock: 9,
            cs: 4
        },
        devices: 2
    });
    max.draw(1, HEARTH);

    function blink() {
        max.draw(0, BLINK);
        setTimeout(blink, 1000);
        max.clear(0);
    }

    blink();

    let led = new five.Led.RGB({
        board: boards.byId("B"),
        pins: {
            red: 6,
            green: 3,
            blue: 5
        }
    });

    led.on();
    led.intensity(100);
    led.color("FF00FF");

    let index = 0;
    const rainbow = ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "8F00FF"];

    boards.byId("A").loop(1000, () => {
        led.color(rainbow[index++]);
        if (index === rainbow.length) index = 0;
    });

    let motorLeft = new five.Pin({
        board: boards.byId("B"),
        pin: 12
    }); //new five.Motor([12, 12]) - Not working

    let motorRight = new five.Pin({
        board: boards.byId("B"),
        pin: 11
    }); //new five.Motor([11, 11]) - Not working

    motorLeft.high();
    motorRight.high();

    boards.byId("A").loop(1, () => {
        if (global.socket == null) return;
        global.sensorData[2] = motorLeft.value;
        global.sensorData[3] = motorRight.value;

        global.socket.on('stop', (data) => {
            if (motorLeft.isHigh) {
                motorLeft.low();
            } else {
                motorLeft.high();
            }
        });
        global.socket.on('stop2', (data) => {
            if (motorRight.isHigh) {
                motorRight.low();
            } else {
                motorRight.high();
            }
        });
    });


    var piezo = new five.Piezo({
        board: boards.byId("B"),
        pin: 7
    });

    let prox = new five.Proximity({
        board: boards.byId("B"),
        controller: "HCSR04",
        pin: "A5"
    });

    prox.on("change", () => {
        const {centimeters} = prox;
        global.sensorData[4] = centimeters;
        if (centimeters <= 35) {
            motorLeft.low();
            motorRight.high();
            piezo.tone(1047, 500);
        } else {
            piezo.stop();
        }
    });

    const lightSensor = new five.Sensor({
        board: boards.byId("B"),
        pin: 'A0',
        threshold: 4
    });

    lightSensor.on('change', (value) => {
        global.sensorData[0] = value;

        if (value < 300) {
            pin.on();
        } else {
            pin.off();
        }
    });

    var temperature = new five.Thermometer({
        board: boards.byId("B"),
        pin: "A2"
    });

    temperature.on("data", function() {
        global.sensorData[1] = this.C;
    });*/
});

/*

const board = new five.Board();

const HEARTH = ["01100110", "10011001", "10000001", "10000001", "01000010", "00100100", "00011000", "00000000"];
const BLINK = ["11111111", "11111111", "11111111", "11111111", "11111111", "11111111", "11111111", "11111111"];

board.on('ready', () => {
    let pin = new five.Led(13);

    let max = new five.Led.Matrix({
        pins: {
            data: 2,
            clock: 9,
            cs: 4
        },
        devices: 2
    });
    max.draw(1, HEARTH);

    function blink() {
        max.draw(0, BLINK);
        setTimeout(blink, 1000);
        max.clear(0);
    }

    blink();

    let led = new five.Led.RGB({
      pins: {
        red: 6,
        green: 3,
        blue: 5
      }
    });

    led.on();
    led.intensity(100);
    led.color("FF00FF");

    let index = 0;
    const rainbow = ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "8F00FF"];

    board.loop(1000, () => {
        led.color(rainbow[index++]);
        if (index === rainbow.length) index = 0;
    });

    let motorLeft = new five.Pin(12); //new five.Motor([12, 12]) - Not working
    motorLeft.high();

    let motorRight = new five.Pin(11); //new five.Motor([11, 11]) - Not working
    motorRight.high();

    board.loop(1, () => {
        if (global.socket == null) return;
        global.sensorData[2] = motorLeft.value;
        global.sensorData[3] = motorRight.value;

        global.socket.on('stop', (data) => {
            if (motorLeft.isHigh) {
                motorLeft.low();
            } else {
                motorLeft.high();
            }
        });
        global.socket.on('stop2', (data) => {
            if (motorRight.isHigh) {
                motorRight.low();
            } else {
                motorRight.high();
            }
        });
    });


    var piezo = new five.Piezo(7);

    let prox = new five.Proximity({
        controller: "HCSR04",
        pin: "A5"
    });

    prox.on("change", () => {
        const {centimeters} = prox;
        global.sensorData[4] = centimeters;
        if (centimeters <= 35) {
            motorLeft.low();
            motorRight.high();
            piezo.tone(1047, 500);
        } else {
            piezo.stop();
        }
    });

    const lightSensor = new five.Sensor({
        pin: 'A0',
        threshold: 4
    });

    lightSensor.on('change', (value) => {
        global.sensorData[0] = value;

        if (value < 300) {
          pin.on();
        } else {
          pin.off();
        }
    });

    var temperature = new five.Thermometer({
      pin: "A2"
    });

    temperature.on("data", function() {
      global.sensorData[1] = this.C;
    });
});
*/
