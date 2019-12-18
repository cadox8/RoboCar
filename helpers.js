const e = global.helpers = {
  sendData: (io, data) => {
    setInterval(() => {
          io.emit('data', data);
    }, 1000);
  }
};
