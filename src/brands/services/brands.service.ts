import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../../entities/Brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async findAll() {
    return await this.brandRepository.find();
  }

  async findOne(id: number) {
    return await this.brandRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string) {
    return await this.brandRepository.findOne({ where: { name } });
  }

  async createNewBrand(body: any) {
    const newBrand = this.brandRepository.create(body);
    return await this.brandRepository.save(newBrand);
  }

  async update(brand: Brand, body: any) {
    this.brandRepository.merge(brand, body);
    return await this.brandRepository.save(brand);
  }

  async delete(id: number) {
    return await this.brandRepository.softDelete({ id });
  }
}
