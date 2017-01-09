const app = require('http').Server();
const io = require('socket.io')(app);
const fs = require('fs');

const html = fs.readdirSync('./index.html', 'utf8');

function handler(req, res) {
  res.set
}