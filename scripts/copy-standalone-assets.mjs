import { cpSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const standalone = resolve(root, ".next/standalone");

if (!existsSync(standalone)) {
  console.error("[copy-standalone-assets] .next/standalone introuvable — lancez d'abord `npm run build`.");
  process.exit(1);
}

const tasks = [
  { src: resolve(root, "public"), dest: resolve(standalone, "public") },
  { src: resolve(root, ".next/static"), dest: resolve(standalone, ".next/static") },
];

for (const { src, dest } of tasks) {
  if (!existsSync(src)) {
    console.warn(`[copy-standalone-assets] source manquante: ${src}`);
    continue;
  }
  if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
  cpSync(src, dest, { recursive: true });
  console.log(`[copy-standalone-assets] copié ${src} -> ${dest}`);
}
