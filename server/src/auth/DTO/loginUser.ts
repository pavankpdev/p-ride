import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  address: string;
}

export class DriverLoginDto {
  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;
}
