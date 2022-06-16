
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
    userId: string;
    otp: number;
    fullname: string;
    phno: string
    address: string
}

type Driver = {
    fullname: string;
    location: ILocation
    driverId: string;
    phno: string
}

export interface IAcceptRideData {
    customerSocketId: string;
    driver: Driver;
    rideId: number
}