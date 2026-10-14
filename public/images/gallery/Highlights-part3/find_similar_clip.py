#!/usr/bin/env python3
"""
Find near-duplicate event photos, then let YOU confirm each one.

An image is only flagged when BOTH are true:
  1. CLIP says it shows the same scene        (--threshold, cosine similarity)
  2. its layout matches too (same framing)     (--max-hash, out of 256 bits)
Condition 2 stops "same stage, different moment" photos being flagged.

Setup (one time):
    pip install sentence-transformers pillow numpy

Run from inside the gallery folder:
    python find_similar_clip.py .
    python find_similar_clip.py . --threshold 0.92 --max-hash 40   # stricter
    python find_similar_clip.py . --threshold 0.88 --max-hash 70   # looser

Then open similar_report_clip.html. Every flagged photo is a checkbox
(ticked = remove). Untick any that aren't really duplicates, then copy the
list from the box at the top into page.tsx.

Embeddings are cached in clip_cache.npz, so re-runs take seconds.
"""
import argparse
from pathlib import Path

import numpy as np
from PIL import Image

EXTS = {".jpg", ".jpeg", ".png", ".webp"}


def embed(files, cache_path):
    cache = {}
    if cache_path.exists():
        data = np.load(cache_path, allow_pickle=True)
        cache = dict(zip(data["paths"].tolist(), data["vecs"]))
    todo = [f for f in files if str(f) not in cache]
    if todo:
        from sentence_transformers import SentenceTransformer
        print(f"Loading CLIP model and embedding {len(todo)} images (first run is slow)...")
        model = SentenceTransformer("clip-ViT-B-32")
        for i in range(0, len(todo), 32):
            batch = todo[i:i + 32]
            imgs = []
            for p in batch:
                im = Image.open(p)
                im.draft("RGB", (512, 512))
                imgs.append(im.convert("RGB"))
            vecs = model.encode(imgs, convert_to_numpy=True, normalize_embeddings=True)
            for p, v in zip(batch, vecs):
                cache[str(p)] = v
            print(f"  {min(i + 32, len(todo))}/{len(todo)}")
        np.savez(cache_path, paths=np.array(list(cache.keys())), vecs=np.array(list(cache.values())))
    return np.array([cache[str(f)] for f in files])


def dhash(path, size=16):
    """256-bit layout fingerprint: where it gets brighter/darker across the frame."""
    with Image.open(path) as im:
        im.draft("L", (256, 256))
        g = im.convert("L").resize((size + 1, size), Image.BILINEAR)
    a = np.asarray(g, dtype=np.int16)
    return (a[:, 1:] > a[:, :-1]).flatten()


def displayed_paths():
    """Every image page.tsx actually shows (lowercase 'DAY/file' keys).
    The script only compares these, so the photo it keeps is always one that is visible."""
    pre = "clean-energy-conference-"
    r = lambda a, b: [f"{i:03d}" for i in range(a, b + 1)]
    out = set()

    def add(day, kind, nums):
        for n in nums:
            out.add(f"{day}/{pre}{kind}-{n}.jpg".lower())

    add("DAY1", "audience", r(1, 38)); add("DAY1", "panel-discussion", r(1, 27))
    add("DAY1", "session", r(1, 25)); add("DAY1", "other", r(1, 1))
    add("DAY2", "audience", r(39, 53)); add("DAY2", "panel-discussion", r(28, 53))
    add("DAY2", "session", r(26, 61))
    add("DAY1", "networking", r(1, 24)); out.add(f"DAY1/{pre}networking-025.png".lower())
    add("DAY2", "networking", r(26, 46))
    add("DAY1", "exhibition", r(1, 18)); add("DAY1", "venue", r(1, 10))
    add("DAY1", "keynote", r(1, 25)); add("DAY2", "keynote", r(26, 54))
    add("DAY1", "group-photo", ["001", "003", "004", "005", "006", "007", "008"])
    out.add(f"DAY1/{pre}group-photo-002.jpeg".lower())
    add("DAY2", "group-photo", r(9, 23))
    return out


