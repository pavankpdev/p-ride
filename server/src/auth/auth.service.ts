import { Injectable } from '@nestjs/common';
import {LoginUserDto} from './interfaces'

@Injectable()
export class AuthService {
    login(loginUserDto: LoginUserDto): any {
        return {loginUserDto}
    }
}
