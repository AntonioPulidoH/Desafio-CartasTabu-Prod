async function seedFamilies(prisma) {
  const families = ["Administracion", "Informatica", "Mecanica", "Electronica"];

  for (const familyName of families) {
    const family = await prisma.vocationalFamily.upsert({
      where: { name: familyName },
      update: {},
      create: {
        name: familyName,
      },
    });
    console.log(`Familia profesional creado/verificado: ${family.name}`);
  }
}

module.exports = { seedFamilies };