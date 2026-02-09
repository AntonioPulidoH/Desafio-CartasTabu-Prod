async function seedRoles(prisma) {
  const roles = ["ADMIN", "CREATOR", "USER"];

  for (const roleName of roles) {
    const role = await prisma.role.upsert({
      where: { name: roleName },
      update: {}, // Si existe no cambia nada
      create: {
        name: roleName,
      },
    });
    console.log(`Rol creado/verificado: ${role.name}`);
  }
}

module.exports = { seedRoles };
