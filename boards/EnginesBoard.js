// Engines
let motorLeft;
let motorRight;

// Digital Pins
let pin;
let pin2;

function EnginesBoard(five, board) {
    motorLeft = new five.Motor({board: board, pin: 12});
    motorRight = new five.Motor({board: board, pin: 11});

    pin = new five.Led({board: board, pin: 3});
    pin2 = new five.Led({board: board, pin: 4});

    motorLeft.start();
    motorRight.start();

    pin.on();
    pin2.on();

    global.sensorData[2] = motorLeft.isOn;
    global.sensorData[3] = motorRight.isOn;

    // Checks if Client change motor status
    global.socket.on('stop', () => {
        changeStatus(motorLeft, pin, !motorLeft.isOn);
    });
    global.socket.on('stop2', () => {
        changeStatus(motorRight, pin2, !motorLeft.isOn);
    });
};

module.exports.startEngine = function(engine) {
    if (engine === 0) {
        changeStatus(motorLeft, pin, true);
    } else {
        changeStatus(motorRight, pin2, true );
    }
};

module.exports.stopEngine = function(engine) {
    if (engine === 0) {
        changeStatus(motorLeft, pin, false);
    } else {
        changeStatus(motorRight, pin2, false);
    }
};

let changeStatus = function(engine, pin, active) {
    if (!active) {
        engine.stop();
        pin.off();
    } else {
        engine.start();
        pin.on();
    }
    global.sensorData[2] = motorLeft.isOn;
    global.sensorData[3] = motorRight.isOn;
    global.helpers.sendData(global.io, global.sensorData)
};