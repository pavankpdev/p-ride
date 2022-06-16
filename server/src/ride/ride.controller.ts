import { Body, Controller, Post } from '@nestjs/common';
import { NewRideDto } from './DTO/ride.dto';
import { ConfirmRideDto } from './DTO/confirmRide.dto';

@Controller('ride')
export class RideController {
  @Post('/confirm-ride')
  async confirmRide(
    @Body() confirmRideDto: ConfirmRideDto,
  ): Promise<{ message: string }> {
    return { message: '' };
  }
}
