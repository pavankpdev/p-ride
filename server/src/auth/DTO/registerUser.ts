import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    fullname: string;

    @IsEmail()
    email: string;
}