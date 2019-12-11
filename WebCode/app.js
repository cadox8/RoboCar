const createError = require('http-errors');
const express = require('express');
const path = require('path');
const http = require('http');

const io = require('socket.io')(http);
const dweetClient = require('node-dweetio');

const dweetio = new dweetClient();
const dweetThing = 'node-monitor';

let port = 80;

const indexRouter = require('./routes/index');

const app = express();

app.set('port', port);

const server = http.createServer(app);
server.listen(port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

io.on('connection', (socket) => {
  console.log('Connection has been established with browser.');
  socket.on('disconnect', () => {
    console.log('Browser client disconnected from the connection.');
  });
});

dweetio.listen_for(dweetThing, (dweet) => {
  const data = {
    sensorData: dweet.content
  };
  io.emit('sensor-data', data);
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
