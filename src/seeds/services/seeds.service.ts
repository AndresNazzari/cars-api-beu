import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from 'src/entities/Vehicle.entity';
import { Brand } from 'src/entities/Brand.entity';
import { Color } from 'src/entities/Color.entity';
import { ColorsService } from 'src/colors/services/colors.service';
import { BrandsService } from 'src/brands/services/brands.service';
import { VehiclesService } from 'src/vehicles/services/vehicles.service';

@Injectable()
export class SeedsService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    @InjectRepository(Color) private colorRepository: Repository<Color>,
    private colorService: ColorsService,
    private brandService: BrandsService,
    private vehicleService: VehiclesService,
  ) {}

  async seed() {
    const color1 = await this.colorService.createNewColor({ name: 'red' });
    const color2 = await this.colorService.createNewColor({ name: 'blue' });
    const color3 = await this.colorService.createNewColor({ name: 'green' });

    const brand1 = await this.brandService.createNewBrand({ name: 'ford' });
    const brand2 = await this.brandService.createNewBrand({ name: 'lambo' });
    const brand3 = await this.brandService.createNewBrand({ name: 'toyota' });

    return { color1, color2, color3, brand1, brand2, brand3 };
  }
}
