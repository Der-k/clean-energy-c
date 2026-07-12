"use client";

import { useEffect, useRef, useState } from "react";
import { SocialEmbed } from "./SocialEmbed";

/**
 * Brand accent green. Not yet defined in globals.css — falls back to #009966
 * so this renders correctly either way. To wire it up properly, add to :root:
 *   --accent-green: #009966;
 */
const GREEN = "var(--accent-green, #009966)";

/**
 * Something upstream (a fade-in/reveal animation on <main>, or an opacity
 * rule applied globally) was overriding inline text colors, which is why
 * plain `style={{ color: ... }}` wasn't sticking. These classes use
 * !important so nothing outside this component can wash them out again.
 */
const OVERRIDE_STYLES = `
  .sw-dark   { color: #0f172a !important; opacity: 1 !important; -webkit-text-fill-color: #0f172a !important; }
  .sw-muted  { color: #334155 !important; opacity: 1 !important; -webkit-text-fill-color: #334155 !important; }
  .sw-navy   { color: #02026e !important; opacity: 1 !important; -webkit-text-fill-color: #02026e !important; }
  .sw-green  { color: #009966 !important; opacity: 1 !important; -webkit-text-fill-color: #009966 !important; }
  .sw-white  { color: #ffffff !important; opacity: 1 !important; -webkit-text-fill-color: #ffffff !important; }

  /* Cards/boxes: force plain white + a simple line border, no dark-mode surface colors */
  .sw-surface {
    background: #ffffff !important;
    border: 1px solid #d0d4f0 !important;
    box-shadow: none !important;
  }
  .sw-surface:hover {
    border-color: #02026e !important;
  }

  /* Full-bleed strips (stat ticker): white background, top/bottom line only */
  .sw-strip {
    background: #ffffff !important;
    border-top: 1px solid #d0d4f0 !important;
    border-bottom: 1px solid #d0d4f0 !important;
  }
`;

type Platform = "instagram" | "linkedin" | "x";
type Size = "normal" | "tall" | "wide";

interface Post {
  id: string;
  platform: Platform;
  name: string;
  handle: string;
  caption: string;
  stats: string;
  time: string;
  size?: Size;
  mediaTint: string; // placeholder gradient — ignored once `embed` is set below
  /**
   * Real embed data. Once you have a post's embed code, fill this in and the
   * placeholder tint above will be replaced with the actual live post.
   *   instagram → just the post URL
   *   x         → the full <blockquote class="twitter-tweet">...</blockquote> from publish.twitter.com
   *   linkedin  → the full <iframe>...</iframe> from LinkedIn's "Embed this post"
   */
  embed?:
    | { platform: "instagram"; url: string }
    | { platform: "x"; html: string }
    | { platform: "linkedin"; html: string };
}

