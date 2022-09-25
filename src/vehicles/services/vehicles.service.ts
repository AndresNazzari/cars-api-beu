import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from 'src/entities/Vehicle.entity';
import { Brand } from 'src/entities/Brand.entity';
import { Color } from 'src/entities/Color.entity';
import { ColorsService } from 'src/colors/services/colors.service';
import { BrandsService } from 'src/brands/services/brands.service';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    @InjectRepository(Color) private colorRepository: Repository<Color>,
    private colorService: ColorsService,
    private brandService: BrandsService,
  ) {}

  async findAll() {
    return await this.vehicleRepository.find();
  }

  async findOne(id: number) {
    return await this.vehicleRepository.findOne({ where: { id } });
  }

  async findOneByType(type: string) {
    return await this.vehicleRepository.findOne({ where: { type } });
  }

  async createNewVehicle(type: string, brands: number[], colors: number[]) {
    const newVehicle = new Vehicle();
    newVehicle.type = type;
    brands &&
      (newVehicle.brands = await this.brandRepository.findByIds(brands));
    colors &&
      (newVehicle.colors = await this.colorRepository.findByIds(colors));
    return await this.vehicleRepository.save(newVehicle);
  }

  async update(vehicle: Vehicle, brands: number[], colors: number[]) {
    brands && (vehicle.brands = await this.brandRepository.findByIds(brands));
    colors && (vehicle.colors = await this.colorRepository.findByIds(colors));
    return this.vehicleRepository.save(vehicle);
  }

  async delete(id: number) {
    return await this.vehicleRepository.softDelete({ id });
  }
}
