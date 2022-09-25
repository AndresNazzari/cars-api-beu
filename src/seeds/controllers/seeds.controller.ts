import { SeedsService } from './../services/seeds.service';
import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { VehiclesService } from 'src/vehicles/services/vehicles.service';
import { ColorsService } from 'src/colors/services/colors.service';
import { BrandsService } from 'src/brands/services/brands.service';

import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
@ApiTags('Seeds')
@Controller('api/seeds')
export class SeedsController {
  constructor(private SeedsService: SeedsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The seeds has been successfully created.',
  })
  async getAll(@Res() res: Response) {
    try {
      const seeds = await this.SeedsService.seed();
      return res.status(200).json({ msg: 'Success', data: seeds });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: 'An error has ocurred', error: error.message });
    }
  }
}
