require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

const { seedRoles } = require("./roles.seed.cjs");
const { seedAdmin } = require("./admin.seed.cjs");
const { seedVocationalFamilies } = require("./vocational-families.seed.cjs");
const { seedThemes } = require("./themes.seed.cjs");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

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
    await pool.end();
  });
