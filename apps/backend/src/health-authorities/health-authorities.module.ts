import { Module } from '@nestjs/common';
import { HealthAuthoritiesService } from './health-authorities.service';
import { HealthAuthoritiesController } from './health-authorities.controller';

@Module({
  providers: [HealthAuthoritiesService],
  controllers: [HealthAuthoritiesController],
  exports: [HealthAuthoritiesService],
})
export class HealthAuthoritiesModule {}