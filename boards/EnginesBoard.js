module.exports = (five, board) => {

    // Digital Pins
    let pin = new five.Led({board: board, pin: 3});
    let pin2 = new five.Led({board: board, pin: 4});

    let motorLeft = new five.Motor({board: board, pin: 12}); //new five.Motor([12, 12]) - Not working
    let motorRight = new five.Motor({board: board, pin: 11}); //new five.Motor([11, 11]) - Not working

    // ------------------------------

    motorLeft.start();
    motorRight.start();

    pin.on();
    pin2.on();

    setInterval(() => {
        if (global.socket == null) return;
        global.sensorData[2] = motorLeft.isOn;
        global.sensorData[3] = motorRight.isOn;

        global.socket.on('stop', (data) => {
            if (motorLeft.isOn) {
                motorLeft.stop();
                pin.off()
            } else {
                motorLeft.start();
                pin.on();
            }
            global.helpers.sendData(global.io, global.sensorData)
        });
        global.socket.on('stop2', (data) => {
            if (motorRight.isOn) {
                motorRight.stop();
                pin2.off();
            } else {
                motorRight.start();
                pin2.on();
            }
            global.helpers.sendData(global.io, global.sensorData)
        });
    }, 1000);

    return [motorLeft, motorRight];
};