import { Injectable } from '@nestjs/common';

// INTERFACE
import {loginUser} from './interfaces'

@Injectable()
export class AuthService {

    login(user: loginUser): any {
        return {message: 'success'}
    }

    register(): any {
        return {message: 'success'}
    }
}
