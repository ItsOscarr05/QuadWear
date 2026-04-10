import { config } from "dotenv";
import { resolve } from "path";

/**
 * Load env before Prisma Client. Prisma CLI only auto-loads `.env`, not `.env.local`.
 * Also normalizes connection strings if Vercel / manual edits add extra quotes.
 */
function normalizePostgresUrl(value: string | undefined): string | undefined {
  if (value == null || value === "") return value;
  let v = value.trim();
  // Strip repeated outer quotes (e.g. DATABASE_URL=""postgres://..."" from a bad pull)
  while (v.length >= 2 && v.startsWith('"') && v.endsWith('"')) {
    v = v.slice(1, -1).trim();
  }
  v = v.replace(/^"+/, "").replace(/"+$/g, "").trim();
  return v || undefined;
}

function ensurePostgresEnv() {
  const db = normalizePostgresUrl(process.env.DATABASE_URL);
  const direct = normalizePostgresUrl(process.env.DIRECT_URL);
  const isPg = (u: string) =>
    u.startsWith("postgres://") || u.startsWith("postgresql://");

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
  }
}

config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local"), override: true });
ensurePostgresEnv();
