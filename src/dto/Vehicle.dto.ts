import { ApiProperty } from '@nestjs/swagger';

export class VehicleDto {
  @ApiProperty({
    description: 'The type of the vehicle.Ej: Car, Truck, Motorcycle',
  })
  type: string;

  @ApiProperty({
    description: 'The list of brands id of the vehicle',
    type: [Number],
    default: [1],
    required: false,
  })
  brands: number[];

  @ApiProperty({
    description: 'The list of colors id of the vehicle',
    type: [Number],
    default: [1],
    required: false,
  })
  colors: number[];
}
