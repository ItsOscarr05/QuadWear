import "./load-env";
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
  businessPurpleFront:
    "/products/Front_Designs/James_Madison/Purple/QW_Dukes_Business_Purple.jpg",
  businessPurpleBack: "/products/Back_Designs/QW_Back_Purple.png",
  businessFrontLilac:
    "/products/Front_Designs/James_Madison/Lilac/QW_Dukes_Business_Lilac.png",
  backLilac: "/products/Back_Designs/QW_Back_Lilac.png",
  businessBlackFront:
    "/products/Front_Designs/James_Madison/Black/QW_Dukes_Business_Black.png",
  backBlack: "/products/Back_Designs/QW_Back_Black.png",
  businessWhiteFront:
    "/products/Front_Designs/James_Madison/White/QW_Dukes_Business_White.png",
  backWhite: "/products/Back_Designs/QW_Back_White.png",
  psychologyPurple:
    "/products/Front_Designs/James_Madison/Purple/QW_Dukes_Psychology_Purple.jpg",
  psychologyBlack:
    "/products/Front_Designs/James_Madison/Black/QW_Dukes_Psychology_Black.jpg",
  psychologyWhite:
    "/products/Front_Designs/James_Madison/White/QW_Dukes_Psychology_White.jpg",
  psychologyLilac:
    "/products/Front_Designs/James_Madison/Lilac/QW_Dukes_Psychology_Lilac.png",
  computerSciencePurple:
    "/products/Front_Designs/James_Madison/Purple/QW_Dukes_Computer_Science_Purple.jpg",
  computerScienceBlack:
    "/products/Front_Designs/James_Madison/Black/QW_Dukes_Computer_Science_Black.jpg",
  computerScienceWhite:
    "/products/Front_Designs/James_Madison/White/QW_Dukes_Computer_Science_White.png",
  computerScienceLilac:
    "/products/Front_Designs/James_Madison/Lilac/QW_Dukes_Computer_Science_Lilac.png",
  commsPurpleFront:
    "/products/Front_Designs/James_Madison/Purple/QW_Comms_Purple.png",
  commsBlackFront:
    "/products/Front_Designs/James_Madison/Black/QW_Comms_Black.png",
  commsWhiteFront:
    "/products/Front_Designs/James_Madison/White/QW_Comms_White.png",
  commsLilacFront:
    "/products/Front_Designs/James_Madison/Lilac/QW_Comms_Lilac.png",
  educationPurpleFront:
    "/products/Front_Designs/James_Madison/Purple/QuadWear_Dukes_Education_Purple.png",
  educationBlackFront:
    "/products/Front_Designs/James_Madison/Black/QuadWear_Dukes_Education_Black.jpg",
  educationWhiteFront:
    "/products/Front_Designs/James_Madison/White/QuadWear_Dukes_Education_White.jpg",
  educationLilacFront:
    "/products/Front_Designs/James_Madison/Lilac/QuadWear_Dukes_Education_Lilac.jpg",
  engineeringPurpleFront:
    "/products/Front_Designs/James_Madison/Purple/QuadWear_Dukes_Engineering_Purple.jpg",
  engineeringBlackFront:
    "/products/Front_Designs/James_Madison/Black/QuadWear_Dukes_Engineering_Black.jpg",
  engineeringWhiteFront:
    "/products/Front_Designs/James_Madison/White/QuadWear_Dukes_Engineering_White.jpg",
  engineeringLilacFront:
    "/products/Front_Designs/James_Madison/Lilac/QuadWear_Dukes_Engineering_Lilac.jpg",
  musicPurpleFront:
    "/products/Front_Designs/James_Madison/Purple/QuadWear_Dukes_Music_Purple.jpg",
  musicBlackFront:
    "/products/Front_Designs/James_Madison/Black/QuadWear_Dukes_Music_Black.jpg",
  musicWhiteFront:
    "/products/Front_Designs/James_Madison/White/QuadWear_Dukes_Music_White.jpg",
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

const JMU_COMPUTER_SCIENCE_COLOR_VARIANTS = JSON.stringify([
  {
    name: "Purple",
    hex: "#450084",
    front: IMG.computerSciencePurple,
    back: IMG.businessPurpleBack,
  },
  {
    name: "Black",
    hex: "#1a1a1a",
    front: IMG.computerScienceBlack,
    back: IMG.backBlack,
  },
  {
    name: "White",
    hex: "#F5F5F5",
    front: IMG.computerScienceWhite,
    back: IMG.backWhite,
  },
  {
    name: "Lilac",
    hex: "#C8A2C8",
    front: IMG.computerScienceLilac,
    back: IMG.backLilac,
  },
]);

