import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DriverSchema, Driver } from './schema/driver.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'process.env.JWT_SECRET_KEY',
        signOptions: { expiresIn: '21600000' },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
