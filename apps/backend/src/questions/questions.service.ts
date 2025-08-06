import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class QuestionsService {
  constructor(private readonly db: DatabaseService) {}

  // Stub implementation - to be expanded for admin features
  async findAll() {
    return this.db.question.findMany({
      take: 10,
      include: {
        authorities: { include: { authority: true } },
        specialties: { include: { specialty: true } }
      }
    });
  }
}