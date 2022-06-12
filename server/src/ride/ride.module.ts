import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';

@Module({
  providers: [RideService],
  controllers: [RideController],
})
export class RideModule {}
