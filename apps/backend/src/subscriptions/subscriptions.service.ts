import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly db: DatabaseService) {}

  async getSubscriptionPlans() {
    return this.db.subscriptionPlan.findMany({
      where: { isActive: true },
      include: {
        specialty: true,
        authority: true
      },
      orderBy: { price: 'asc' }
    });
  }

  async getUserSubscriptions(userId: string) {
    return this.db.userSubscription.findMany({
      where: { userId },
      include: {
        subscriptionPlan: {
          include: {
            specialty: true,
            authority: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}