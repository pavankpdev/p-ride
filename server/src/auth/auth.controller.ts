import { Controller, Post, Body } from '@nestjs/common';

// SERVICE
import {AuthService} from './auth.service'

// INTERFACES
import {loginUser} from './interfaces'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    loginUser(@Body() user: loginUser): any {
        return this.authService.login(user;
    }

    @Post('/register')
    registerUser(): any {
        return this.authService.register();
    }
}
