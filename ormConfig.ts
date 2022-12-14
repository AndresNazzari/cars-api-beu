import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'postgres',
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'root',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'cars-api',
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: false,
  subscribers: [],
  migrations: ['src/database/migrations/*.ts'],
});
