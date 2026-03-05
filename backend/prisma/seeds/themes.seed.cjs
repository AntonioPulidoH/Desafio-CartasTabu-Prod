async function seedThemes(prisma) {
  const adminUser = await prisma.user.findUnique({
    where: { email: "admin@app.com" },
  });

  if (!adminUser) {
    throw new Error(
      "No se encontró el usuario admin. Ejecuta su seeder primero.",
    );
  }

  const infoFamily = await prisma.vocationalFamily.findUnique({
    where: { name: "Informática y Comunicaciones" },
  });

  if (!infoFamily) {
    throw new Error("No se encontró la familia de Informática.");
  }

  const themes = [
    {
      name: "Hardware",
      description:
        "Componentes físicos de un ordenador, periféricos y montaje.",
    },
    {
      name: "Sistemas Operativos",
      description:
        "Gestión de memoria, procesos, Windows y distribuciones Linux.",
    },
    {
      name: "Redes Locales",
      description:
        "Protocolos, topologías, cableado y configuración de routers.",
    },
    {
      name: "Programación Web",
      description: "HTML, CSS, JavaScript, Frameworks de desarrollo frontend.",
    },
  ];

  for (const themeData of themes) {
    const existingTheme = await prisma.theme.findFirst({
      where: {
        name: themeData.name,
        creatorId: adminUser.id,
      },
    });

    if (!existingTheme) {
      await prisma.theme.create({
        data: {
          name: themeData.name,
          description: themeData.description,
          creatorId: adminUser.id,
          vocationalFamilyId: infoFamily.id,
        },
      });
      console.log(`Temática creada: ${themeData.name}`);
    } else {
      console.log(`Temática verificada (ya existía): ${themeData.name}`);
    }
  }
}

module.exports = { seedThemes };
