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
@ApiTags('Colors')
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

  @Post('')
  async addNewBrand(@Body() body: BrandDto, @Res() res: Response) {
    if (!body.name) {
      return res.status(400).json({ msg: 'Name is required', data: {} });
    }

    try {
      const brandExists = await this.brandService.findOneByName(body.name);
      if (brandExists) {
        return res.status(409).json({
          msg: `A brand found with name ${body.name}. Brand name must be unique.`,
          data: brandExists,
        });
      }
      const brandSaved = await this.brandService.createNewBrand(body);
      return res.status(201).json({ msg: 'Success', data: brandSaved });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: 'An error has ocurred', error: error.message });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: BrandDto,
    @Res() res: Response,
  ) {
    if (!body.name) {
      return res.status(400).json({ msg: 'Name is required', data: {} });
    }
    try {
      const brandById = await this.brandService.findOne(id);
      const brandByName = await this.brandService.findOneByName(body.name);

      if (!brandById) {
        return res
          .status(404)
          .json({ msg: `No brand found with id ${id}`, data: {} });
      }

      if (brandByName) {
        return res.status(409).json({
          msg: `A brand found with name ${body.name}. Brand name must be unique.`,
          data: brandById,
        });
      }

      const brandUpdated = await this.brandService.update(brandById, body);
      return res.status(200).json({ msg: 'Success', data: brandUpdated });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: 'An error has ocurred', error: error.message });
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    try {
      const brandById = await this.brandService.findOne(id);
      if (!brandById) {
        return res
          .status(404)
          .json({ msg: `No brand found with id ${id}`, data: {} });
      }
      await this.brandService.delete(id);

      return res.status(200).json({ msg: 'Success', data: brandById });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: 'An error has ocurred', error: error.message });
    }
  }
}
