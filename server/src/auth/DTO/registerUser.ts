import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  email: string;
}

export class RegisterDriverDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  address: string;
}
