import { IsBoolean, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(2)
  name: string;
  @IsBoolean()
  completed: boolean;
  @IsNumber()
  userId: number;
}