const POSTS: Post[] = [
  {
    id: "p1",
    platform: "instagram",
    name: "Clean Energy Conference",
    handle: "@cleanenergyconf",
    caption:
      "Delegates arriving in Kigali for the opening keynote — energy in the room already.",
    stats: "♥ 842 · 💬 61",
    time: "2h ago",
    size: "tall",
    mediaTint: "linear-gradient(160deg,#E4F5EE,#DDE0F5)",
  },
  {
    id: "p2",
    platform: "linkedin",
    name: "Jason Paul Brewer",
    handle: "CEO, Marula Mining Plc",
    caption:
      "Proud to be speaking on critical minerals and battery metals in Kigali this year. Africa's role in the transition is only getting bigger.",
    stats: "👍 316 · 💬 24",
    time: "5h ago",
    mediaTint: "",
  },
  {
    id: "p3",
    platform: "x",
    name: "Umutoniwase Anitha",
    handle: "@ecogreen_rw",
    caption:
      "Panel on decentralized energy systems was packed. Rwanda's 2030 target is ambitious but the room believes it's doable.",
    stats: "♻ 128 · ♥ 402",
    time: "7h ago",
    mediaTint: "",
  },
  {
    id: "p4",
    platform: "instagram",
    name: "Marula Mining Plc",
    handle: "@marulamining",
    caption: "Exhibition floor setup at Kigali Marriott — see you at Booth 14.",
    stats: "♥ 1.2k · 💬 88",
    time: "9h ago",
    size: "wide",
    mediaTint: "linear-gradient(160deg,#DCEFE6,#E2E4F7)",
  },
  {
    id: "p5",
    platform: "linkedin",
    name: "Professor George Kimathi",
    handle: "Applied Mathematics & Energy Policy",
    caption:
      "Grid storage modeling data from this morning's session is now available to attendees. Link in comments.",
    stats: "👍 204 · 💬 19",
    time: "11h ago",
    mediaTint: "",
  },
  {
    id: "p6",
    platform: "x",
    name: "Perth Energy Desk",
    handle: "@perthenergy",
    caption:
      "Counting down to the Perth edition — green hydrogen and storage take center stage this year.",
    stats: "♻ 96 · ♥ 355",
    time: "1d ago",
    size: "tall",
    mediaTint: "linear-gradient(160deg,#DFF0E8,#E6E8F8)",
  },
  {
    id: "p7",
    platform: "instagram",
    name: "Hon. Dr. Deborah Mulongo",
    handle: "@dr.d.mulongo",
    caption: "Honored to open the climate finance track today in Kigali.",
    stats: "♥ 967 · 💬 71",
    time: "1d ago",
    mediaTint: "linear-gradient(160deg,#E9F6EF,#DEE1F6)",
  },
  {
    id: "p8",
    platform: "linkedin",
    name: "Clean Energy Conference",
    handle: "Official Page",
    caption:
      "Full recap of Day 1 in Kigali — 600+ delegates, 40 speakers, and one clear message: ambition needs investment.",
    stats: "👍 540 · 💬 47",
    time: "1d ago",
    size: "wide",
    mediaTint: "",
  },
];

const STATS = [
  { label: "Mentions this edition", target: 2400 },
  { label: "Delegates posting live", target: 600 },
  { label: "Platforms synced", target: 3 },
  { label: "Countries represented", target: 18 },
];

const TABS: { label: string; value: Platform | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Instagram", value: "instagram" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "X", value: "x" },
];

function AvatarBadge({ platform }: { platform: Platform }) {
  const label = platform === "instagram" ? "IG" : platform === "linkedin" ? "LI" : "X";
  const bg =
    platform === "instagram"
      ? `linear-gradient(135deg, var(--primary), ${GREEN})`
      : platform === "linkedin"
      ? GREEN
      : "var(--primary)";
  return (
    <div
      className="sw-white flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold"
      style={{ background: bg }}
    >
      {label}
    </div>
  );
}