def group(order, vecs, hashes, thr, max_ham):
    keepers, dupes = [], []
    for idx in order:
        if keepers:
            ks = np.array(keepers)
            sims = vecs[ks] @ vecs[idx]
            ham = (hashes[ks] != hashes[idx]).sum(axis=1)
            ok = (sims >= thr) & (ham <= max_ham)
            if ok.any():
                j = int(np.argmax(np.where(ok, sims, -1)))
                dupes.append((idx, int(ks[j]), float(sims[j]), int(ham[j])))
                continue
        keepers.append(idx)
    return keepers, dupes


def group_chain(order, vecs, hashes, thr, max_ham, max_group=10, S=None, H=None):
    """Like group(), but follows chains: if A~B and B~C, all three are one cluster
    (catches bursts that drift), and only the best-quality photo of each cluster is kept.
    Safety: a cluster bigger than max_group is a runaway chain (everything linking to everything),
    so it is split up and each photo must match a kept photo directly."""
    n = len(vecs)
    if S is None:
        S = vecs @ vecs.T
    if H is None:
        H = (hashes[:, None, :] != hashes[None, :, :]).sum(axis=2)
    adj = (S >= thr) & (H <= max_ham)
    parent = list(range(n))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for i, j in zip(*np.nonzero(np.triu(adj, 1))):
        ri, rj = find(int(i)), find(int(j))
        if ri != rj:
            parent[rj] = ri
    rank = {idx: r for r, idx in enumerate(order)}   # lower rank = better quality
    clusters = {}
    for i in range(n):
        clusters.setdefault(find(i), []).append(i)
    keepers, dupes = [], []
    for members in clusters.values():
        if len(members) > max_group:
            kept = []
            for i in sorted(members, key=lambda i: rank[i]):
                ok = [k for k in kept if S[i, k] >= thr and H[i, k] <= max_ham]
                if ok:
                    k = max(ok, key=lambda k: S[i, k])
                    dupes.append((i, k, float(S[i, k]), int(H[i, k])))
                else:
                    kept.append(i)
            keepers.extend(kept)
            continue
        best = min(members, key=lambda i: rank[i])
        keepers.append(best)
        for i in members:
            if i != best:
                dupes.append((i, best, float(S[i, best]), int(H[i, best])))
    return keepers, dupes


def auto_settings(run, n, target):
    """Try many (CLIP threshold, layout distance) pairs and pick the one whose flagged share
    is closest to `target`; on ties prefer the stricter setting. CLIP is floored at 0.86 because
    below that, same-event photos all look alike and everything matches."""
    best = None
    for t in np.arange(0.95, 0.855, -0.01):
        t = round(float(t), 2)
        for h in range(30, 131, 10):
            frac = len(run(t, h)) / n
            score = (round(abs(frac - target), 2), -t, h)
            if best is None or score < best[0]:
                best = (score, t, h, frac)
    return best[1], best[2], best[3]


