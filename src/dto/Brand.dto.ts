import { ApiProperty } from '@nestjs/swagger';

export class BrandDto {
  @ApiProperty({ description: 'The name of the brand', default: 'Ford' })
  name: string;
}