function Stat({ label, target }: { label: string; target: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !done.current) {
            done.current = true;
            const step = Math.max(1, Math.ceil(target / 60));
            let cur = 0;
            const tick = () => {
              cur += step;
              if (cur >= target) {
                setValue(target);
                return;
              }
              setValue(cur);
              requestAnimationFrame(tick);
            };
            tick();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="border-l pl-5 first:border-l-0 first:pl-0" style={{ borderColor: "#b0b6e6" }}>
      <div className="sw-navy font-heading text-[28px] font-bold">
        {value.toLocaleString()}
        {target > 100 ? "+" : ""}
      </div>
      <div className="sw-muted mt-1 text-[12.5px] font-medium">
        {label}
      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const spanClass =
    post.size === "tall" ? "row-span-2" : post.size === "wide" ? "col-span-2" : "";
  const mediaAspect = post.size === "tall" ? "aspect-[4/5.4]" : post.size === "wide" ? "aspect-[16/8]" : "aspect-[4/3]";

  return (
    <article
      className={`hover-glow-card sw-surface flex flex-col overflow-hidden rounded-[14px] ${spanClass}`}
    >
      <div className="flex items-center gap-2.5 px-4 pb-3 pt-3.5">
        <AvatarBadge platform={post.platform} />
        <div className="min-w-0 flex-1">
          <div className="sw-dark truncate text-[13.5px] font-semibold">
            {post.name}
          </div>
          <div className="sw-muted text-[12px] font-medium">
            {post.handle}
          </div>
        </div>
      </div>

      {post.embed ? (
        <div className="px-4 pb-2">
          <SocialEmbed {...post.embed} />
        </div>
      ) : (
        post.mediaTint && (
          <div
            className={`relative w-full bg-cover bg-center ${mediaAspect}`}
            style={{ backgroundImage: post.mediaTint }}
          />
        )
      )}

      <div className="flex flex-1 flex-col gap-2.5 px-4 pb-4 pt-0.5">
        <p className="sw-dark text-[13.5px] leading-[1.55]">
          {post.caption} <span className="sw-green" style={{ fontWeight: 600 }}>#CleanEnergy2026</span>
        </p>
        <div className="sw-muted mt-auto flex items-center justify-between text-[12px] font-medium">
          <span>{post.stats}</span>
          <span>{post.time}</span>
        </div>
      </div>
    </article>
  );
}

export function SocialWall() {
  const [filter, setFilter] = useState<Platform | "all">("all");
  const [loadedAll, setLoadedAll] = useState(false);

  const filtered = filter === "all" ? POSTS : POSTS.filter((p) => p.platform === filter);

  return (
    <div>
      <style>{OVERRIDE_STYLES}</style>

      {/* Hero */}
      <section className="section-tight mx-auto max-w-[1240px] px-8">
        <div className="sw-green mb-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[1.4px]">
          <span className="h-px w-4" style={{ background: GREEN }} />
          Community · Kigali &amp; Perth 2026
        </div>

        <h1 className="sw-navy font-heading max-w-[820px]">
          The conversation happening{" "}
          <span className="sw-green">right now</span>, in one place.
        </h1>

        <p className="sw-muted mt-5 max-w-[560px]">
          Real posts from delegates, speakers, and partners across Instagram, LinkedIn, and X —
          pulled in live as the 2026 editions unfold in Kigali and Perth.
        </p>

        <div className="mt-7 flex flex-wrap gap-3.5">
          <a href="#wall" className="sw-white btn-glow rounded-lg px-5 py-3 text-[14px] font-semibold">
            View the wall
          </a>
          <a
            href="#"
            className="sw-navy btn-outline-glow rounded-lg px-5 py-3 text-[14px] font-semibold"
          >
            Share your post
          </a>
        </div>
      </section>

      {/* Stat ticker */}
      <div className="sw-strip mt-14">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-6 px-8 py-6 md:grid-cols-4">
          {STATS.map((s) => (
            <Stat key={s.label} label={s.label} target={s.target} />
          ))}
        </div>
      </div>

      {/* Wall */}
      <section id="wall" className="mx-auto max-w-[1240px] px-8 py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h2 className="sw-navy font-heading">
              Social wall
            </h2>
            <p className="sw-muted mt-2 max-w-[480px] text-[14.5px]">
              Tag{" "}
              <span className="sw-navy font-heading font-semibold">
                #CleanEnergy2026
              </span>{" "}
              to appear here — posts refresh automatically from Kigali and Perth.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => {
              const active = filter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value)}
                  className={`rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-colors ${
                    active ? "sw-white" : "sw-dark"
                  }`}
                  style={
                    active
                      ? { background: GREEN, borderColor: GREEN }
                      : { borderColor: "#b0b6e6" }
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid auto-rows-auto grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setLoadedAll(true)}
            disabled={loadedAll}
            className="sw-navy btn-outline-glow rounded-lg px-5 py-3 text-[14px] font-semibold disabled:opacity-50"
          >
            {loadedAll ? "No more posts to show" : "Load more posts"}
          </button>
        </div>
      </section>

      {/* CTA strip */}
      <div className="mx-auto max-w-[1240px] px-8 pb-20">
        <div className="sw-surface flex flex-wrap items-center justify-between gap-6 rounded-[18px] px-10 py-11">
          <div>
            <h3 className="sw-navy font-heading">
              Were you at Kigali or Perth?
            </h3>
            <p className="sw-muted mt-1.5 text-[14px]">
              Tag{" "}
              <span className="sw-navy font-heading font-semibold">
                #CleanEnergy2026
              </span>{" "}
              on Instagram, LinkedIn, or X and your post could appear on this wall.
            </p>
          </div>
          <a href="#" className="sw-white btn-glow whitespace-nowrap rounded-lg px-5 py-3 text-[14px] font-semibold">
            Share your post
          </a>
        </div>
      </div>
    </div>
  );
}