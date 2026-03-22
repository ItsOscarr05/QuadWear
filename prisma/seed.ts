import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** Placeholder art until real mockups exist; replace URLs when you add assets under `public/`. */
const PLACEHOLDER_IMAGE = "/quadwear-logo.png";

async function main() {
  await prisma.product.upsert({
    where: { slug: "jmu-computer-science-sample" },
    create: {
      name: "JMU Computer Science (sample)",
      slug: "jmu-computer-science-sample",
      description:
        "Example listing for local development. Edit in Prisma Studio or replace via your own seed.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      designImage: PLACEHOLDER_IMAGE,
      mockupImage: PLACEHOLDER_IMAGE,
      badges: JSON.stringify(["New", "Sample"]),
      university: "JMU",
      major: "Computer Science",
      colors: JSON.stringify(["purple", "white"]),
      sizes: JSON.stringify({
        S: 5,
        M: 10,
        L: 8,
        XL: 4,
        XXL: 2,
      }),
    },
    update: {
      name: "JMU Computer Science (sample)",
      description:
        "Example listing for local development. Edit in Prisma Studio or replace via your own seed.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      designImage: PLACEHOLDER_IMAGE,
      mockupImage: PLACEHOLDER_IMAGE,
      badges: JSON.stringify(["New", "Sample"]),
      university: "JMU",
      major: "Computer Science",
      colors: JSON.stringify(["purple", "white"]),
      sizes: JSON.stringify({
        S: 5,
        M: 10,
        L: 8,
        XL: 4,
        XXL: 2,
      }),
    },
  });

  console.log("Seeded sample product: jmu-computer-science-sample");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
