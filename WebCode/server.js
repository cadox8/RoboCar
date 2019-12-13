const five = require('johnny-five');

const board = new five.Board();

board.on('ready', () => {
    let pin = new five.Led(13);

    let led = new five.Led.RGB({
      pins: {
        red: 4,
        green: 3,
        blue: 2
      },
      isAnode: false
    });

    led.on();
    led.color("#FF00FF");

    let lightSensor = new five.Sensor({
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

    let temperature = new five.Thermometer({
      pin: "A2"
    });

    temperature.on("data", () => {
      global.sensorData[1] = this.C;
    });
});
