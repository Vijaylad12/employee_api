const { PrismaClient } = require('@prisma/client');

/**
 * Prisma Client Singleton
 * Creates and exports a single Prisma Client instance
 */
const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

module.exports = prisma;
