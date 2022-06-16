import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ride, RideSchema } from './schema/ride.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ride.name, schema: RideSchema }]),
  ],
  providers: [RideService],
  controllers: [RideController],
})
export class RideModule {}
