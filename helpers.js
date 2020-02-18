const e = global.helpers = {
  sendData: (data) => {
      setInterval(() => {
          if (global.socket) {
              global.socket.emit('data', data);
          } else {
              global.io.emit('data', data);
          }
      }, 1000);
  },
  updateData: (engines) => {
      setInterval(() => {
          if (global.socket) {
              global.socket.on('update', (engine) => {
                  console.log("Getting info...");
                  engines.changeStatus(engine);
              });
          }
      }, 1000);
  }
};
