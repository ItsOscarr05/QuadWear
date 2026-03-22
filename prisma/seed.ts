import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** Paths under `public/products/` — use root-relative URLs in the DB */
const IMG = {
  businessFront: "/products/QW_Business_front.jpeg",
  businessBack: "/products/QW_Business_back.png",
};

async function main() {
  await prisma.product.deleteMany({
    where: { slug: "jmu-computer-science-sample" },
  });

  await prisma.product.upsert({
    where: { slug: "jmu-business-qw" },
    create: {
      name: "QuadWear Business",
      slug: "jmu-business-qw",
      description:
        "Hand-drawn Business design for JMU. Front and back artwork on a classic tee.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.businessFront,
      designImage: IMG.businessBack,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Business",
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
      name: "QuadWear Business",
      description:
        "Hand-drawn Business design for JMU. Front and back artwork on a classic tee.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.businessFront,
      designImage: IMG.businessBack,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Business",
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

  console.log("Seeded product: jmu-business-qw (images from /public/products/)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
