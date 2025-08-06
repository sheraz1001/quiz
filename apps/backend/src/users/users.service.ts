import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async findById(id: string) {
    const user = await this.db.user.findUnique({
      where: { id },
      include: {
        specialty: true,
        subscriptions: {
          where: { status: 'ACTIVE' },
          include: {
            subscriptionPlan: {
              include: {
                specialty: true,
                authority: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string) {
    return this.db.user.findUnique({
      where: { email },
      include: {
        specialty: true,
      },
    });
  }

  async updateProfile(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.db.user.update({
      where: { id: userId },
      data: updateUserDto,
      include: {
        specialty: true,
        subscriptions: {
          where: { status: 'ACTIVE' },
          include: {
            subscriptionPlan: {
              include: {
                specialty: true,
                authority: true,
              },
            },
          },
        },
      },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUserStats(userId: string) {
    const [totalQuizzes, averageScore, totalQuestions] = await Promise.all([
      this.db.quizSession.count({
        where: { userId, status: 'COMPLETED' },
      }),
      this.db.quizSession.aggregate({
        where: { userId, status: 'COMPLETED' },
        _avg: { score: true },
      }),
      this.db.quizAnswer.count({
        where: { quizSession: { userId } },
      }),
    ]);

    const correctAnswers = await this.db.quizAnswer.count({
      where: {
        quizSession: { userId },
        isCorrect: true,
      },
    });

    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    return {
      totalQuizzes,
      averageScore: averageScore._avg.score || 0,
      totalQuestions,
      accuracy: Math.round(accuracy),
    };
  }

  async getQuizHistory(userId: string) {
    return this.db.quizSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }
}