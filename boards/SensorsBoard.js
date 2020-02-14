const HEARTH = ["01100110", "10011001", "10000001", "10000001", "01000010", "00100100", "00011000", "00000000"];
const BLINK = ["11111111", "11111111", "11111111", "11111111", "11111111", "11111111", "11111111", "11111111"];

// ------------------------------

// Digital Pins
let pin;
let max;
let rgb;
let music;

// ------------------------------

// Analog Pins
let proximitySensor;
let lightSensor;
let temperature;

function SensorsBoard(five, board, engines) {
    proximitySensor = new five.Proximity({board: board, controller: "HCSR04", pin: "A5"});
    lightSensor = new five.Sensor({board: board, pin: 'A0', threshold: 4});
    temperature = new five.Thermometer({board: board, pin: "A2"});

    // ------------------------------

    // Digital Pins
    pin = new five.Led({board: board, pin: 13});
    max = new five.Led.Matrix({board: board, pins: {data: 2, clock: 9, cs: 4}, devices: 2});
    rgb = new five.Led.RGB({board: board, pins: {red: 6, green: 3, blue: 5}});
    music = new five.Piezo({board: board, pin: 7});
    // ------------------------------

    // Max LED
    max.draw(1, HEARTH);

    blink();

    // RGB Led
    rgb.intensity(100);
    rgb.color("FF00FF");
    rgb.off();

    let index = 0;
    const rainbow = ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "8F00FF"];

    board.loop(1000, () => {
        if (rgb.isOn) rgb.color(rainbow[index++]);
        if (index === rainbow.length) index = 0;
    });

    // ------------------------------

    // Proximity Sensor
    proximitySensor.on("change", () => {
        const {centimeters} = proximitySensor;
        global.data.proximity = centimeters;
        if (centimeters <= 35) {
            engines.stopEngine(0);
            engines.stopEngine(1);
            playMusic(1047, 500);
            rgbLight(true);
        } else {
            rgbLight(false);
        }
    });

    // Light Sensor
    lightSensor.on('change', (value) => {
        global.data.light = value;

        if (value < 300) {
            lights(true);
        } else {
            lights(false);
    }
    });

    // Temperature Sensor
    temperature.on("data", function() {
        global.data.temperature = this.C;
    });
};

// Blinks screen
function blink() {
    max.draw(0, BLINK);
    setTimeout(blink, 1000);
    max.clear(0);
}

function playMusic(tone, duration) {
    //music.tone(tone, duration);
};

function stopMusic() {
    music.stop();
};

function lights(on) {
    if (on) {
        pin.on();
    } else {
        pin.off();
    }
};

function rgbLight(on) {
    if (on) {
        rgb.on();
    } else {
        rgb.off();
    }
};

module.exports = SensorsBoard;