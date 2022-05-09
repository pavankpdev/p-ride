import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { User } from '../user/schema/user.schema';
import { LoginUserDto } from './DTO/loginUser';
import { RegisterUserDto } from './DTO/registerUser';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginUserDto: LoginUserDto): Promise<{ user: User }> {
    const user = await this.userService.findOne({
      address: loginUserDto.address,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return { user };
  }

  async register(registerUserDto: RegisterUserDto): Promise<string> {
    await this.userService.createUser(registerUserDto);
    return 'User Created';
  }
}
