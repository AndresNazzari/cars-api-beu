import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsModule } from './colors/colors.module';
import { BrandsModule } from './brands/brands.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { Color } from './entities/Color.entity';
import { Brand } from './entities/Brand.entity';
import { Vehicle } from './entities/Vehicle.entity';
import { SeedsModule } from './seeds/seeds.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Color, Brand, Vehicle]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: process.env.POSTGRES_USER || 'root',
      password: process.env.POSTGRES_PASSWORD || 'password',
      database: process.env.POSTGRES_DB || 'cars-api',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
    ColorsModule,
    BrandsModule,
    VehiclesModule,
    SeedsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
