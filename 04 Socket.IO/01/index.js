const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

io.emit('some event', { for: 'everyone' });

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.broadcast.emit('hi');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg) {
        console.log(`message: ${msg}`);
        io.emit('chat message', msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
