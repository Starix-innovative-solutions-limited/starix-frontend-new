import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { optimize as optimizeSvg } from "svgo";

const publicDir = path.resolve(process.cwd(), "public");
const rasterExtensions = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const svgExtensions = new Set([".svg"]);

const rasterOptions = {
  png: { compressionLevel: 9, palette: true, quality: 90, effort: 10 },
  jpeg: { quality: 82, mozjpeg: true },
  webp: { quality: 82, effort: 6 },
};

let optimizedCount = 0;
let skippedCount = 0;
let savedBytes = 0;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

async function writeIfSmaller(filePath, outputBuffer) {
  const input = await fs.readFile(filePath);
  if (outputBuffer.length >= input.length) {
    skippedCount += 1;
    return;
  }

  await fs.writeFile(filePath, outputBuffer);
  optimizedCount += 1;
  savedBytes += input.length - outputBuffer.length;
}

async function optimizeRaster(filePath, extension) {
  const image = sharp(filePath, { animated: true }).rotate();
  let output;

  if (extension === ".png") {
    output = await image.png(rasterOptions.png).toBuffer();
  } else if (extension === ".jpg" || extension === ".jpeg") {
    output = await image.jpeg(rasterOptions.jpeg).toBuffer();
  } else if (extension === ".webp") {
    output = await image.webp(rasterOptions.webp).toBuffer();
  }

  if (output) await writeIfSmaller(filePath, output);
}

async function optimizeSvgFile(filePath) {
  const input = await fs.readFile(filePath, "utf8");
  const result = optimizeSvg(input, {
    path: filePath,
    multipass: true,
    plugins: [
      "preset-default",
      "removeDimensions",
      { name: "removeViewBox", active: false },
      {
        name: "cleanupIds",
        params: {
          minify: true,
          preservePrefixes: ["clip", "mask", "paint", "filter"],
        },
      },
    ],
  });

  if ("data" in result) await writeIfSmaller(filePath, Buffer.from(result.data));
}

async function main() {
  const files = await walk(publicDir);

  for (const filePath of files) {
    const extension = path.extname(filePath).toLowerCase();
    const relative = path.relative(publicDir, filePath);

    try {
      if (rasterExtensions.has(extension)) {
        await optimizeRaster(filePath, extension);
      } else if (svgExtensions.has(extension)) {
        await optimizeSvgFile(filePath);
      }
    } catch (error) {
      skippedCount += 1;
      console.warn(`Skipped ${relative}: ${error.message}`);
    }
  }

  const savedKb = (savedBytes / 1024).toFixed(1);
  console.log(`Optimized ${optimizedCount} files, skipped ${skippedCount}, saved ${savedKb} KB.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
