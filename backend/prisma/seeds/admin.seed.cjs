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

  const adminRegisterCode = await prisma.registerCode.upsert({
    where: { code: 'ADMIN-0001' },
    update: {},
    create: {
      code: 'ADMIN-0001',
      roleId: adminRole.id,
      expiresAt: new Date('2030-01-01'),
      used: true
    }
  })

  const adminUser = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      name: "Super",
      lastName: "Admin",
      password: hashedPassword,
      roleId: adminRole.id,
      registerCodeId: adminRegisterCode.id
    },
  });

  console.log(`Usuario Admin creado.`);
}

module.exports = { seedAdmin };
