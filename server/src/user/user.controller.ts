import { Controller, Get, Headers, Param } from '@nestjs/common';
import { UserDocument } from './schema/user.schema';
import { UserService } from './user.service';
import { DriverDocument } from './schema/driver.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/driver')
  async getDriver(
    @Headers() headers: { authorization: string },
  ): Promise<{ driver: DriverDocument | null }> {
    const _id = await this.userService.decodeToken(headers.authorization);
    const driver = await this.userService.findOneDriver({
      _id,
    });
    return { driver };
  }

  @Get(':address')
  async getUser(
    @Param('address') address: string,
  ): Promise<{ user: UserDocument | null }> {
    const user = await this.userService.findOne({
      address,
    });
    return { user };
  }

  @Get('/driver/:address')
  async getDriverByAddress(
    @Param('address') address: string,
  ): Promise<{ driver: DriverDocument | null }> {
    const driver = await this.userService.findOneDriver({
      address,
    });
    return { driver };
  }
}
