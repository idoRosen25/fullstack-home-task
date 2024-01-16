import { DataSource } from 'typeorm';
import { PostEntity } from './models/post.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'mydb',
  synchronize: true,
  logging: false,
  entities: [PostEntity],
  subscribers: [],
  migrations: [],
});
export const dataManager = AppDataSource.manager;
