"use strict";
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: process.env.Origin
    }
});
io.on('connection', (socket) => {
    console.log(socket);
});
server.listen(4001, () => {
    console.log('server listening at port 4001');
});
