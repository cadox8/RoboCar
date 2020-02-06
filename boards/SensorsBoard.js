// Analog Pins
let proximitySensor;
let lightSensor;
let temperature;

function SensorsBoard(five, board, leds, engines) {
    proximitySensor = new five.Proximity({board: board, controller: "HCSR04", pin: "A5"});
    lightSensor = new five.Sensor({board: board, pin: 'A0', threshold: 4});
    temperature = new five.Thermometer({board: board, pin: "A2"});

    // ------------------------------

    // Proximity Sensor
    proximitySensor.on("change", () => {
        const {centimeters} = proximitySensor;
        global.sensorData[4] = centimeters;
        if (centimeters <= 35) {
            engines.stopEngine(0);
            engines.stopEngine(1);
            leds.playMusic(1047, 500);
        } else {
            leds.stopMusic();
        }
    });

    // Light Sensor
    lightSensor.on('change', (value) => {
        global.sensorData[0] = value;

        if (value < 300) {
            leds.lights(true);
        } else {
            leds.lights(false);
        }
    });

    // Temperature Sensor
    temperature.on("data", function() {
        global.sensorData[1] = this.C;
    });
};