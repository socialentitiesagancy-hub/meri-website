import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const archiver = require('archiver');

const outputDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.resolve(outputDir, 'socialentities-website.zip');
const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', {
  zlib: { level: 9 }
});

output.on('close', function () {
  console.log(`ZIP created successfully: ${archive.pointer()} total bytes at ${outputPath}`);
});

archive.on('warning', function (err) {
  if (err.code === 'ENOENT') {
    console.warn(err);
  } else {
    throw err;
  }
});

archive.on('error', function (err) {
  throw err;
});

archive.pipe(output);

// Exclude build artifacts and node_modules
const ignoreList = [
  'node_modules/**',
  '.git/**',
  'dist/**',
  '.vite/**',
  'public/socialentities-website.zip',
];

archive.glob('**/*', {
  cwd: process.cwd(),
  ignore: ignoreList,
  dot: true,
});

archive.finalize();
