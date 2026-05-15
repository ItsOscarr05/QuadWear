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

/**
 * `migrate deploy` must use a direct DB URL (bypassing PgBouncer). Pooled 6543 URLs often hang here.
 * Same mapping as `prisma/load-env.ts`, plus `POSTGRES_URL` / `DIRECT=DATABASE` fallbacks.
 */
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
      "Prisma: DIRECT_URL not set; using DATABASE_URL. For Supabase, add DIRECT_URL or " +
        "POSTGRES_URL (session/direct, port 5432) so `migrate` does not use the pooler."
    );
  }
}

ensurePostgresEnv();

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    "Usage:\n  node scripts/prisma-env.cjs <prisma args...>\n  node scripts/prisma-env.cjs ci-build\n  node scripts/prisma-env.cjs exec <command> [args...]",
  );
  process.exit(1);
}

/** Run prisma migrate deploy then next build under the same patched env (Vercel: DIRECT_URL synth). */
if (args[0] === "ci-build") {
  const migrations = spawnSync(
    "npx",
    ["prisma", "migrate", "deploy"],
    {
      stdio: "inherit",
      shell: true,
      env: process.env,
    },
  );
  if (migrations.status !== 0) process.exit(migrations.status ?? 1);

  const next = spawnSync("npx", ["next", "build"], {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
  process.exit(next.status ?? 1);
}

/** Run an arbitrary command with the same postgres env as Prisma (e.g. exec next build). */
if (args[0] === "exec") {
  const rest = args.slice(1);
  if (rest.length === 0) {
    console.error("exec requires a command, e.g. exec next build");
    process.exit(1);
  }
  const [cmd, ...cmdArgs] = rest;
  const result = spawnSync(cmd, cmdArgs, {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
  process.exit(result.status ?? 1);
}

const result = spawnSync("npx", ["prisma", ...args], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

process.exit(result.status ?? 1);
