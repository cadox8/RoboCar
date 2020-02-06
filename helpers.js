const e = global.helpers = {
  sendData: (data) => {
    setInterval(() => {
          global.socket.emit('data', data);
    }, 1000);
  }
};
