import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

import { RegisterDriverDto, RegisterUserDto } from '../auth/DTO/registerUser';
import { Driver, DriverDocument } from './schema/driver.schema';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Driver.name) private driverModel: Model<DriverDocument>,
    private jwtService: JwtService,
  ) {}

  async findOne(
    searchField: Record<string, string>,
  ): Promise<UserDocument | null> {
    return this.userModel.findOne(searchField).exec();
  }

  async createUser(
    user: RegisterUserDto,
  ): Promise<User & Document & { _id: any }> {
    return this.userModel.create(user);
  }

  async findOneDriver(
    searchField: Record<string, string>,
  ): Promise<DriverDocument | null> {
    return this.driverModel.findOne(searchField).exec();
  }

  async createDriver(
    driver: RegisterDriverDto,
  ): Promise<Driver & Document & { _id: any }> {
    return this.driverModel.create(driver);
  }

  async decodeToken(accessToken: string) {
    const token = accessToken.replace('Bearer ', '');
    const verify = await this.jwtService.verifyAsync(token);
    return verify?.driver;
  }
}
