import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../entities/Brand.entity';
import { BrandsService } from './services/brands.service';
import { BrandsController } from './controllers/brands.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [BrandsService],
  controllers: [BrandsController],
})
export class BrandsModule {}
