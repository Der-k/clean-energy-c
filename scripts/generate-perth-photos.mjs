// scripts/generate-perth-photos.mjs
// Scans public/images/gallery/Highlights-part2 (Perth Day One) and Highlights-part3 (Perth Day Two)
// and writes public/perth-photos.json, which the Event Recap loads as a plain static file.
//
// Run from the project root:   node scripts/generate-perth-photos.mjs
// Re-run it whenever you add/remove Perth photos (the "prebuild" script below does it on every build).

import fs from "node:fs";
import path from "node:path";

const FOLDER_BY_DAY = {
  "day-1": "Highlights-part2",
  "day-2": "Highlights-part3",
};

// Duplicates to hide, per folder (bare file names, matched case-insensitively).
const removedByFolder = {
  "Highlights-part2": [
    "August31,2026untitled134.JPG",
    "August31,2026untitled154.JPG",
    "clean-energy-conference-audience-018.JPG",
    "clean-energy-conference-audience-026.JPG",
    "clean-energy-conference-audience-027.JPG",
    "clean-energy-conference-audience-031.JPG",
    "clean-energy-conference-audience-033.JPG",
    "clean-energy-conference-audience-035.JPG",
    "clean-energy-conference-audience-039.JPG",
    "clean-energy-conference-audience-043.JPG",
    "clean-energy-conference-audience-044.JPG",
    "clean-energy-conference-award-ceremony-002.JPG",
    "clean-energy-conference-award-ceremony-005.JPG",
    "clean-energy-conference-award-ceremony-006.JPG",
    "clean-energy-conference-award-ceremony-007.JPG",
    "clean-energy-conference-group-photo-026.JPG",
    "clean-energy-conference-group-photo-027.JPG",
    "clean-energy-conference-group-photo-029.JPG",
    "clean-energy-conference-group-photo-032.JPG",
    "clean-energy-conference-group-photo-033.JPG",
    "clean-energy-conference-group-photo-035.JPG",
    "clean-energy-conference-group-photo-039.JPG",
    "clean-energy-conference-group-photo-040.JPG",
    "clean-energy-conference-group-photo-041.JPG",
    "clean-energy-conference-group-photo-043.JPG",
    "clean-energy-conference-group-photo-046.JPG",
    "clean-energy-conference-keynote-034.JPG",
    "clean-energy-conference-keynote-036.JPG",
    "clean-energy-conference-keynote-038.JPG",
    "clean-energy-conference-keynote-039.JPG",
    "clean-energy-conference-keynote-040.JPG",
    "clean-energy-conference-keynote-041.JPG",
    "clean-energy-conference-keynote-042.JPG",
    "clean-energy-conference-keynote-043.JPG",
    "clean-energy-conference-keynote-044.JPG",
    "clean-energy-conference-keynote-045.JPG",
    "clean-energy-conference-keynote-047.JPG",
    "clean-energy-conference-keynote-048.JPG",
    "clean-energy-conference-keynote-049.JPG",
    "clean-energy-conference-keynote-051.JPG",
    "clean-energy-conference-keynote-054.JPG",
    "clean-energy-conference-keynote-058.JPG",
    "clean-energy-conference-keynote-061.JPG",
    "clean-energy-conference-keynote-062.JPG",
    "clean-energy-conference-keynote-064.JPG",
    "clean-energy-conference-keynote-065.JPG",
    "clean-energy-conference-keynote-066.JPG",
    "clean-energy-conference-keynote-068.JPG",
    "clean-energy-conference-keynote-069.JPG",
    "clean-energy-conference-keynote-071.JPG",
    "clean-energy-conference-keynote-072.JPG",
    "clean-energy-conference-keynote-073.JPG",
    "clean-energy-conference-keynote-074.JPG",
    "clean-energy-conference-keynote-077.JPG",
    "clean-energy-conference-networking-027.JPG",
    "clean-energy-conference-networking-035.JPG",
    "clean-energy-conference-networking-037.JPG",
    "clean-energy-conference-networking-039.JPG",
    "clean-energy-conference-networking-040.JPG",
    "clean-energy-conference-networking-041.JPG",
    "clean-energy-conference-other-009.JPG",
    "clean-energy-conference-panel-discussion-001.JPG",
    "clean-energy-conference-panel-discussion-003.JPG",
    "clean-energy-conference-panel-discussion-004.JPG",
    "clean-energy-conference-panel-discussion-005.JPG",
    "clean-energy-conference-panel-discussion-006.JPG",
    "clean-energy-conference-panel-discussion-010.JPG",
    "clean-energy-conference-panel-discussion-012.JPG",
    "clean-energy-conference-panel-discussion-013.JPG",
    "clean-energy-conference-panel-discussion-015.JPG",
    "clean-energy-conference-panel-discussion-017.JPG",
    "clean-energy-conference-panel-discussion-018.JPG",
    "clean-energy-conference-session-020.JPG",
    "clean-energy-conference-session-022.JPG",
    "clean-energy-conference-session-023.JPG",
    "clean-energy-conference-session-025.JPG",
    "clean-energy-conference-session-026.JPG",
    "clean-energy-conference-session-028.JPG",
    "clean-energy-conference-session-029.JPG",
    "clean-energy-conference-session-030.JPG",
    "clean-energy-conference-session-031.JPG",
    "clean-energy-conference-session-033.JPG",
    "clean-energy-conference-session-034.JPG",
    "clean-energy-conference-session-036.JPG",
    "clean-energy-conference-session-040.JPG",
    "clean-energy-conference-session-042.JPG",
    "clean-energy-conference-session-043.JPG",
    "clean-energy-conference-session-046.JPG",
    "clean-energy-conference-session-052.JPG",
    "clean-energy-conference-session-053.JPG",
    "clean-energy-conference-session-055.JPG",
    "clean-energy-conference-session-061.JPG",
    "clean-energy-conference-session-064.JPG",
    "clean-energy-conference-session-065.JPG",
    "clean-energy-conference-session-066.JPG",
    "clean-energy-conference-session-068.JPG",
    "clean-energy-conference-session-069.JPG",
    "clean-energy-conference-session-071.JPG",
    "clean-energy-conference-session-074.JPG",
    "clean-energy-conference-session-075.JPG",
  ],
  "Highlights-part3": [
    "September04,2026untitled044.JPG",
    "September04,2026untitled048.JPG",
    "September04,2026untitled053.JPG",
    "September04,2026untitled056.JPG",
    "September04,2026untitled057.JPG",
    "September04,2026untitled086.JPG",
    "September04,2026untitled093.JPG",
    "September04,2026untitled109.JPG",
    "September04,2026untitled130.JPG",
    "September04,2026untitled134.JPG",
    "September04,2026untitled154.JPG",
    "September04,2026untitled156.JPG",
    "September04,2026untitled177.JPG",
    "September04,2026untitled178.JPG",
    "September04,2026untitled181.JPG",
    "September04,2026untitled193.JPG",
    "clean-energy-conference-audience-001.JPG",
    "clean-energy-conference-audience-003.JPG",
    "clean-energy-conference-audience-004.JPG",
    "clean-energy-conference-audience-007.JPG",
    "clean-energy-conference-audience-012.JPG",
    "clean-energy-conference-audience-013.JPG",
    "clean-energy-conference-group-photo-002.JPG",
    "clean-energy-conference-group-photo-004.JPG",
    "clean-energy-conference-group-photo-005.JPG",
    "clean-energy-conference-group-photo-013.JPG",
    "clean-energy-conference-group-photo-015.JPG",
    "clean-energy-conference-group-photo-017.JPG",
    "clean-energy-conference-group-photo-020.JPG",
    "clean-energy-conference-keynote-001.JPG",
    "clean-energy-conference-keynote-003.JPG",
    "clean-energy-conference-keynote-004.JPG",
    "clean-energy-conference-keynote-005.JPG",
    "clean-energy-conference-keynote-010.JPG",
    "clean-energy-conference-keynote-011.JPG",
    "clean-energy-conference-keynote-013.JPG",
    "clean-energy-conference-keynote-014.JPG",
    "clean-energy-conference-keynote-015.JPG",
    "clean-energy-conference-keynote-016.JPG",
    "clean-energy-conference-keynote-017.JPG",
    "clean-energy-conference-keynote-021.JPG",
    "clean-energy-conference-keynote-022.JPG",
    "clean-energy-conference-keynote-023.JPG",
    "clean-energy-conference-keynote-025.JPG",
    "clean-energy-conference-keynote-026.JPG",
    "clean-energy-conference-keynote-027.JPG",
    "clean-energy-conference-keynote-028.JPG",
    "clean-energy-conference-keynote-029.JPG",
    "clean-energy-conference-keynote-031.JPG",
    "clean-energy-conference-networking-001.JPG",
    "clean-energy-conference-networking-003.JPG",
    "clean-energy-conference-networking-005.JPG",
    "clean-energy-conference-networking-007.JPG",
    "clean-energy-conference-networking-009.JPG",
    "clean-energy-conference-networking-013.JPG",
    "clean-energy-conference-networking-014.JPG",
    "clean-energy-conference-networking-015.JPG",
    "clean-energy-conference-networking-016.JPG",
    "clean-energy-conference-networking-017.JPG",
    "clean-energy-conference-networking-020.JPG",
    "clean-energy-conference-networking-021.JPG",
    "clean-energy-conference-other-002.JPG",
    "clean-energy-conference-other-005.JPG",
    "clean-energy-conference-session-002.JPG",
    "clean-energy-conference-session-007.JPG",
    "clean-energy-conference-session-009.JPG",
    "clean-energy-conference-session-013.JPG",
    "clean-energy-conference-session-014.JPG",
    "clean-energy-conference-session-018.JPG",
    "clean-energy-conference-session-019.JPG",
    "clean-energy-conference-venue-001.JPG",
  ],
};

