import { Module } from '@nestjs/common';
import { ColorsController } from './controllers/colors.controller';
import { ColorsService } from './services/colors.service';

@Module({
  controllers: [ColorsController],
  providers: [ColorsService]
})
export class ColorsModule {}
