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
import { VehiclesService } from '../services/vehicles.service';
import { ColorsService } from 'src/colors/services/colors.service';
import { BrandsService } from 'src/brands/services/brands.service';
import { VehicleDto } from 'src/dto/Vehicle.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Vehicles')
@Controller('api/vehicles')
export class VehiclesController {
  constructor(
    private vehiclesService: VehiclesService,
    private colorService: ColorsService,
    private brandService: BrandsService,
  ) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const vehicles = await this.vehiclesService.findAll();
      if (vehicles.length === 0) {
        return res
          .status(404)
          .json({ msg: 'No vehicles found', data: vehicles });
      }
      return res.status(200).json({ msg: 'Success', data: vehicles });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: 'An error has ocurred', error: error.message });
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: number, @Res() res: Response) {
    try {
      const vehicle = await this.vehiclesService.findOne(id);
      if (!vehicle) {
        return res
          .status(404)
          .json({ msg: `No color found with id ${id}`, data: {} });
      }
      return res.status(200).json({ msg: 'Success', data: vehicle });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: 'An error has ocurred', error: error.message });
    }
  }

  @Post('')
  async addNewVechicle(@Body() body: VehicleDto, @Res() res: Response) {
    const { type, colors, brands } = body;

    if (!type)
      return res.status(400).json({ msg: 'Type is required', data: {} });

    try {
      const vehicleFound = await this.vehiclesService.findOneByType(type);
      if (!vehicleFound) {
        const vehicleCreated = await this.vehiclesService.createNewVehicle(
          type,
          brands,
          colors,
        );

        return res.status(200).json({ msg: 'Success', data: vehicleCreated });
      } else {
        return res.status(409).json({
          msg: `A vehicle found with type ${type}. Vehicle type name must be unique.`,
          data: vehicleFound,
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ msg: 'An error has ocurred', error: error.message });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: VehicleDto,
    @Res() res: Response,
  ) {
    const { type, brands, colors } = body;

    try {
      const vehicleFound = await this.vehiclesService.findOne(id);
      if (!vehicleFound) {
        return res.status(200).json({
          msg: `A Vehicle with id ${id} has not been found.`,
          data: {},
        });
      }
      type && (vehicleFound.type = type);

      const vehicleUpdated = await this.vehiclesService.update(
        vehicleFound,
        brands,
        colors,
      );

      return res.status(200).json({ msg: 'Success', data: vehicleUpdated });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: 'An error has ocurred', error: error.message });
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    try {
      const vehicleById = await this.vehiclesService.findOne(id);

      if (!vehicleById) {
        return res
          .status(404)
          .json({ msg: `No vehicle found with id ${id}`, data: {} });
      }
      await this.vehiclesService.delete(id);
      return res.status(200).json({ msg: 'Success', data: vehicleById });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: 'An error has ocurred', error: error.message });
    }
  }
}
