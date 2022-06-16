import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RideDocument = Ride & Document;

@Schema()
export class Ride {
  @Prop({ required: true })
  rideId: string;

  @Prop({ required: true })
  address: string;
}

export const RideSchema = SchemaFactory.createForClass(Ride);
