module.exports = (five) => {
    let raspividStream = require('raspivid-stream');
    let stream = new raspividStream();

    stream.on('data', (data) => {
        global.io.setBroadcast(true).emit('stream', data);
    });
};