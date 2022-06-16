import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ride, RideDocument } from './schema/ride.schema';

@Injectable()
export class RideService {
  constructor(@InjectModel(Ride.name) private rideModel: Model<RideDocument>) {}

  async getRideIds(address: string): Promise<RideDocument[]> {
    return this.rideModel.find({ address }).exec();
  }

  async create(rideId: string, address: string): Promise<boolean> {
    await this.rideModel.create({
      rideId,
      address,
    });

    return true;
  }
}
