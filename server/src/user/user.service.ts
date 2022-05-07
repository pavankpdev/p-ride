import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User, UserDocument} from './schema/user.schema'

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findOne(searchfiled: Record<string, string>): Promise<User | null> {
        return this.userModel.findOne(searchfiled).exec();
    }
}
