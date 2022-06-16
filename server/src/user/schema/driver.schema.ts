import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DriverDocument = Driver & Document;

@Schema()
export class Driver {
  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  address: string;

  @Prop({ required: true, unique: true })
  phno: string;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
