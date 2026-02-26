const bcrypt = require("bcryptjs");

async function seedAdmin(prisma) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash("Admin1234!", saltRounds); // Por si coinciden contraseñas

  const adminRole = await prisma.role.findFirst({
    where: { name: "ADMIN" },
  });

  if (!adminRole) {
    throw new Error(
      "El rol ADMIN no existe. Debes ejecutar seedRoles primero.",
    );
  }

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@app.com" },
    update: {},
    create: {
      email: "admin@app.com",
      name: "Super",
      lastName: "Admin",
      password: hashedPassword,
      roleId: adminRole.id,
    },
  });

  console.log(`Usuario Admin creado.`);
}

module.exports = { seedAdmin };
