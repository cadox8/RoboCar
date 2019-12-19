module.exports = (five, board, music, light, ...engines) => {

    // ------------------------------

    // Analog Pins
    let proximitySensor = new five.Proximity({board: board, controller: "HCSR04", pin: "A5"});
    let lightSensor = new five.Sensor({board: board, pin: 'A0', threshold: 4});
    let temperature = new five.Thermometer({board: board, pin: "A2"});

    // ------------------------------

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
            light.on();
        } else {
            light.off();
        }
    });

    // Temperature Sensor
    temperature.on("data", () => global.sensorData[1] = temperature.toCelsius);
};