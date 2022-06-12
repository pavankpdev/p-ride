import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MapModule } from './map/map.module';
import { RideModule } from './ride/ride.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/pride'),
    AuthModule,
    UserModule,
    MapModule,
    RideModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
