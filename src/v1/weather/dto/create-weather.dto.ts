import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateWeatherDto {
  @IsString()
  @MinLength(3)
  name: string;
  @IsNumber()
  temperature: number;
  @IsString()
  condition: string;
  @IsNumber()
  humidity: number;
}
