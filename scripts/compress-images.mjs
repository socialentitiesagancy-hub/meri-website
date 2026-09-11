/**
 * One-shot image compressor for src/assets/images.
 * Resizes oversized photos/logos and re-encodes as optimized JPEG.
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.resolve(__dirname, '../src/assets/images');

const LOGO_HINTS = ['logo', 'badge'];

async function compressAll() {
  const files = fs.readdirSync(imagesDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  let saved = 0;

  for (const file of files) {
    const inputPath = path.join(imagesDir, file);
    const before = fs.statSync(inputPath).size;
    const isLogo = LOGO_HINTS.some((h) => file.toLowerCase().includes(h));
    const maxWidth = isLogo ? 640 : 1400;
    const quality = isLogo ? 78 : 72;
    const tmpPath = `${inputPath}.tmp.jpg`;

    try {
      await sharp(inputPath)
        .rotate()
        .resize({
          width: maxWidth,
          withoutEnlargement: true,
        })
        .jpeg({
          quality,
          mozjpeg: true,
          chromaSubsampling: '4:2:0',
        })
        .toFile(tmpPath);

      const after = fs.statSync(tmpPath).size;

      // Only keep compressed version if smaller
      if (after < before) {
        fs.unlinkSync(inputPath);
        fs.renameSync(tmpPath, inputPath);
        saved += before - after;
        console.log(
          `${file}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (-${((before - after) / 1024).toFixed(0)}KB)`
        );
      } else {
        fs.unlinkSync(tmpPath);
        console.log(`${file}: kept original (${(before / 1024).toFixed(0)}KB)`);
      }
    } catch (err) {
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
      console.warn(`Skip ${file}:`, err.message || err);
    }
  }

  console.log(`\nTotal saved: ${(saved / 1024 / 1024).toFixed(2)} MB`);
}

compressAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
