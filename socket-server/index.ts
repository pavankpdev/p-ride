import app from "express";
import { createServer } from "http";

// TYPES
import {IAcceptRideData, IRideRequest} from "./type";

const server = createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: '*',
    },
});

io.on("connection", (socket: any) => {
    /*
     * @from: When user request for a new ride
     * @to: Broadcast the request to drivers
     * */
    socket.on("NEW_RIDE_REQUEST", (rideRequestData: IRideRequest) => {
        console.log(rideRequestData)
        socket.broadcast.emit("NEW_RIDE_QUEUE", rideRequestData);
    });

    /*
     * @from: When driver accepts a ride request
     * @to: Emit the acceptance status to user
     * */
    socket.on("DRIVER_ACCEPT_RIDE", (acceptRideData: IAcceptRideData) => {
        socket.broadcast.emit("ACCEPT_RIDE", acceptRideData);
    });

    /*
     * @from: When driver starts the ride
     * @to: Update user about the ride status
     * */
    socket.on("DRIVER_STARTS_RIDE", (customerSocketId: string) => {
        socket.to(customerSocketId).emit("START_RIDE", { rideStarted: true });
    });

    /*
     * @from: When driver cancels the ride
     * @to: start notifying other drivers to accept the ride request
     * */
    socket.on("DRIVER_CANCEL_RIDE", (rideRequestData: IRideRequest) => {
        socket.emit("RIDE_CANCELLED", {rideCancelled: true})
        socket.emit("NEW_RIDE_QUEUE", rideRequestData);
    });

    /*
     * @from: When user cancels the ride
     * @to: notify the driver
     * */
    socket.on("USER_CANCEL_RIDE", () => {
        socket.broadcast.emit("RIDE_CANCELLED", {rideCancelled: true});
    });

    /*
     * @from: When ride is complete
     * @to: notify the user
     * */
    socket.on("COMPLETE_RIDE", () => {
        socket.broadcast.emit("RIDE_END", '');
    });

});

server.listen(3003, () => {
    console.log("server listening at port 3003");
});