const JMU_PSYCHOLOGY_COLOR_VARIANTS = JSON.stringify([
  {
    name: "Purple",
    hex: "#450084",
    front: IMG.psychologyPurple,
    back: IMG.businessPurpleBack,
  },
  {
    name: "Black",
    hex: "#1a1a1a",
    front: IMG.psychologyBlack,
    back: IMG.backBlack,
  },
  {
    name: "White",
    hex: "#F5F5F5",
    front: IMG.psychologyWhite,
    back: IMG.backWhite,
  },
  {
    name: "Lilac",
    hex: "#C8A2C8",
    front: IMG.psychologyLilac,
    back: IMG.backLilac,
  },
]);

const JMU_COMMUNICATIONS_COLOR_VARIANTS = JSON.stringify([
  {
    name: "Purple",
    hex: "#450084",
    front: IMG.commsPurpleFront,
    back: IMG.businessPurpleBack,
  },
  {
    name: "Black",
    hex: "#1a1a1a",
    front: IMG.commsBlackFront,
    back: IMG.backBlack,
  },
  {
    name: "White",
    hex: "#F5F5F5",
    front: IMG.commsWhiteFront,
    back: IMG.backWhite,
  },
  {
    name: "Lilac",
    hex: "#C8A2C8",
    front: IMG.commsLilacFront,
    back: IMG.backLilac,
  },
]);

const JMU_EDUCATION_COLOR_VARIANTS = JSON.stringify([
  {
    name: "Purple",
    hex: "#450084",
    front: IMG.educationPurpleFront,
    back: IMG.businessPurpleBack,
  },
  {
    name: "Black",
    hex: "#1a1a1a",
    front: IMG.educationBlackFront,
    back: IMG.backBlack,
  },
  {
    name: "White",
    hex: "#F5F5F5",
    front: IMG.educationWhiteFront,
    back: IMG.backWhite,
  },
  {
    name: "Lilac",
    hex: "#C8A2C8",
    front: IMG.educationLilacFront,
    back: IMG.backLilac,
  },
]);

const JMU_ENGINEERING_COLOR_VARIANTS = JSON.stringify([
  {
    name: "Purple",
    hex: "#450084",
    front: IMG.engineeringPurpleFront,
    back: IMG.businessPurpleBack,
  },
  {
    name: "Black",
    hex: "#1a1a1a",
    front: IMG.engineeringBlackFront,
    back: IMG.backBlack,
  },
  {
    name: "White",
    hex: "#F5F5F5",
    front: IMG.engineeringWhiteFront,
    back: IMG.backWhite,
  },
  {
    name: "Lilac",
    hex: "#C8A2C8",
    front: IMG.engineeringLilacFront,
    back: IMG.backLilac,
  },
]);

