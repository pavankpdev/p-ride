"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const server = (0, http_1.createServer)(express_1.default);
const io = require('socket.io')(server, {
    cors: {
        origin: process.env.Origin
    }
});
io.on('connection', (socket) => {
    console.log(socket.id);
    /*
    * @from: When user request for a new ride
    * @to: Broadcast the request to drivers
    * */
    socket.on('NEW_RIDE_REQUEST', (rideRequestData) => {
        socket.broadcast.emit('NEW_RIDE_QUEUE', rideRequestData);
    });
    /*
    * @from: When driver accepts a ride request
    * @to: Broadcast the acceptance status to user
    * */
    socket.on('ACCEPT_RIDE', (rideRequestData) => {
        socket.broadcast.emit('NEW_RIDE_QUEUE', rideRequestData);
    });
});
server.listen(4001, () => {
    console.log('server listening at port 4001');
});
/*
* Request ride -> from user to driver ✅
* Accept ride -> from driver to user
* Start ride -> from driver to user
* Cancel ride -> from user or driver to driver or user
* Complete ride -> from driver to user
*/ 