// Photo type (from the file name) -> recap pool name
const POOL_BY_TYPE = {
  "keynote": "Keynote Session",
  "panel-discussion": "Panel Discussion",
  "award-ceremony": "Award Ceremony",
  "session": "Workshop",
  "networking": "Networking",
  "audience": "Audience",
  "group-photo": "Group Photo",
  "exhibition": "Exhibition",
};

function loadFolder(folder) {
  const dir = path.join(process.cwd(), "public", "images", "gallery", folder);
  if (!fs.existsSync(dir)) {
    console.warn(`Folder not found: ${dir}`);
    return {};
  }
  const removed = new Set((removedByFolder[folder] ?? []).map((n) => n.toLowerCase()));
  const pools = {};

  for (const f of fs.readdirSync(dir).sort()) {
    if (!/\.(jpe?g|png|webp)$/i.test(f) || removed.has(f.toLowerCase())) continue;
    const match = f.match(/^clean-energy-conference-(.+)-\d+\.\w+$/i);
    // Renamed photos go to their type's pool; any other photo still shows up in "Event Photos".
    const pool = (match && POOL_BY_TYPE[match[1].toLowerCase()]) || "Event Photos";
    (pools[pool] ??= []).push(`/images/gallery/${folder}/${encodeURIComponent(f)}`);
  }
  return pools;
}

const result = Object.fromEntries(
  Object.entries(FOLDER_BY_DAY).map(([dayId, folder]) => [dayId, loadFolder(folder)]),
);

fs.writeFileSync(path.join(process.cwd(), "public", "perth-photos.json"), JSON.stringify(result));

for (const [day, pools] of Object.entries(result)) {
  const total = Object.values(pools).reduce((n, p) => n + p.length, 0);
  console.log(`${day}: ${total} photos`, Object.fromEntries(Object.entries(pools).map(([k, v]) => [k, v.length])));
}
