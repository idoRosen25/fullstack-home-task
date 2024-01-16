import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export declare class GetPostsRequestDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  userId?: number;
}
