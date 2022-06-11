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
import { LoginUserDto } from './DTO/loginUser';
import { RegisterUserDto } from './DTO/registerUser';
import { User } from '../user/schema/user.schema';

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

  @Post('/register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<{ user: User }> {
    if (!ethers.utils.isAddress(registerUserDto.address)) {
      throw new HttpException('Invalid Address', HttpStatus.NOT_ACCEPTABLE);
    }

    return await this.authService.register(registerUserDto);
  }
}
