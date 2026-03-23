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
  businessPurpleFront: "/products/QW_Business_purple.jpg",
  businessPurpleBack: "/products/QW_back_purple.png",
  businessFrontLilac: "/products/QW_Business_lilac.png",
  backLilac: "/products/QW_back_lilac.png",
  businessBlackFront: "/products/QW_business_black.png",
  backBlack: "/products/QW_back_black.png",
  businessWhiteFront: "/products/QW_Business_white.png",
  backWhite: "/products/QW_back_white.png",
  psychologyLilac: "/products/QW_Psychology_lilac.png",
  computerScienceLilac: "/products/QW_Computer_Science_lilac.png",
};

/** Default first = Purple (matches UI default). */
const JMU_BUSINESS_COLOR_VARIANTS = JSON.stringify([
  {
    name: "Purple",
    hex: "#450084",
    front: IMG.businessPurpleFront,
    back: IMG.businessPurpleBack,
  },
  {
    name: "Black",
    hex: "#1a1a1a",
    front: IMG.businessBlackFront,
    back: IMG.backBlack,
  },
  {
    name: "White",
    hex: "#F5F5F5",
    front: IMG.businessWhiteFront,
    back: IMG.backWhite,
  },
  {
    name: "Lilac",
    hex: "#C8A2C8",
    front: IMG.businessFrontLilac,
    back: IMG.backLilac,
  },
]);

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
      mockupImage: IMG.businessPurpleFront,
      designImage: IMG.businessPurpleBack,
      colorVariants: JMU_BUSINESS_COLOR_VARIANTS,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Business",
      colors: JSON.stringify(["purple", "black", "white", "lilac"]),
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
      mockupImage: IMG.businessPurpleFront,
      designImage: IMG.businessPurpleBack,
      colorVariants: JMU_BUSINESS_COLOR_VARIANTS,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Business",
      colors: JSON.stringify(["purple", "black", "white", "lilac"]),
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
      colorVariants: null,
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
      colorVariants: null,
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

  await prisma.product.upsert({
    where: { slug: "jmu-computer-science-lilac" },
    create: {
      name: quadwearSeededProductName(JMU, "Computer Science"),
      slug: "jmu-computer-science-lilac",
      description:
        "Hand-drawn Computer Science design for JMU on a lilac tee. Same back print as our other JMU lilac shirts.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.computerScienceLilac,
      designImage: IMG.backLilac,
      colorVariants: null,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Computer Science",
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
      name: quadwearSeededProductName(JMU, "Computer Science"),
      description:
        "Hand-drawn Computer Science design for JMU on a lilac tee. Same back print as our other JMU lilac shirts.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.computerScienceLilac,
      designImage: IMG.backLilac,
      colorVariants: null,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Computer Science",
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
    "Seeded products: jmu-business-qw, jmu-psychology-lilac, jmu-computer-science-lilac (images from /public/products/)",
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
