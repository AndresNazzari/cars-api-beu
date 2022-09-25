import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { BrandsService } from '../services/brands.service';
import { BrandDto } from '../../dto/Brand.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const brands = await this.brandService.findAll();
      if (brands.length === 0) {
        return res.status(404).json({ msg: 'No brands found', data: brands });
      }
      return res.status(200).json({ msg: 'Success', data: brands });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: 'An error has ocurred', error: error.message });
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: number, @Res() res: Response) {
    try {
      const brand = await this.brandService.findOne(id);
      if (!brand) {
        return res
          .status(404)
          .json({ msg: `No brand found with id ${id}`, data: {} });
      }
      return res.status(200).json({ msg: 'Success', data: brand });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: 'An error has ocurred', error: error.message });
    }
  }
}
