import { IsEmail, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;
  @IsEmail()
  email: string;
  @IsUrl()
  avatar: string;
  @IsString()
  address: string;
}
