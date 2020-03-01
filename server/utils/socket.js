const socket = require('socket.io')

let io;

module.exports.init = (server) => {
    module.exports.io = socket(server);

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });
}

module.exports.io = io;