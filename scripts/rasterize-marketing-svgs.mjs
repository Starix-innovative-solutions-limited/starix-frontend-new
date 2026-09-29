import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve(process.cwd(), "public");

const FILES = [
  "Mask.svg",
  "masked.svg",
  "cracked.svg",
  "chain.svg",
  "horoscope.svg",
  "charts.svg",
  "hand.svg",
  "or-sweet.svg",
  "ribbons.svg",
  "bstars.svg",
  "foot.svg",
  "foot 2.svg",
  "troph.svg",
  "candy 1.svg",
  "contact star.svg",
  "down.svg",
  "up.svg",
  "book.svg",
  "packer.svg",
  "buttons 3.svg",
  "flash.svg",
  "blustar.svg",
  "or-clock.svg",
  "blue-seats.svg",
  "gateway.svg",
  "closeup.svg",
  "diamondssss.svg",
  "trophy-flo.svg",
  "mbag.svg",
  "mailbox.svg",
  "torch.svg",
  "thumb.svg",
  "bar-chart.svg",
  "binocular.svg",
  "wallet.svg",
  "idaya.svg",
  "playButtons.svg",
  "diamond.svg",
  "trophy.svg",
  "logo light.svg",
  "1.svg",
  "2.svg",
  "3.svg",
  "4.svg",
  "5.svg",
];

const RASTERS = ["frontman.png", "hero-mobile-objects.png"];

async function rasterizeSvg(fileName) {
  const inputPath = path.join(publicDir, fileName);
  const outputPath = path.join(
    publicDir,
    fileName.replace(/\.svg$/i, ".webp")
  );
  const inputStat = await fs.stat(inputPath);
  let source = inputPath;

  try {
    await sharp(inputPath, { density: 72, limitInputPixels: 1 }).metadata();
  } catch {
    const svg = await fs.readFile(inputPath, "utf8");
    const match = svg.match(/data:image\/(?:png|jpeg|jpg|webp);base64,([^"']+)/i);
    if (!match) throw new Error("SVG too large to parse and no embedded raster found");
    source = Buffer.from(match[1], "base64");
  }

  const image = sharp(source, {
    density: 160,
    limitInputPixels: 268402689 * 4,
  }).rotate();

  const output = await image
    .resize({
      width: 1600,
      height: 1600,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 78, effort: 4, alphaQuality: 80 })
    .toBuffer();

  await fs.writeFile(outputPath, output);
  const pct = ((1 - output.length / inputStat.size) * 100).toFixed(0);
  console.log(
    `${fileName}  ${(inputStat.size / 1024 / 1024).toFixed(1)}MB -> ${(output.length / 1024).toFixed(0)}KB  (${pct}% smaller)`
  );
}

async function compressRaster(fileName) {
  const inputPath = path.join(publicDir, fileName);
  const outputPath = path.join(
    publicDir,
    fileName.replace(/\.(png|jpe?g)$/i, ".webp")
  );
  const inputStat = await fs.stat(inputPath);
  const output = await sharp(inputPath)
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 80, effort: 4 })
    .toBuffer();
  await fs.writeFile(outputPath, output);
  console.log(
    `${fileName}  ${(inputStat.size / 1024).toFixed(0)}KB -> ${(output.length / 1024).toFixed(0)}KB`
  );
}

async function main() {
  for (const file of FILES) {
    try {
      await rasterizeSvg(file);
    } catch (error) {
      console.error(`FAILED ${file}: ${error.message}`);
    }
  }
  for (const file of RASTERS) {
    try {
      await compressRaster(file);
    } catch (error) {
      console.error(`FAILED ${file}: ${error.message}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
