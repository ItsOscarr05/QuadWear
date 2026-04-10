/**
 * Runs Prisma CLI after loading `.env` then `.env.local` (override).
 * Prisma alone only reads `.env`, so DIRECT_URL from Vercel pull is often missing.
 */
const { config } = require("dotenv");
const { resolve } = require("path");
const { spawnSync } = require("child_process");

config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local"), override: true });

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: node scripts/prisma-env.cjs <prisma args...>");
  process.exit(1);
}

const result = spawnSync("npx", ["prisma", ...args], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

process.exit(result.status ?? 1);
