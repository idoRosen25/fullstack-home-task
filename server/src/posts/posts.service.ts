import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostEntity } from '../models/post.entity';
import { dataManager } from '../data-source';
import { GetPostsRequestDto } from './dto/get.post.dto';
import { CreatePostRequestDto } from './dto/create.post.dto';
import { UpdatePostRequestDto } from './dto/update.post.dto';

class CustomBadRequestException extends BadRequestException {
  constructor(message) {
    super(message);
  }
}

@Injectable()
export class PostsService {
  constructor() {}

  async createPost(createPostRequest: CreatePostRequestDto) {
    const { userId, body, title } = createPostRequest;
    const isValidUserId = await this.checkIsValidUserId(userId);
    if (!isValidUserId) {
      throw new CustomBadRequestException(
        `User does not exist with id: ${userId}`,
      );
    }
    const postEntity = await dataManager.create(PostEntity, {
      userId,
      title,
      body,
    });
    await dataManager.save(postEntity);
    return postEntity;
  }

  async findAll(query: GetPostsRequestDto) {
    const { userId } = query;
    const isValidUserId = await this.checkIsValidUserId(userId);
    if (userId && !isValidUserId) {
      throw new BadRequestException(`User does not exist with id: ${userId}`);
    }
    const [localPosts, jpPosts] = await Promise.all([
      this.getLocalPosts(userId),
      this.getJpPosts(userId),
    ]);
    return [...localPosts, ...jpPosts];
  }

  async update(postId: number, updatePostRequestDto: UpdatePostRequestDto) {
    const { body, title } = updatePostRequestDto;
    if (!(title || body)) {
      throw new CustomBadRequestException(
        'Update request data must contain at least one of the following: title, body',
      );
    }
    const postForUpdate = await dataManager.findOne(PostEntity, {
      where: { id: postId },
    });
    if (!postForUpdate) {
      throw new NotFoundException();
    }
    return dataManager.update(PostEntity, postId, {
      title: title || postForUpdate.title,
      body: body || postForUpdate.body,
    });
  }

  async delete(postId: number) {
    const post = await dataManager.findOne(PostEntity, {
      where: { id: postId },
    });
    if (!post) {
      throw new NotFoundException();
    }
    return dataManager.remove(post);
  }

  private async getLocalPosts(userId?: number) {
    if (!userId) {
      return [];
    }
    return dataManager.find(PostEntity, {
      where: {
        userId,
      },
    });
  }

  private async getJpPosts(userId?: number) {
    return fetch(
      `https://jsonplaceholder.typicode.com/posts${userId ? `?userId=${userId}` : ''}`,
    )
      .then((res) => res.json())
      .catch((error) => {
        console.error('Error fetching JP posts: ', error);
        return [];
      });
  }

  private async checkIsValidUserId(userId?: number) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.status !== 404)
      .catch((error) => {
        console.error('error in chekc user id: ', error);
        return false;
      });
  }
}