TEMPLATE = """<!doctype html><meta charset="utf-8"><title>Review duplicates</title>
<style>
body{font-family:sans-serif;background:#111;color:#eee;margin:0;padding:0 20px 40px}
#bar{position:sticky;top:0;background:#000d;backdrop-filter:blur(6px);padding:12px 0;z-index:5;border-bottom:1px solid #333}
#bar button{padding:6px 12px;margin-right:8px;cursor:pointer}
textarea{width:100%;height:70px;margin-top:8px;background:#1a1a1a;color:#9f9;border:1px solid #333;font:11px monospace}
.row{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:8px}
figure{margin:0;width:220px;border:3px solid #444;padding:4px;box-sizing:border-box}
figure.keep{border-color:#2a2}
figure.dupe{border-color:#c33;cursor:pointer}
figure.dupe.off{border-color:#888;opacity:.55}
img{width:100%;height:160px;object-fit:cover;display:block}
figcaption{font-size:11px;word-break:break-all;margin-top:4px}
</style>
<div id="bar">
  <b id="count"></b>
  <button onclick="setAll(true)">Tick all</button>
  <button onclick="setAll(false)">Untick all</button>
  <button onclick="copyList()">Copy list</button>
  <span style="font-size:12px;color:#aaa">Red/ticked = will be removed. Click a red photo to untick it (keep it).</span>
  <textarea id="out" readonly></textarea>
</div>
<h2>__N_GROUPS__ groups &middot; __N_DUPES__ flagged (CLIP &ge; __THR__, layout distance &le; __HAM__)</h2>
__ROWS__
<script>
const boxes=[...document.querySelectorAll('input[data-path]')];
const out=document.getElementById('out'), count=document.getElementById('count');
function update(){
  const list=boxes.filter(b=>b.checked).map(b=>'  "'+b.dataset.path+'",');
  out.value='const removedFiles = new Set<string>([\\n'+list.join('\\n')+'\\n]);';
  count.textContent=list.length+' selected for removal  ';
  boxes.forEach(b=>b.closest('figure').classList.toggle('off',!b.checked));
}
function setAll(v){boxes.forEach(b=>b.checked=v);update();}
function copyList(){out.select();document.execCommand('copy');}
boxes.forEach(b=>b.addEventListener('change',update));
update();
</script>"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("folder")
    ap.add_argument("--target", type=float, default=0.45,
                    help="auto mode: share of the gallery to flag as duplicates (default 0.45 = about 45%%)")
    ap.add_argument("--threshold", type=float, default=None,
                    help="CLIP similarity. Leave out (together with --max-hash) to let the script pick")
    ap.add_argument("--max-hash", type=int, default=None,
                    help="max layout difference out of 256 bits; lower = stricter. Leave out to auto-pick")
    ap.add_argument("--chain", action=argparse.BooleanOptionalAction, default=True,
                    help="follow chains of similar photos (on by default; --no-chain to turn off)")
    ap.add_argument("--max-group", type=int, default=10,
                    help="with --chain: clusters bigger than this are treated as runaway chains and split (default 10)")
    ap.add_argument("--all", action="store_true",
                    help="compare EVERY image in the folder (use for the other gallery sections, e.g. Highlights part 2/3)")
    ap.add_argument("--compare", nargs=2, metavar=("A", "B"),
                    help="print the scores for two specific photos, to tune thresholds")
    args = ap.parse_args()

    root = Path(args.folder).resolve()
    if not root.is_dir():
        raise SystemExit(f"Folder not found: {root}")
    if args.compare:
        def find_file(x):
            c = Path(x) if Path(x).is_absolute() else root / x
            if c.exists():
                return c
            hits = [q for q in root.rglob("*") if q.name.lower() == Path(x).name.lower()]
            if not hits:
                raise SystemExit(f"Could not find {x} under {root}")
            return hits[0]
        pa, pb = find_file(args.compare[0]), find_file(args.compare[1])
        v = embed([pa, pb], Path("clip_cache.npz"))
        sim = float(v[0] @ v[1])
        ham = int((dhash(pa) != dhash(pb)).sum())
        print(f"\nCLIP similarity: {sim:.3f}   layout distance: {ham}/256")
        thr = args.threshold if args.threshold is not None else 0.90
        mh = args.max_hash if args.max_hash is not None else 50
        print(f"Flagged at CLIP >= {thr}, layout <= {mh}? {'YES' if sim >= thr and ham <= mh else 'NO'}")
        print("To catch this pair, use --threshold at or below the CLIP value and --max-hash at or above the layout value.")
        return
    all_imgs = sorted(p for p in root.rglob("*")
                      if p.suffix.lower() in EXTS and "_duplicates" not in p.parts)
    if args.all:
        files = all_imgs
        if not files:
            raise SystemExit(f"No images found under: {root}")
        print(f"{len(files)} images to compare (every image in the folder)")
    else:
        disp = displayed_paths()
        files = [p for p in all_imgs if p.relative_to(root).as_posix().lower() in disp]
        if not files:
            raise SystemExit(f"None of the main gallery's images were found under: {root}\n"
                             "Main gallery: run from the folder containing DAY1 and DAY2 with: python find_similar_clip.py .\n"
                             "Any other folder: add --all  ->  python find_similar_clip.py . --all")
        found = {f.relative_to(root).as_posix().lower() for f in files}
        missing = sorted(disp - found)
        if missing:
            print(f"NOTE: {len(missing)} images referenced by page.tsx were not found on disk "
                  f"(they show as broken), e.g. {missing[0]}")
        print(f"{len(files)} displayed images to compare")

    good, hash_list = [], []
    for f in files:
        try:
            hash_list.append(dhash(f))
            good.append(f)
        except Exception as e:
            print(f"SKIPPED unreadable image (corrupt or not a real image): "
                  f"{f.relative_to(root).as_posix()} [{type(e).__name__}]")
    files = good
    if not files:
        raise SystemExit("No readable images found.")
    hashes = np.array(hash_list)
    vecs = embed(files, Path("clip_cache.npz"))

    def quality(i):
        with Image.open(files[i]) as im:
            return (-(im.width * im.height), -files[i].stat().st_size)
    order = sorted(range(len(files)), key=quality)

    S = vecs @ vecs.T
    H = (hashes[:, None, :] != hashes[None, :, :]).sum(axis=2)
    if args.chain:
        grouper = lambda o, v, hh, t, m: group_chain(o, v, hh, t, m, args.max_group, S, H)
    else:
        grouper = group

    if args.threshold is None and args.max_hash is None:
        t, h, frac = auto_settings(lambda t, h: grouper(order, vecs, hashes, t, h)[1], len(files), args.target)
        args.threshold, args.max_hash = t, h
        print(f"\nAuto-picked settings: CLIP >= {t}, layout <= {h}  (flags {frac:.0%} of the gallery; target {args.target:.0%})")
    else:
        if args.threshold is None:
            args.threshold = 0.90
        if args.max_hash is None:
            args.max_hash = 50

    print(f"\nFlagged at layout distance <= {args.max_hash}:")
    for t in (0.95, 0.92, 0.90, 0.88, 0.86, 0.84, 0.82, 0.80):
        _, d = grouper(order, vecs, hashes, t, args.max_hash)
        mark = "  <-- using" if abs(t - args.threshold) < 1e-9 else ""
        print(f"  CLIP {t:.2f}: {len(d):4d} flagged{mark}")

    _, dupes = grouper(order, vecs, hashes, args.threshold, args.max_hash)
    print(f"\nFlagged {len(dupes)} of {len(files)}. Gallery would keep {len(files) - len(dupes)} (every group keeps its best photo).")

    if len(dupes) > 0.5 * len(files):
        print("\n" + "!" * 70)
        print(f"WARNING: {len(dupes)} of {len(files)} flagged. These settings are far too loose:")
        print("event photos all look alike to CLIP, so almost everything matches. Do NOT use this list.")
        print("Try a stricter run, e.g.:  --chain --threshold 0.90 --max-hash 80")
        print("!" * 70)

    by_keep = {}
    for i, k, s, h in dupes:
        by_keep.setdefault(k, []).append((i, s, h))
    rows = []
    for n, (k, lst) in enumerate(sorted(by_keep.items()), 1):
        cells = [f'<figure class="keep"><img src="{files[k].as_uri()}">'
                 f'<figcaption>KEEP<br>{files[k].relative_to(root).as_posix()}</figcaption></figure>']
        for i, s, h in lst:
            rel = files[i].relative_to(root).as_posix()
            cells.append(
                f'<figure class="dupe"><label><input type="checkbox" checked hidden data-path="{rel}">'
                f'<img src="{files[i].as_uri()}"></label>'
                f'<figcaption>REMOVE &middot; clip {s:.3f} &middot; layout {h}<br>{rel}</figcaption></figure>')
        rows.append(f"<h3>Group {n}</h3><div class='row'>{''.join(cells)}</div>")

    html = (TEMPLATE.replace("__ROWS__", "".join(rows))
            .replace("__N_GROUPS__", str(len(by_keep))).replace("__N_DUPES__", str(len(dupes)))
            .replace("__THR__", str(args.threshold)).replace("__HAM__", str(args.max_hash)))
    Path("similar_report_clip.html").write_text(html, encoding="utf-8")
    names = sorted(files[i].relative_to(root).as_posix() for i, _, _, _ in dupes)
    Path("removed_images_clip.txt").write_text("\n".join(names), encoding="utf-8")
    print("\nPaste into page.tsx, replacing the old removedFiles:\n")
    print("const removedFiles = new Set<string>([")
    for n in names:
        print(f'  "{n}",')
    print("]);")
    print("\n(Optional: open similar_report_clip.html to untick any that aren't real duplicates.)")


if __name__ == "__main__":
    main()