// One-shot (and re-runnable) image pipeline replacing Lume's
// `transformImages` + `picture` plugins for this site.
//
// Source of truth: src/img/
//   src/img/*            -> public/img/<name>.avif   (static images)
//   src/img/animated/*   -> public/img/animated/<name>.webp (animated kept animated)
//   src/img/og/*         -> public/img/og/*          (already 1200x630, copied as-is)
// Output: public/img/ (committed static assets, served as-is by Astro)
//
// Usage: pnpm images
// Re-run whenever files under src/img/ change. The build itself does not
// transform images, so `sharp` is only needed when running this script.

import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(root, "..", "src", "img");
const outDir = path.join(root, "..", "public", "img");

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);
const isImage = (name) =>
  IMAGE_EXTS.has(path.extname(name).toLowerCase()) &&
  !name.startsWith(".");

async function convertTopLevel() {
  for (const name of await readdir(srcDir)) {
    if (!isImage(name)) continue;
    const stem = path.basename(name, path.extname(name));
    const input = sharp(path.join(srcDir, name));
    await input.avif({ quality: 60 }).toFile(path.join(outDir, `${stem}.avif`));
    console.log(`img/${name} -> img/${stem}.avif`);
  }
}

async function convertAnimated() {
  const from = path.join(srcDir, "animated");
  const to = path.join(outDir, "animated");
  await mkdir(to, { recursive: true });
  for (const name of await readdir(from)) {
    if (!isImage(name)) continue;
    const stem = path.basename(name, path.extname(name));
    const input = sharp(path.join(from, name), { animated: true });
    await input.webp({ quality: 70 }).toFile(path.join(to, `${stem}.webp`));
    console.log(`img/animated/${name} -> img/animated/${stem}.webp`);
  }
}

async function copyOg() {
  await cp(path.join(srcDir, "og"), path.join(outDir, "og"), {
    recursive: true,
    filter: (src) => {
      const base = path.basename(src);
      return (
        base === "og" || isImage(base) // skips _data.yml, .DS_Store, ...
      );
    },
  });
  console.log("img/og/* copied as-is");
}

await rm(outDir, { recursive: true, force: true });
await mkdir(path.join(outDir, "og"), { recursive: true });
await convertTopLevel();
await convertAnimated();
await copyOg();
