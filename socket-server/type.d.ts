export interface IRideRequest {
    rideId: string;
    from: string;
    to: string;
    carType: 'SUV' | 'Sedan' | 'Prime';
    price: number;
    distance: number;
    socketId: string;
}
