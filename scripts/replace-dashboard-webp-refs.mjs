import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIRS = [
  "app/(dashboard)",
  "components/(creator)",
  "components/(brand)",
  "components/circle",
];

const ASSETS = [
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

const REPLACEMENTS = ASSETS
  .map((name) => ({
    from: name,
    to: name.replace(/\.(svg|png)$/i, ".webp"),
  }))
  .sort((a, b) => b.from.length - a.from.length);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  let changedFiles = 0;
  for (const rel of DIRS) {
    const dir = path.join(ROOT, rel);
    const files = await walk(dir);
    for (const file of files) {
      const original = await fs.readFile(file, "utf8");
      if (original.includes("upload.wikimedia.org")) {
        // keep third-party Wikimedia URLs
      }
      let next = original;
      for (const { from, to } of REPLACEMENTS) {
        next = next.split(from).join(to);
      }
      if (next !== original) {
        await fs.writeFile(file, next);
        changedFiles += 1;
        console.log(path.relative(ROOT, file));
      }
    }
  }
  console.log(`Updated ${changedFiles} files`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
