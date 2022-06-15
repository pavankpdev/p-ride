
type Geometry = {
    lat: number,
    lng: number,
}

interface ILocation {
    formatted_address: string;
    geometry: Geometry;
}

export interface IRideRequest {
    rideId?: string;
    from: ILocation;
    to: ILocation;
    carType: 'SUV' | 'Sedan' | 'Mini';
    price: number;
    distance: number;
    socketId: string;
    otp: number;
    fullname: string;
    phno: string
}