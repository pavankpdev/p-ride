import { Body, Controller, Param, Post } from '@nestjs/common';
import { ConfirmRideDto } from './DTO/confirmRide.dto';
import { getWeb3 } from '../contracts/getWeb3';
import { BigNumber } from 'ethers';
import { RideService } from './ride.service';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post('/confirm-ride')
  async confirmRide(
    @Body() confirmRideDto: ConfirmRideDto,
  ): Promise<{ id: number }> {
    const Web3 = await getWeb3();

    const users = [confirmRideDto.customer, confirmRideDto.driver];
    const status = [false, false, true, 2];
    const rideDetails = [
      confirmRideDto.from,
      confirmRideDto.to,
      confirmRideDto.distance,
      confirmRideDto.price,
    ];
    const timestamp = Date.now();

    const count = await Web3.Ride.getRideCount();
    const rideId = BigNumber.from(count).toNumber();

    await Web3.Ride.estimateGas.confirmRide(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      users,
      status,
      rideDetails,
      timestamp,
    );

    await Web3.Ride.confirmRide(users, status, rideDetails, timestamp);

    await this.rideService.create(
      `${rideId + 1}`,
      confirmRideDto.customer.toLocaleLowerCase(),
    );
    await this.rideService.create(
      `${rideId + 1}`,
      confirmRideDto.driver.toLocaleLowerCase(),
    );

    return { id: rideId + 1 };
  }

  @Post('/cancel-ride/:id')
  async cancelRide(@Param('id') id: number): Promise<{ status: boolean }> {
    const Web3 = await getWeb3();

    const timestamp = Date.now();
    await Web3.Ride.estimateGas.cancelRide(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      id,
      '1',
      `${timestamp}`,
    );

    await Web3.Ride.cancelRide(id, '1', `${timestamp}`);

    return { status: true };
  }

  @Post('/complete-ride/:id')
  async completeRide(@Param('id') id: number): Promise<{ status: boolean }> {
    const Web3 = await getWeb3();

    const timestamp = Date.now();
    await Web3.Ride.estimateGas.completeRide(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      id,
      `${timestamp}`,
    );

    await Web3.Ride.completeRide(id, `${timestamp}`);

    return { status: true };
  }
}
