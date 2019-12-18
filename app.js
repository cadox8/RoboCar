const createError = require('http-errors');
const express = require('express');
const path = require('path');
const http = require('http');

let port = 80;

const indexRouter = require('./routes/index');


const app = express();

app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log('Server running on http://localhost:80');
});

global.io = require('socket.io')(server);
global.socket = null;
global.sensorData = [];

io.on('connection', (socket) => {
  console.log("Connected client");
  global.socket = socket;

  global.helpers.sendData(io, sensorData);
});

const board = require("./server.js");
const helpers = require("./helpers.js");


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


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
