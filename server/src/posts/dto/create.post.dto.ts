import { Type } from 'class-transformer';
import { IsInt, IsString, MaxLength } from 'class-validator';

export class CreatePostRequestDto {
  @IsInt()
  @Type(() => Number)
  userId: number;

  @IsString()
  @MaxLength(1000)
  title: string;

  @IsString()
  @MaxLength(2000)
  body: string;
}
