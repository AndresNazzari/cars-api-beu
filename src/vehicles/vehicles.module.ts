import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/entities/Brand.entity';
import { Color } from 'src/entities/Color.entity';
import { Vehicle } from 'src/entities/Vehicle.entity';
import { VehiclesService } from './services/vehicles.service';
import { ColorsService } from 'src/colors/services/colors.service';
import { BrandsService } from 'src/brands/services/brands.service';
import { VehiclesController } from './controllers/vehicles.controller';
import { ColorsController } from 'src/colors/controllers/colors.controller';
import { BrandsController } from 'src/brands/controllers/brands.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Brand, Color])],
  providers: [VehiclesService, ColorsService, BrandsService],
  controllers: [VehiclesController, ColorsController, BrandsController],
})
export class VehiclesModule {}
