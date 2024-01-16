import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { GetPostsRequestDto } from './dto/get.post.dto';
import { CreatePostRequestDto } from './dto/create.post.dto';
import { UpdatePostRequestDto } from './dto/update.post.dto';
import { ExecutionLogger } from '../logging/execution-logger';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ExecutionLogger()
  async findAll(@Query() query: GetPostsRequestDto) {
    return this.postsService.findAll(query);
  }

  @Post()
  @ExecutionLogger()
  async createPost(@Body() createPostRequest: CreatePostRequestDto) {
    return this.postsService.createPost(createPostRequest);
  }

  @Put(':id')
  @ExecutionLogger()
  async updatePost(
    @Param('id', ParseIntPipe) postId: number,
    updatePostRequest: UpdatePostRequestDto,
  ) {
    return this.postsService.update(postId, updatePostRequest);
  }

  @Delete(':id')
  @ExecutionLogger()
  async delete(@Param('id', ParseIntPipe) postId: number) {
    return this.postsService.delete(postId);
  }
}
