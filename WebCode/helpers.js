const e = global.helpers = {
  sendData: () => {
    setInterval(() => {
          global.io.emit('data', global.sensorData);
    }, 1000);
  }
};
