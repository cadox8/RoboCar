const dweetClient = require('node-dweetio');
const five = require('johnny-five');

const board = new five.Board();
const dweetio = new dweetClient();

board.on('ready', () => {
    const lightSensor = new five.Sensor({
        pin: 'A0',
        threshold: 4
    });

    lightSensor.on('change', (value) => {
        const dweetThing = 'node-monitor';
        const tweetMessage = {
            light: value
        };

        dweetio.dweet_for(dweetThing, tweetMessage, (err, dweet) => {
            if (err) {
                console.log('[Error]: ', err);
            }
            if (dweet) {
                console.log(dweet.content);
            }
        });
    });
});