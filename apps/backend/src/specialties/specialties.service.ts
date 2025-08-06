import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class SpecialtiesService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.specialty.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: number) {
    return this.db.specialty.findUnique({
      where: { id },
    });
  }
}