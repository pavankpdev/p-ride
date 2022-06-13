const app = require('express')();
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: process.env.Origin
    }
});

io.on('connection', (socket: any) => {
})

server.listen(4001, () => {
    console.log('server listening at port 4001')
})

/*
* Request ride -> from user
* Accept ride -> from driver
* Start ride -> from driver
* Cancel ride -> from user or driver
* Complete ride -> from driver
*/