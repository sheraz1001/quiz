import { Module } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { SpecialtiesController } from './specialties.controller';

@Module({
  providers: [SpecialtiesService],
  controllers: [SpecialtiesController],
  exports: [SpecialtiesService],
})
export class SpecialtiesModule {}