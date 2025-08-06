import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { 
  HEALTH_AUTHORITIES, 
  SPECIALTIES, 
  SAMPLE_SUBSCRIPTION_PLANS, 
  SAMPLE_QUESTIONS 
} from './seed-data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.quizAnswer.deleteMany();
  await prisma.quizSession.deleteMany();
  await prisma.userSubscription.deleteMany();
  await prisma.subscriptionPlan.deleteMany();
  await prisma.questionSpecialty.deleteMany();
  await prisma.questionAuthority.deleteMany();
  await prisma.question.deleteMany();
  await prisma.user.deleteMany();
  await prisma.specialty.deleteMany();
  await prisma.healthAuthority.deleteMany();

  // Seed Health Authorities
  console.log('🏥 Seeding health authorities...');
  const authorities = await Promise.all(
    HEALTH_AUTHORITIES.map(authority =>
      prisma.healthAuthority.create({ data: authority })
    )
  );
  console.log(`✅ Created ${authorities.length} health authorities`);

  // Seed Specialties
  console.log('🩺 Seeding specialties...');
  const specialties = await Promise.all(
    SPECIALTIES.map(specialty =>
      prisma.specialty.create({ data: specialty })
    )
  );
  console.log(`✅ Created ${specialties.length} specialties`);

  // Create admin user
  console.log('👤 Creating admin user...');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@gcc-portal.com',
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Administrator',
      role: 'ADMIN',
      specialtyId: specialties.find(s => s.name === 'General Practitioner (GP)')?.id,
    },
  });
  console.log('✅ Created admin user');

  // Create sample student users
  console.log('👥 Creating sample users...');
  const sampleUsers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'doctor@example.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Ahmed',
        lastName: 'Al-Mansouri',
        role: 'STUDENT',
        specialtyId: specialties.find(s => s.name === 'General Practitioner (GP)')?.id,
      },
    }),
    prisma.user.create({
      data: {
        email: 'nurse@example.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Fatima',
        lastName: 'Al-Zahra',
        role: 'STUDENT',
        specialtyId: specialties.find(s => s.name === 'Registered Nurse')?.id,
      },
    }),
  ]);
  console.log(`✅ Created ${sampleUsers.length} sample users`);

  // Seed Subscription Plans
  console.log('💳 Seeding subscription plans...');
  const subscriptionPlans = await Promise.all(
    SAMPLE_SUBSCRIPTION_PLANS.map(async (plan) => {
      const specialty = specialties.find(s => s.name === plan.specialtyName);
      const authority = plan.authorityAcronym 
        ? authorities.find(a => a.acronym === plan.authorityAcronym)
        : null;

      return prisma.subscriptionPlan.create({
        data: {
          name: plan.name,
          price: plan.price,
          currency: plan.currency,
          durationDays: plan.durationDays,
          specialtyId: specialty?.id,
          authorityId: authority?.id,
        },
      });
    })
  );
  console.log(`✅ Created ${subscriptionPlans.length} subscription plans`);

  // Give sample users active subscriptions
  console.log('📝 Creating sample subscriptions...');
  const now = new Date();
  const subscriptions = await Promise.all([
    prisma.userSubscription.create({
      data: {
        userId: sampleUsers[0].id,
        subscriptionPlanId: subscriptionPlans[0].id, // GP - DHA Pro
        startDate: now,
        endDate: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000), // 90 days
        status: 'ACTIVE',
      },
    }),
    prisma.userSubscription.create({
      data: {
        userId: sampleUsers[1].id,
        subscriptionPlanId: subscriptionPlans[2].id, // Nursing - MOHAP Essential
        startDate: now,
        endDate: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000), // 60 days
        status: 'ACTIVE',
      },
    }),
  ]);
  console.log(`✅ Created ${subscriptions.length} sample subscriptions`);

  // Seed Questions
  console.log('❓ Seeding questions...');
  const questions = await Promise.all(
    SAMPLE_QUESTIONS.map(async (questionData) => {
      // Create the question
      const question = await prisma.question.create({
        data: {
          questionText: questionData.questionText,
          questionType: questionData.questionType,
          options: questionData.options,
          explanation: questionData.explanation,
          references: questionData.references,
          tags: questionData.tags,
        },
      });

      // Link to authorities
      await Promise.all(
        questionData.authorities.map(async (authorityAcronym) => {
          const authority = authorities.find(a => a.acronym === authorityAcronym);
          if (authority) {
            await prisma.questionAuthority.create({
              data: {
                questionId: question.id,
                authorityId: authority.id,
              },
            });
          }
        })
      );

      // Link to specialties
      await Promise.all(
        questionData.specialties.map(async (specialtyName) => {
          const specialty = specialties.find(s => s.name === specialtyName);
          if (specialty) {
            await prisma.questionSpecialty.create({
              data: {
                questionId: question.id,
                specialtyId: specialty.id,
              },
            });
          }
        })
      );

      return question;
    })
  );
  console.log(`✅ Created ${questions.length} questions with relations`);

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`- Health Authorities: ${authorities.length}`);
  console.log(`- Specialties: ${specialties.length}`);
  console.log(`- Users: ${sampleUsers.length + 1} (including admin)`);
  console.log(`- Subscription Plans: ${subscriptionPlans.length}`);
  console.log(`- Active Subscriptions: ${subscriptions.length}`);
  console.log(`- Questions: ${questions.length}`);
  console.log('\n🔑 Login Credentials:');
  console.log('Admin: admin@gcc-portal.com / admin123');
  console.log('Student 1: doctor@example.com / password123');
  console.log('Student 2: nurse@example.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });