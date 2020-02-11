const e = global.helpers = {
  sendData: (data) => {
    setInterval(() => {
          if (global.socket) {
              global.socket.emit('data', data);
          } else {
              global.io.emit('data', data);
          }
    }, 1000);
  }
};
