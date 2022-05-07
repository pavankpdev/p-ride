import { Controller, Post, Body } from '@nestjs/common';
import {AuthService} from './auth.service'
import {LoginUserDto} from './interfaces'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    login(@Body() loginUserDto: LoginUserDto): any {
        return this.authService.login(loginUserDto)
    }

}
