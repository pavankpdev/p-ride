import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './DTO/loginUser';
import { RegisterUserDto } from './DTO/registerUser';
import { User } from '../user/schema/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginUserDto: LoginUserDto): Promise<{ user: User }> {
    return this.authService.login(loginUserDto);
  }

  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto): Promise<string> {
    return this.authService.register(registerUserDto);
  }
}
