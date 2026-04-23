/**
 * Runs Prisma CLI after loading `.env` then `.env.local` (override).
 * Maps Vercel/Supabase `POSTGRES_PRISMA_URL` → `DATABASE_URL` (same as `prisma/load-env.ts`).
 */
const { config } = require("dotenv");
const { resolve } = require("path");
const { spawnSync } = require("child_process");

config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local"), override: true });

/** Same rules as `prisma/load-env.ts` — Prisma CLI does not import that file. Vercel often only sets POSTGRES_*. */
function normalizePostgresUrl(value) {
  if (value == null || value === "") return value;
  let v = value.trim();
  while (v.length >= 2 && v.startsWith('"') && v.endsWith('"')) {
    v = v.slice(1, -1).trim();
  }
  v = v.replace(/^"+/, "").replace(/"+$/g, "").trim();
  return v || undefined;
}

const isPg = (u) => u.startsWith("postgres://") || u.startsWith("postgresql://");

function ensurePostgresEnv() {
  const db = normalizePostgresUrl(process.env.DATABASE_URL);
  if (db && isPg(db)) {
    process.env.DATABASE_URL = db;
  } else if (process.env.POSTGRES_PRISMA_URL) {
    const fb = normalizePostgresUrl(process.env.POSTGRES_PRISMA_URL);
    if (fb && isPg(fb)) process.env.DATABASE_URL = fb;
  }
}

ensurePostgresEnv();

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
