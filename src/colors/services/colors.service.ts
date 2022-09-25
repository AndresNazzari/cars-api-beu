import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from '../../entities/Color.entity';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
  ) {}

  async findAll() {
    return await this.colorRepository.find();
  }

  async findOne(id: number) {
    return await this.colorRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string) {
    return await this.colorRepository.findOne({ where: { name } });
  }

  async createNewColor(body: any) {
    const newColor = this.colorRepository.create(body);
    return await this.colorRepository.save(newColor);
  }

  async update(color: Color, body: any) {
    this.colorRepository.merge(color, body);
    return await this.colorRepository.save(color);
  }

  async delete(id: number) {
    return await this.colorRepository.softDelete({ id });
  }
}
