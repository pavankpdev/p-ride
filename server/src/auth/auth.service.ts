import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {User, UserDocument} from './schema/user.schema'
import {LoginUserDto} from './DTO/loginUser'

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private catModel: Model<UserDocument>) {}

    login(loginUserDto: LoginUserDto): any {
        return {loginUserDto}
    }
}
