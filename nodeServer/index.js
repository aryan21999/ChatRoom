// Node server which handle socket.io connections

const io = require('socket.io')(4000)

const user = {};

io.on('connection', socket => {
    // if new user joins, let other users connected to the server know!
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    });

    // if someone send a message, broadcast it to other people
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
})