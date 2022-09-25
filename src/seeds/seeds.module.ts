import { Module } from '@nestjs/common';
import { SeedsController } from './controllers/seeds.controller';
import { SeedsService } from './services/seeds.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/entities/Brand.entity';
import { Color } from 'src/entities/Color.entity';
import { Vehicle } from 'src/entities/Vehicle.entity';
import { VehiclesService } from '../vehicles/services/vehicles.service';
import { ColorsService } from 'src/colors/services/colors.service';
import { BrandsService } from 'src/brands/services/brands.service';
import { VehiclesController } from '../vehicles/controllers/vehicles.controller';
import { ColorsController } from 'src/colors/controllers/colors.controller';
import { BrandsController } from 'src/brands/controllers/brands.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Brand, Color])],
  providers: [SeedsService, VehiclesService, ColorsService, BrandsService],
  controllers: [
    SeedsController,
    VehiclesController,
    ColorsController,
    BrandsController,
  ],
})
export class SeedsModule {}
