import { IsNotEmpty } from 'class-validator';

export class NewRideDto {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  carType: 'SUV' | 'Sedan' | 'Prime';

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  distance: number;
}
