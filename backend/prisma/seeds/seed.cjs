require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { seedRoles } = require("./roles.seed.cjs");
const { seedAdmin } = require("./admin.seed.cjs");
const { seedVocationalFamilies } = require("./vocational-families.seed.cjs");
const { seedThemes } = require("./themes.seed.cjs");

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

async function main() {
  await seedRoles(prisma);
  await seedAdmin(prisma);
  await seedVocationalFamilies(prisma);
  await seedThemes(prisma);
}

main()
  .catch((e) => {
    console.error("ERROR. El seeder falló", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
