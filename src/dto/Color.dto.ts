import { ApiProperty } from '@nestjs/swagger';

export class ColorDto {
  @ApiProperty({ description: 'The name of the color', default: 'Red' })
  name: string;
}
