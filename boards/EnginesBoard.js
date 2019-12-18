module.exports = (five, board) => {

    // Digital Pins
    let motorLeft = new five.Pin({board: board, pin: 12}); //new five.Motor([12, 12]) - Not working
    let motorRight = new five.Pin({board: board, pin: 11}); //new five.Motor([11, 11]) - Not working

    // ------------------------------

    motorLeft.high();
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
    return [motorLeft, motorRight];
};