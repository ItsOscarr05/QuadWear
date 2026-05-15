/**
 * Loads `.env` / `.env.local`, maps Supabase/Vercel `POSTGRES_*` → DATABASE_URL (+ DIRECT_URL for migrations).
 * Prisma schema only declares `DATABASE_URL` (supabase pool). For `prisma migrate *`, DATABASE_URL is
 * temporarily swapped to DIRECT_URL so deploy does not hang on PgBouncer.
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

/** Read a postgres URL from `process.env[key]` after normalization */
function pgFromEnv(key) {
  const v = normalizePostgresUrl(process.env[key]);
  return v && isPg(v) ? v : undefined;
}

/**
 * Vercel + Supabase often expose `POSTGRES_PRISMA_URL` / `POSTGRES_URL` but not `DATABASE_URL`.
 */
function ensurePostgresEnv() {
  const pooled =
    pgFromEnv("DATABASE_URL") ||
    pgFromEnv("POSTGRES_PRISMA_URL") ||
    pgFromEnv("POSTGRES_URL");

  if (pooled) {
    process.env.DATABASE_URL = pooled;
  }

  const direct =
    pgFromEnv("DIRECT_URL") ||
    pgFromEnv("POSTGRES_URL_NON_POOLING") ||
    pgFromEnv("POSTGRES_URL");

  if (direct) {
    process.env.DIRECT_URL = direct;
  }

  if (!process.env.DIRECT_URL && process.env.DATABASE_URL) {
    process.env.DIRECT_URL = process.env.DATABASE_URL;
    console.warn(
      "Prisma: DIRECT_URL not set; using DATABASE_URL. Prefer POSTGRES_URL_NON_POOLING or a direct " +
        ":5432 URL for migrations so migrate does not use the pooler.",
    );
  }
}

/** `prisma generate` / `validate` never connect — schema still requires a datasource URL key */
const PRISMA_CODEGEN_DUMMY_URL =
  "postgresql://prisma:prisma@127.0.0.1:5432/prisma_placeholder?schema=public";

ensurePostgresEnv();

/**
 * Schema uses a single `DATABASE_URL` (pooled — what the app uses). Migrations must hit a
 * session/direct URL. Temporarily swap `DATABASE_URL` to `DIRECT_URL` for `prisma migrate` only.
 */
function spawnPrisma(prismaArgs) {
  let codegenSnapshot = undefined;
  let usedCodegenDummy = false;
  const sub = prismaArgs[0];
  if (sub === "generate" || sub === "validate") {
    const hasDb = pgFromEnv("DATABASE_URL");
    if (!hasDb) {
      codegenSnapshot = process.env.DATABASE_URL;
      process.env.DATABASE_URL = PRISMA_CODEGEN_DUMMY_URL;
      usedCodegenDummy = true;
      console.warn(
        "Prisma: no DATABASE_URL/POSTGRES_* at generate time — using dummy URL " +
          "(no DB connection). Map POSTGRES_URL to DATABASE_URL or set DATABASE_URL on Vercel.",
      );
    }
  }

  const needDirect = prismaArgs[0] === "migrate";
  const pooledRuntimeUrl = process.env.DATABASE_URL;
  if (needDirect && pooledRuntimeUrl) {
    const d = normalizePostgresUrl(process.env.DIRECT_URL);
    const migrateUrl = d && isPg(d) ? d : pooledRuntimeUrl;
    process.env.DATABASE_URL = migrateUrl;
  }
  try {
    return spawnSync("npx", ["prisma", ...prismaArgs], {
      stdio: "inherit",
      shell: true,
      env: process.env,
    });
  } finally {
    if (needDirect && pooledRuntimeUrl !== undefined) {
      process.env.DATABASE_URL = pooledRuntimeUrl;
    }
    if (usedCodegenDummy) {
      if (codegenSnapshot !== undefined) {
        process.env.DATABASE_URL = codegenSnapshot;
      } else {
        delete process.env.DATABASE_URL;
      }
    }
  }
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    "Usage:\n  node scripts/prisma-env.cjs <prisma args...>\n  node scripts/prisma-env.cjs ci-build\n  node scripts/prisma-env.cjs exec <command> [args...]",
  );
  process.exit(1);
}

/** Run prisma migrate deploy then next build under the same patched env (Vercel: DIRECT_URL synth). */
if (args[0] === "ci-build") {
  const migrations = spawnPrisma(["migrate", "deploy"]);
  if (migrations.status !== 0) process.exit(migrations.status ?? 1);

  const buildDbUrl = pgFromEnv("DATABASE_URL") || PRISMA_CODEGEN_DUMMY_URL;
  if (buildDbUrl === PRISMA_CODEGEN_DUMMY_URL) {
    console.warn(
      "Prisma: DATABASE_URL still missing before next build — using dummy for bundling. " +
        "Fix Vercel env (POSTGRES_URL / POSTGRES_PRISMA_URL / DATABASE_URL) for runtime DB access.",
    );
  }
  const next = spawnSync("npx", ["next", "build"], {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, DATABASE_URL: buildDbUrl },
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

const result = spawnPrisma(args);

process.exit(result.status ?? 1);
