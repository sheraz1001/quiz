import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class HealthAuthoritiesService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.healthAuthority.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: number) {
    return this.db.healthAuthority.findUnique({
      where: { id },
    });
  }
}