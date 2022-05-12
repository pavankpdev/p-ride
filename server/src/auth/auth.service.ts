import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../user/schema/user.schema';
import { LoginUserDto } from './DTO/loginUser';
import { RegisterUserDto } from './DTO/registerUser';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ user: User; access_token: string }> {
    const user = await this.userService.findOne({
      address: loginUserDto.address,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const access_token = await this.jwtService.signAsync({
      user: user?._id.toString(),
    });

    return { user, access_token };
  }

  async register(
    registerUserDto: RegisterUserDto,
  ): Promise<{ user: User; access_token: string }> {
    const user = await this.userService.findOne({
      email: registerUserDto.email,
      fullname: registerUserDto.fullname,
      address: registerUserDto.address,
    });

    if (user) {
      throw new HttpException('User already exist', HttpStatus.NOT_ACCEPTABLE);
    }

    const createUser = await this.userService.createUser(registerUserDto);

    const access_token = await this.jwtService.signAsync({
      user: createUser?._id.toString(),
    });

    return { user: createUser, access_token };
  }
}
