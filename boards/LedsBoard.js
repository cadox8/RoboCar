// Max Draws
const HEARTH = ["01100110", "10011001", "10000001", "10000001", "01000010", "00100100", "00011000", "00000000"];
const BLINK = ["11111111", "11111111", "11111111", "11111111", "11111111", "11111111", "11111111", "11111111"];

// ------------------------------

// Digital Pins
let pin;
let max;
let rgb;
let music;

function LedsBoard(five, board) {

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
    rgb.on();
    rgb.intensity(100);
    rgb.color("FF00FF");

    let index = 0;
    const rainbow = ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "8F00FF"];

    board.loop(1000, () => {
        rgb.color(rainbow[index++]);
        if (index === rainbow.length) index = 0;
    });
};

// Blinks screen
function blink() {
    max.draw(0, BLINK);
    setTimeout(blink, 1000);
    max.clear(0);
}

module.exports.playMusic = (tone, duration) => {
    stopMusic();
    music.tone(tone, duration);
};

module.exports.stopMusic = () => {
    music.stop();
};

module.exports.lights = (on) => {
    if (on) {
        pin.on();
    } else {
        pin.off();
    }
};