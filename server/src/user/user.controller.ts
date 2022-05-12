import { Controller, Get } from '@nestjs/common';
import { UserDocument } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getUser(): Promise<{ user: UserDocument | null }> {
    const user = await this.userService.findOne({
      _id: '627d4519a46e6687313908bc',
    });
    return { user };
  }
}
