require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { seedRoles } = require("./roles.seed.cjs");
const { seedFamilies } = require("./vocationalFamilies.seed.cjs");



const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

async function main() {
  await seedRoles(prisma);
  await seedFamilies(prisma)
}

main()
  .catch((e) => {
    console.error("ERROR. El seeder falló", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
