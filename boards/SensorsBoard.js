module.exports = (five, board, ...engines) => {

    // Max Draws
    const HEARTH = ["01100110", "10011001", "10000001", "10000001", "01000010", "00100100", "00011000", "00000000"];
    const BLINK = ["11111111", "11111111", "11111111", "11111111", "11111111", "11111111", "11111111", "11111111"];

    // ------------------------------

    // Digital Pins
    let pin = new five.Led({board: board, pin: 13});
    let max = new five.Led.Matrix({board: board, pins: {data: 2, clock: 9, cs: 4}, devices: 2});
    let rgb = new five.Led.RGB({board: board, pins: {red: 6, green: 3, blue: 5}});
    let music = new five.Piezo({board: board, pin: 7});

    // Analog Pins
    let proximitySensor = new five.Proximity({board: board, controller: "HCSR04", pin: "A5"});
    let lightSensor = new five.Sensor({board: board, pin: 'A0', threshold: 4});
    let temperature = new five.Thermometer({board: board, pin: "A2"});

    // ------------------------------

    // Max LED
    max.draw(1, HEARTH);

    function blink() {
        max.draw(0, BLINK);
        setTimeout(blink, 1000);
        max.clear(0);
    }
    blink();

    // RGB Led
    rgb.on();
    rgb.intensity(100);
    rgb.color("FF00FF");

    let index = 0;
    const rainbow = ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "8F00FF"];

    board.loop(1000, () => {
        rgb.color(rainbow[index++]);
        if (index === rainbow.length) index = 0;
    });

    // Proximity Sensor
    proximitySensor.on("change", () => {
        const {centimeters} = proximitySensor;
        global.sensorData[4] = centimeters;
        if (centimeters <= 35) {
            engines[0].low();
            engines[1].high();
            music.tone(1047, 500);
        } else {
            music.stop();
        }
    });

    // Light Sensor
    lightSensor.on('change', (value) => {
        global.sensorData[0] = value;

        if (value < 300) {
            pin.on();
        } else {
            pin.off();
        }
    });

    // Temperature Sensor
    temperature.on("data", () => global.sensorData[1] = temperature.toCelsius);
};