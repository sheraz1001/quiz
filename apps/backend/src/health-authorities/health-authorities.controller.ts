import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HealthAuthoritiesService } from './health-authorities.service';

@ApiTags('Health Authorities')
@Controller('health-authorities')
export class HealthAuthoritiesController {
  constructor(private readonly healthAuthoritiesService: HealthAuthoritiesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all health authorities' })
  async findAll() {
    return this.healthAuthoritiesService.findAll();
  }
}