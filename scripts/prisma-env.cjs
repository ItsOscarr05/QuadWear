/**
 * Runs Prisma CLI after loading `.env` then `.env.local` (override).
 * Prisma alone only reads `.env`, so DIRECT_URL from Vercel pull is often missing.
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
  const direct = normalizePostgresUrl(process.env.DIRECT_URL);

  if (db && isPg(db)) {
    process.env.DATABASE_URL = db;
  } else if (process.env.POSTGRES_PRISMA_URL) {
    const fb = normalizePostgresUrl(process.env.POSTGRES_PRISMA_URL);
    if (fb && isPg(fb)) process.env.DATABASE_URL = fb;
  }

  if (direct && isPg(direct)) {
    process.env.DIRECT_URL = direct;
  } else if (process.env.POSTGRES_URL_NON_POOLING) {
    const fb = normalizePostgresUrl(process.env.POSTGRES_URL_NON_POOLING);
    if (fb && isPg(fb)) process.env.DIRECT_URL = fb;
  } else if (process.env.POSTGRES_URL) {
    const fb = normalizePostgresUrl(process.env.POSTGRES_URL);
    if (fb && isPg(fb)) process.env.DIRECT_URL = fb;
  }

  if (!process.env.DIRECT_URL && process.env.DATABASE_URL) {
    process.env.DIRECT_URL = process.env.DATABASE_URL;
    console.warn(
      "Prisma: DIRECT_URL is not set; using DATABASE_URL. If you use a connection " +
        "pooler (PgBouncer, serverless), set DIRECT_URL or POSTGRES_URL_NON_POOLING — see .env.example."
    );
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
