import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ethers } from 'ethers';
import { AuthService } from './auth.service';
import { DriverLoginDto, LoginUserDto } from './DTO/loginUser';
import { RegisterDriverDto, RegisterUserDto } from './DTO/registerUser';
import { User } from '../user/schema/user.schema';
import { Driver } from '../user/schema/driver.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ user: User }> {
    if (!ethers.utils.isAddress(loginUserDto.address)) {
      throw new HttpException('Invalid Address', HttpStatus.NOT_ACCEPTABLE);
    }

    return await this.authService.login(loginUserDto);
  }

  @Post('/driver-login')
  @HttpCode(HttpStatus.OK)
  async driverLogin(
    @Body() driverLoginDto: DriverLoginDto,
  ): Promise<{ driver: Driver }> {
    return this.authService.loginDriver(driverLoginDto);
  }

  @Post('/register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<{ user: User }> {
    if (!ethers.utils.isAddress(registerUserDto.address)) {
      throw new HttpException('Invalid Address', HttpStatus.NOT_ACCEPTABLE);
    }

    return this.authService.register(registerUserDto);
  }

  @Post('/driver-register')
  async registerDriver(
    @Body() registerDriverDto: RegisterDriverDto,
  ): Promise<{ driver: Driver }> {
    return this.authService.registerDriver(registerDriverDto);
  }
}
