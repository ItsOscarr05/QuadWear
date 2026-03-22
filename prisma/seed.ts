import { PrismaClient } from "@prisma/client";
import { quadwearSeededProductName } from "../lib/universities";

const prisma = new PrismaClient();

/** Product `name` must include the school mascot — use `quadwearSeededProductName` from `lib/universities`. */
const JMU = "JMU";

/**
 * Paths under `public/products/` — root-relative URLs in the DB.
 * Back-of-shirt art: `QW_back_{color}` (e.g. QW_back_lilac.png) — use for `designImage`.
 */
const IMG = {
  businessFront: "/products/QW_Business_front.jpeg",
  /** Shared lilac-shirt back print */
  backLilac: "/products/QW_back_lilac.png",
  psychologyLilac: "/products/QW_Psychology_lilac.png",
};

async function main() {
  await prisma.product.deleteMany({
    where: { slug: "jmu-computer-science-sample" },
  });

  await prisma.product.upsert({
    where: { slug: "jmu-business-qw" },
    create: {
      name: quadwearSeededProductName(JMU, "Business"),
      slug: "jmu-business-qw",
      description:
        "Hand-drawn Business design for JMU. Front and back artwork on a classic tee.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.businessFront,
      designImage: IMG.backLilac,
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
      name: quadwearSeededProductName(JMU, "Business"),
      description:
        "Hand-drawn Business design for JMU. Front and back artwork on a classic tee.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.businessFront,
      designImage: IMG.backLilac,
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

  await prisma.product.upsert({
    where: { slug: "jmu-psychology-lilac" },
    create: {
      name: quadwearSeededProductName(JMU, "Psychology"),
      slug: "jmu-psychology-lilac",
      description:
        "Hand-drawn Psychology design for JMU on a lilac tee. Same back print as our JMU Business tee.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.psychologyLilac,
      designImage: IMG.backLilac,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Psychology",
      colors: JSON.stringify(["lilac", "purple", "white"]),
      sizes: JSON.stringify({
        S: 5,
        M: 10,
        L: 8,
        XL: 4,
        XXL: 2,
      }),
    },
    update: {
      name: quadwearSeededProductName(JMU, "Psychology"),
      description:
        "Hand-drawn Psychology design for JMU on a lilac tee. Same back print as our JMU Business tee.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.psychologyLilac,
      designImage: IMG.backLilac,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Psychology",
      colors: JSON.stringify(["lilac", "purple", "white"]),
      sizes: JSON.stringify({
        S: 5,
        M: 10,
        L: 8,
        XL: 4,
        XXL: 2,
      }),
    },
  });

  console.log(
    "Seeded products: jmu-business-qw, jmu-psychology-lilac (images from /public/products/)",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
