import { Module } from '@nestjs/common';
import { VocationalFamiliesService } from './vocational-families.service';
import { VocationalFamiliesController } from './vocational-families.controller';

@Module({
  controllers: [VocationalFamiliesController],
  providers: [VocationalFamiliesService],
})
export class VocationalFamiliesModule {}
