import z from 'zod';

export type JpUser = {
  id: number;
  name: string;
  email: string;
  companyName: string;
};

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type CardData = {
  id: number;
  title: string;
  body: string;
};

export const CreatePostSchema = z.object({
  title: z.string().min(1, { message: 'Post title is required' }).max(100),
  body: z.string().min(1, { message: 'Post content is required' }).max(2000),
  userId: z.number().int().positive(),
});

export type AlertProps = {
  id: number;
  type: AlertTypes;
  text: string;
};

export enum AlertTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}
