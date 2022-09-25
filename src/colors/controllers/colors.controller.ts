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
import { ColorsService } from '../services/colors.service';
import { ColorDto } from '../../dto/Color.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Colors')
@Controller('api/colors')
export class ColorsController {
  constructor(private colorsService: ColorsService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const colors = await this.colorsService.findAll();
      if (colors.length === 0) {
        return res.status(404).json({ msg: 'No colors found', data: colors });
      }
      return res.status(200).json({ msg: 'Success', data: colors });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: 'An error has ocurred', error: error.message });
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: number, @Res() res: Response) {
    try {
      const color = await this.colorsService.findOne(id);
      if (!color) {
        return res
          .status(404)
          .json({ msg: `No color found with id ${id}`, data: {} });
      }
      return res.status(200).json({ msg: 'Success', data: color });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: 'An error has ocurred', error: error.message });
    }
  }

  @Post('')
  async addNewColor(@Body() body: ColorDto, @Res() res: Response) {
    if (!body.name) {
      return res.status(400).json({ msg: 'Name is required', data: {} });
    }

    try {
      const colorExists = await this.colorsService.findOneByName(body.name);
      if (colorExists) {
        return res.status(409).json({
          msg: `A color found with name ${body.name}. Color name must be unique.`,
          data: colorExists,
        });
      }
      const colorSaved = await this.colorsService.createNewColor(body);

      return res.status(201).json({ msg: 'Success', data: colorSaved });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: 'An error has ocurred', error: error.message });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: ColorDto,
    @Res() res: Response,
  ) {
    if (!body.name) {
      return res.status(400).json({ msg: 'Name is required', data: {} });
    }
    try {
      const colorById = await this.colorsService.findOne(id);
      const colorByName = await this.colorsService.findOneByName(body.name);

      if (!colorById) {
        return res
          .status(404)
          .json({ msg: `No color found with id ${id}`, data: {} });
      }

      if (colorByName) {
        return res.status(409).json({
          msg: `A color found with name ${body.name}. Color name must be unique.`,
          data: colorById,
        });
      }

      const colorUpdated = await this.colorsService.update(colorById, body);
      return res.status(200).json({ msg: 'Success', data: colorUpdated });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: 'An error has ocurred', error: error.message });
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    try {
      const colorById = await this.colorsService.findOne(id);

      if (!colorById) {
        return res
          .status(404)
          .json({ msg: `No color found with id ${id}`, data: {} });
      }
      await this.colorsService.delete(id);

      return res.status(200).json({ msg: 'Success', data: colorById });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: 'An error has ocurred', error: error.message });
    }
  }
}
