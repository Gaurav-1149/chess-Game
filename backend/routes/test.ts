// testPrismaConnection.js

import prisma from "../models/prismaClient";

export async function testConnection() {
  try {
    await prisma.$connect()
    console.log("Prisma Connected!");
  } catch (e) {
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
}