/** Music: Purple / Black / White only (no lilac front mockup in repo). */
const JMU_MUSIC_COLOR_VARIANTS = JSON.stringify([
  {
    name: "Purple",
    hex: "#450084",
    front: IMG.musicPurpleFront,
    back: IMG.businessPurpleBack,
  },
  {
    name: "Black",
    hex: "#1a1a1a",
    front: IMG.musicBlackFront,
    back: IMG.backBlack,
  },
  {
    name: "White",
    hex: "#F5F5F5",
    front: IMG.musicWhiteFront,
    back: IMG.backWhite,
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
        "Hand-drawn Psychology design for JMU. Front and back artwork on a classic tee.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.psychologyPurple,
      designImage: IMG.businessPurpleBack,
      colorVariants: JMU_PSYCHOLOGY_COLOR_VARIANTS,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Psychology",
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
      name: quadwearSeededProductName(JMU, "Psychology"),
      description:
        "Hand-drawn Psychology design for JMU. Front and back artwork on a classic tee.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.psychologyPurple,
      designImage: IMG.businessPurpleBack,
      colorVariants: JMU_PSYCHOLOGY_COLOR_VARIANTS,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Psychology",
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
    where: { slug: "jmu-computer-science-lilac" },
    create: {
      name: quadwearSeededProductName(JMU, "Computer Science"),
      slug: "jmu-computer-science-lilac",
      description:
        "Hand-drawn Computer Science design for JMU. Front and back artwork on a classic tee.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.computerSciencePurple,
      designImage: IMG.businessPurpleBack,
      colorVariants: JMU_COMPUTER_SCIENCE_COLOR_VARIANTS,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Computer Science",
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
      name: quadwearSeededProductName(JMU, "Computer Science"),
      description:
        "Hand-drawn Computer Science design for JMU. Front and back artwork on a classic tee.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.computerSciencePurple,
      designImage: IMG.businessPurpleBack,
      colorVariants: JMU_COMPUTER_SCIENCE_COLOR_VARIANTS,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Computer Science",
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
    where: { slug: "jmu-communications-qw" },
    create: {
      name: quadwearSeededProductName(JMU, "Communications"),
      slug: "jmu-communications-qw",
      description:
        "Hand-drawn Communications design for JMU. Front and back artwork on a classic tee.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.commsPurpleFront,
      designImage: IMG.businessPurpleBack,
      colorVariants: JMU_COMMUNICATIONS_COLOR_VARIANTS,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Communications",
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
      name: quadwearSeededProductName(JMU, "Communications"),
      description:
        "Hand-drawn Communications design for JMU. Front and back artwork on a classic tee.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.commsPurpleFront,
      designImage: IMG.businessPurpleBack,
      colorVariants: JMU_COMMUNICATIONS_COLOR_VARIANTS,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Communications",
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
    where: { slug: "jmu-education-qw" },
    create: {
      name: quadwearSeededProductName(JMU, "Education"),
      slug: "jmu-education-qw",
      description:
        "Hand-drawn Education design for JMU. Front and back artwork on a classic tee.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.educationPurpleFront,
      designImage: IMG.businessPurpleBack,
      colorVariants: JMU_EDUCATION_COLOR_VARIANTS,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Education",
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
      name: quadwearSeededProductName(JMU, "Education"),
      description:
        "Hand-drawn Education design for JMU. Front and back artwork on a classic tee.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.educationPurpleFront,
      designImage: IMG.businessPurpleBack,
      colorVariants: JMU_EDUCATION_COLOR_VARIANTS,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Education",
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
    where: { slug: "jmu-engineering-qw" },
    create: {
      name: quadwearSeededProductName(JMU, "Engineering"),
      slug: "jmu-engineering-qw",
      description:
        "Hand-drawn Engineering design for JMU. Front and back artwork on a classic tee.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.engineeringPurpleFront,
      designImage: IMG.businessPurpleBack,
      colorVariants: JMU_ENGINEERING_COLOR_VARIANTS,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Engineering",
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
      name: quadwearSeededProductName(JMU, "Engineering"),
      description:
        "Hand-drawn Engineering design for JMU. Front and back artwork on a classic tee.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.engineeringPurpleFront,
      designImage: IMG.businessPurpleBack,
      colorVariants: JMU_ENGINEERING_COLOR_VARIANTS,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Engineering",
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
    where: { slug: "jmu-music-qw" },
    create: {
      name: quadwearSeededProductName(JMU, "Music"),
      slug: "jmu-music-qw",
      description:
        "Hand-drawn Music design for JMU. Front and back artwork on a classic tee. Available on purple, black, and white tees.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.musicPurpleFront,
      designImage: IMG.businessPurpleBack,
      colorVariants: JMU_MUSIC_COLOR_VARIANTS,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Music",
      colors: JSON.stringify(["purple", "black", "white"]),
      sizes: JSON.stringify({
        S: 5,
        M: 10,
        L: 8,
        XL: 4,
        XXL: 2,
      }),
    },
    update: {
      name: quadwearSeededProductName(JMU, "Music"),
      description:
        "Hand-drawn Music design for JMU. Front and back artwork on a classic tee. Available on purple, black, and white tees.",
      price: 2999,
      material: "100% cotton",
      fit: "Unisex",
      mockupImage: IMG.musicPurpleFront,
      designImage: IMG.businessPurpleBack,
      colorVariants: JMU_MUSIC_COLOR_VARIANTS,
      badges: JSON.stringify(["New"]),
      university: "JMU",
      major: "Music",
      colors: JSON.stringify(["purple", "black", "white"]),
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
    "Seeded products: jmu-business-qw, jmu-psychology-lilac, jmu-computer-science-lilac, jmu-communications-qw, jmu-education-qw, jmu-engineering-qw, jmu-music-qw (images from /public/products/)",
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
