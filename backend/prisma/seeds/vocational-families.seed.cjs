async function seedVocationalFamilies(prisma) {
  const families = [
    "Informática y Comunicaciones",
    "Hostelería y Turismo",
    "Sanidad",
    "Administración y Gestión",
    "Comercio y Marketing",
    "Electricidad y Electrónica",
    "Servicios Socioculturales y a la Comunidad",
    "Imagen y Sonido",
  ];

  for (const familyName of families) {
    const family = await prisma.vocationalFamily.upsert({
      where: { name: familyName },
      update: {},
      create: {
        name: familyName,
      },
    });

    console.log(`Familia Profesional creada/verificada: ${family.name}`);
  }
}

module.exports = { seedVocationalFamilies };
