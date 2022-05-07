import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    fullname: string;

    @Prop({ required: true })
    address: number;

    @Prop({ required: true })
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);