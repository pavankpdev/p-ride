import { Controller, Get, Headers, Param } from '@nestjs/common';
import { UserDocument } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':address')
  async getUser(
    @Param('address') address: string,
  ): Promise<{ user: UserDocument | null }> {
    const user = await this.userService.findOne({
      address,
    });
    return { user };
  }
}
