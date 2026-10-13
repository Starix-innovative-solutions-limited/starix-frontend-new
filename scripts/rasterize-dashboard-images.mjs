import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve(process.cwd(), "public");

const FILES = [
  "yt.svg",
  "ig.svg",
  "tt.svg",
  "coin.svg",
  "diamonddd.svg",
  "candyyy.svg",
  "Stroke.svg",
  "avatar.svg",
  "default-circle.svg",
  "default.svg",
  "sw1.svg",
  "sw2.svg",
  "puzzle.svg",
  "vectros.svg",
  "circle.svg",
  "close.svg",
  "dashlogo.svg",
  "dash-logo.svg",
  "gem.svg",
  "home.svg",
  "challenges.svg",
  "circles.svg",
  "walletss.svg",
  "pie.svg",
  "user.svg",
  "icon-logs.svg",
  "logout.svg",
  "bluplay.svg",
  "dash-group.svg",
  "bluplay 2.svg",
  "chains.svg",
  "nivea.svg",
  "left1.svg",
  "right1.svg",
  "groupss.svg",
  "Parent.svg",
  "withdraw.svg",
  "trphy.svg",
  "media.svg",
  "Brands Dp.svg",
  "badge.svg",
  "Badge 1.svg",
  "Trophy22.svg",
  "tiktok.svg",
  "doc.svg",
  "stars.svg",
  "ball.svg",
  "trophys.svg",
  "access.svg",
  "fcmb.svg",
  "gtb.svg",
  "moniepoint.svg",
  "zenith.svg",
  "improve.svg",
  "n-logo.svg",
  "trophy.svg",
  "Trophy 2.svg",
  "heart 1.svg",
  "Play buttons 1.svg",
  "placeholder-circle.png",
  "card22.png",
  "profile.png",
  "star.png",
  "rule.png",
  "feed.png",
  "images/avatar.png",
  "images/logout.png",
  "images/support.png",
];

function outputName(fileName) {
  return fileName.replace(/\.(svg|png|jpe?g)$/i, ".webp");
}

async function convert(fileName) {
  const inputPath = path.join(publicDir, fileName);
  const outputPath = path.join(publicDir, outputName(fileName));
  await fs.access(inputPath);

  const inputStat = await fs.stat(inputPath);
  const isSvg = fileName.toLowerCase().endsWith(".svg");
  const image = sharp(inputPath, {
    density: isSvg ? 256 : undefined,
    limitInputPixels: 268402689 * 4,
  }).rotate();

  const meta = await image.metadata();
  const width = meta.width || 256;
  const height = meta.height || 256;
  const maxSide = Math.max(width, height);
  const targetMax = isSvg && maxSide < 128 ? Math.round(maxSide * 3) : maxSide;

  const output = await image
    .resize({
      width: Math.min(targetMax, 1920),
      height: Math.min(targetMax, 1920),
      fit: "inside",
      withoutEnlargement: !(isSvg && maxSide < 128),
    })
    .webp({ quality: 82, effort: 5, alphaQuality: 90 })
    .toBuffer();

  await fs.writeFile(outputPath, output);
  console.log(
    `${fileName}  ${width}x${height}  ${(inputStat.size / 1024).toFixed(1)}KB -> ${(output.length / 1024).toFixed(1)}KB`
  );
}

async function main() {
  for (const file of FILES) {
    try {
      await convert(file);
    } catch (error) {
      console.error(`SKIP ${file}: ${error.message}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
