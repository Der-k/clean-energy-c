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
  /**
   * The real, human-visitable post URL — used for the "View on Instagram/
   * LinkedIn/X" link on the card and in the focus modal. Optional: if you
   * don't have it (e.g. LinkedIn's embed code doesn't include one), the
   * link just won't render.
   */
  permalink?: string;
}

const POSTS: Post[] = [
  {
    id: "p1",
    platform: "instagram",
    name: "Clean Energy Conference Australia Africa",
    handle: "@cleanenergyconference.au",
    caption:
      "Delegates arriving in Kigali for the opening keynote — energy in the room already.",
    stats: "♥ 842 · 💬 61",
    time: "2h ago",
    size: "tall",
    mediaTint: "linear-gradient(160deg,#E4F5EE,#DDE0F5)",
    embed: { platform: "instagram", url: "https://www.instagram.com/p/DaiLnJbjNAS/" },
    permalink: "https://www.instagram.com/p/DaiLnJbjNAS/",
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
    embed: {
      platform: "linkedin",
      html: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7470523314604597248?collapsed=1" height="567" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
    },
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
    name: "Clean Energy Conference Australia Africa",
    handle: "@cleanenergyconference.au",
    caption: "Exhibition floor setup at Kigali Marriott — see you at Booth 14.",
    stats: "♥ 1.2k · 💬 88",
    time: "9h ago",
    size: "wide",
    mediaTint: "linear-gradient(160deg,#DCEFE6,#E2E4F7)",
    embed: { platform: "instagram", url: "https://www.instagram.com/p/Daf9PtlEYD0/" },
    permalink: "https://www.instagram.com/p/Daf9PtlEYD0/",
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
    embed: {
      platform: "linkedin",
      html: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7470774903638581249?collapsed=1" height="745" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
    },
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
    name: "Clean Energy Conference Australia Africa",
    handle: "@cleanenergyconference.au",
    caption: "Honored to open the climate finance track today in Kigali.",
    stats: "♥ 967 · 💬 71",
    time: "1d ago",
    mediaTint: "linear-gradient(160deg,#E9F6EF,#DEE1F6)",
    embed: { platform: "instagram", url: "https://www.instagram.com/p/DaLJA1ol8l0/" },
    permalink: "https://www.instagram.com/p/DaLJA1ol8l0/",
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
  {
    id: "p9",
    platform: "instagram",
    name: "Clean Energy Conference Australia Africa",
    handle: "@cleanenergyconference.au",
    caption: "Another moment from the conference floor — the energy keeps building.",
    stats: "♥ 0 · 💬 0",
    time: "Just now",
    mediaTint: "linear-gradient(160deg,#E4F5EE,#DDE0F5)",
    embed: { platform: "instagram", url: "https://www.instagram.com/p/DbaVw6pFgyp/" },
    permalink: "https://www.instagram.com/p/DbaVw6pFgyp/",
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

function ExternalLinkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function PostCard({ post, onOpen }: { post: Post; onOpen: (post: Post) => void }) {
  const mediaAspect = post.size === "tall" ? "aspect-[4/5.4]" : post.size === "wide" ? "aspect-[16/8]" : "aspect-[4/3]";

  return (
    <article
      onClick={() => onOpen(post)}
      className="hover-glow-card sw-surface mb-[18px] flex w-full cursor-pointer flex-col overflow-hidden rounded-[14px] break-inside-avoid"
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
        {post.permalink && (
          <a
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title={`View original post`}
            className="sw-muted flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors hover:!text-[#02026e]"
            style={{ border: "1px solid #d0d4f0" }}
          >
            <ExternalLinkIcon />
          </a>
        )}
      </div>

      {post.embed ? (
        // The overlay below sits above the embed purely to catch clicks —
        // iframes (LinkedIn, and Instagram once its script runs) are a
        // separate browsing context, so a click inside one never bubbles
        // up to this card's onClick. The overlay intercepts it first, then
        // its own click bubbles normally to open the focus modal.
        <div className="relative px-4 pb-2">
          <div className="relative">
            <div className="absolute inset-0 z-10" />
            <SocialEmbed {...post.embed} />
          </div>
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

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/**
 * Focus view: opened when a card is clicked. Shows the full post — real
 * embeds are rendered directly here (not behind a click-catcher), so they're
 * genuinely interactive, and a "View on [platform]" link is always available
 * for anyone who wants the original page instead.
 */
function PostModal({ post, onClose }: { post: Post; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const platformLabel = post.platform === "instagram" ? "Instagram" : post.platform === "linkedin" ? "LinkedIn" : "X";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-10 sm:p-8"
      style={{ background: "rgba(2,2,102,0.45)", backdropFilter: "blur(2px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="sw-surface relative w-full max-w-[560px] rounded-[16px]"
        style={{ boxShadow: "0 24px 64px rgba(2,2,102,0.28)" }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="sw-dark absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white"
          style={{ border: "1px solid #d0d4f0" }}
        >
          <CloseIcon />
        </button>

        <div className="flex items-center gap-3 px-5 pb-3 pt-5">
          <AvatarBadge platform={post.platform} />
          <div className="min-w-0 flex-1">
            <div className="sw-dark text-[15px] font-semibold">{post.name}</div>
            <div className="sw-muted text-[13px] font-medium">{post.handle}</div>
          </div>
        </div>

        <div className="px-5 pb-2">
          {post.embed ? (
            <SocialEmbed {...post.embed} />
          ) : (
            post.mediaTint && (
              <div
                className="w-full rounded-[10px] bg-cover bg-center aspect-[4/3]"
                style={{ backgroundImage: post.mediaTint }}
              />
            )
          )}
        </div>

        <div className="flex flex-col gap-3 px-5 pb-6 pt-2">
          <p className="sw-dark text-[14.5px] leading-[1.6]">
            {post.caption} <span className="sw-green" style={{ fontWeight: 600 }}>#CleanEnergy2026</span>
          </p>
          <div className="sw-muted flex items-center justify-between text-[12.5px] font-medium">
            <span>{post.stats}</span>
            <span>{post.time}</span>
          </div>

          {post.permalink && (
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="sw-navy mt-1 inline-flex w-fit items-center gap-1.5 text-[13.5px] font-semibold"
            >
              View on {platformLabel} <ExternalLinkIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function SocialWall() {
  const [filter, setFilter] = useState<Platform | "all">("all");
  const [loadedAll, setLoadedAll] = useState(false);
  const [activePost, setActivePost] = useState<Post | null>(null);

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

        <div className="columns-1 gap-[18px] sm:columns-2 lg:columns-3">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} onOpen={setActivePost} />
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

      {activePost && <PostModal post={activePost} onClose={() => setActivePost(null)} />}
    </div>
  );
}