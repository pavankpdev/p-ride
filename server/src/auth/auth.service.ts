import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../user/schema/user.schema';
import { DriverLoginDto, LoginUserDto } from './DTO/loginUser';
import { RegisterDriverDto, RegisterUserDto } from './DTO/registerUser';
import { UserService } from '../user/user.service';
import { Driver } from '../user/schema/driver.schema';
import { ethers } from 'ethers';

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
      address: loginUserDto.address.toLocaleLowerCase(),
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
    const doesUserAddressExist = await this.userService.findOne({
      address: registerUserDto.address,
    });

    const doesUserEmailExist = await this.userService.findOne({
      email: registerUserDto.email,
    });

    if (doesUserAddressExist || doesUserEmailExist) {
      throw new HttpException('User already exist', HttpStatus.NOT_ACCEPTABLE);
    }

    const createUser = await this.userService.createUser({
      ...registerUserDto,
      address: registerUserDto.address.toLocaleLowerCase(),
    });

    const access_token = await this.jwtService.signAsync({
      user: createUser?._id.toString(),
    });

    return { user: createUser, access_token };
  }

  async loginDriver(
    driverLoginDto: DriverLoginDto,
  ): Promise<{ driver: Driver; access_token: string }> {
    const driver = await this.userService.findOneDriver({
      email: driverLoginDto.email,
    });

    if (!driver) {
      throw new HttpException('driver not found', HttpStatus.NOT_FOUND);
    }

    const access_token = await this.jwtService.signAsync({
      driver: driver?._id.toString(),
    });

    return { driver, access_token };
  }

  async registerDriver(
    registerDriverDto: RegisterDriverDto,
  ): Promise<{ driver: Driver; access_token: string }> {
    const doesDriverAddressExist = await this.userService.findOneDriver({
      email: registerDriverDto.email,
    });

    if (!ethers.utils.isAddress(registerDriverDto.address)) {
      throw new HttpException('Invalid Address', HttpStatus.NOT_ACCEPTABLE);
    }

    if (doesDriverAddressExist) {
      throw new HttpException(
        'Driver already exist',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const createDriver = await this.userService.createDriver(registerDriverDto);

    const access_token = await this.jwtService.signAsync({
      driver: createDriver?._id.toString(),
    });

    return { driver: createDriver, access_token };
  }
}
