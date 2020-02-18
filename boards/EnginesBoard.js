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

    global.data.leftEngine = motorLeft.isOn;
    global.data.rightEngine = motorRight.isOn;

    board.loop(1000, () => {
        global.helpers.updateData(this);
    });
};

EnginesBoard.prototype.startEngine = function(engine) {
    if (engine === 0) {
        changeStatus(motorLeft, pin, true);
    } else {
        changeStatus(motorRight, pin2, true );
    }
};

EnginesBoard.prototype.stopEngine = function(engine) {
    if (engine === 0) {
        changeStatus(motorLeft, pin, false);
    } else {
        changeStatus(motorRight, pin2, false);
    }
};

EnginesBoard.prototype.changeStatus = function(engine) {
  if (engine === 0) {
      changeStatus(motorLeft, pin, !motorLeft.isOn);
  } else {
      changeStatus(motorRight, pin2, !motorRight.isOn);
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
    global.data.leftEngine = motorLeft.isOn;
    global.data.rightEngine = motorRight.isOn;
    global.helpers.sendData(global.data)
};

module.exports = EnginesBoard;