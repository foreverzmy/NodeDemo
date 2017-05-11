const net = require(`net`);

const socket = net.connect({
  host: 'localhost',
  port: 9005,
});

socket.on('connect', () => {
    console.log('connect to server.');
    socket.write('heihi\r\n');
  })
  .on('data', (data) => {
    console.log(data.toString());
    socket.end();
  })
  .on('end', () => {
    console.log('disconnected from server');
  });