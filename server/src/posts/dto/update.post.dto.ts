import { PartialType, PickType } from '@nestjs/swagger';
import { CreatePostRequestDto } from './create.post.dto';

export class UpdatePostRequestDto extends PartialType(
  PickType(CreatePostRequestDto, ['title', 'body']),
) {}
