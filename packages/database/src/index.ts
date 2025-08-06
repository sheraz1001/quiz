import { PrismaClient } from '@prisma/client';

// Global Prisma client instance
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Re-export Prisma types for use in other packages
export * from '@prisma/client';

// Export utility functions
export * from './seed-data';