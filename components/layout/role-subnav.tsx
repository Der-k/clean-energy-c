"use client";

import { useState, useRef, useEffect } from "react";
import {
  User, Mic, HandCoins, Store, Newspaper, Landmark, TrendingUp, ArrowRight,
} from "lucide-react";
import { useRole, type RoleKey } from "@/context/RoleContext";
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";

type Role = {
  key: RoleKey;
  title: string;
  description: string;
  preparing: string;
  icon: any;
};

const roles: Role[] = [
  {
    key: "delegate",
    title: "Delegate",
    description: "Attend sessions, network, and explore the full programme.",
    preparing: "We're curating the sessions, networking opportunities, and programme highlights most relevant to you.",
    icon: User,
  },
  {
    key: "speaker",
    title: "Speaker",
    description: "Apply to speak or join expert panel discussions.",
    preparing: "We're pulling together your speaker portal, submission guidelines, and everything you need to take the stage.",
    icon: Mic,
  },
  {
    key: "sponsor",
    title: "Sponsor",
    description: "Explore branding, visibility, and partnership packages.",
    preparing: "We're assembling our sponsorship packages, brand visibility options, and partnership opportunities tailored for you.",
    icon: HandCoins,
  },
  {
    key: "exhibitor",
    title: "Exhibitor",
    description: "Showcase solutions and meet potential buyers.",
    preparing: "We're preparing your exhibitor guide, booth options, and lead generation tools to help you make the most of the floor.",
    icon: Store,
  },
  {
    key: "media",
    title: "Media Personnel",
    description: "Press access, interviews, and media accreditation.",
    preparing: "We're getting your press pass information, interview scheduling, and media kit ready for accreditation.",
    icon: Newspaper,
  },
  {
    key: "government",
    title: "Government Official",
    description: "Policy engagement and strategic collaboration.",
    preparing: "We're preparing the policy briefs, strategic sessions, and bilateral engagement opportunities relevant to your office.",
    icon: Landmark,
  },
  {
    key: "investor",
    title: "Investor",
    description: "Discover projects and investment opportunities.",
    preparing: "We're curating the project pipeline, deal flow sessions, and founder introductions most aligned with your portfolio.",
    icon: TrendingUp,
  },
];

type Phase = "idle" | "glowing" | "centering" | "fading-grid" | "preparing" | "collapsed";

// A loose, hand-drawn-style squiggle used as an underline accent instead of borders.
function HandDrawnUnderline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      className={className}
      fill="none"
    >
      <path
        d="M1 6.5 C 15 2, 25 8.5, 38 5 C 50 1.5, 62 8, 74 4.5 C 84 1.5, 92 6, 99 3.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// How long to wait before the bar makes its first appearance.
const ENTRANCE_DELAY_MS = 2500;
// How long the "preparing" message stays up before the bar shrinks down.
const COLLAPSE_DELAY_MS = 2800;

export function RoleSubNav({
  onRoleSelect,
  getTicketsHref = "/get-tickets",
  viewProgrammeHref = "/event/programme",
  becomeSponsorHref = "/partners/become-a-partner",
}: {
  onRoleSelect?: (role: RoleKey) => void;
  getTicketsHref?: string;
  viewProgrammeHref?: string;
  becomeSponsorHref?: string;
}) {
  const { role: savedRole, loading, setRole } = useRole();
  const headerVisible = useHideOnScroll();

  // Controls whether the bar has made its delayed entrance yet.
  const [entered, setEntered] = useState(false);

  const [selected, setSelected] = useState<RoleKey | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [flyStyle, setFlyStyle] = useState<React.CSSProperties>({});
  const [isSwitching, setIsSwitching] = useState(false);

  const cardRefs = useRef<Partial<Record<RoleKey, HTMLButtonElement>>>({});
  const rowRef = useRef<HTMLDivElement>(null);

  // Delay the bar's first appearance so it "pops up" rather than
  // being there immediately on load.
  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => setEntered(true), ENTRANCE_DELAY_MS);
    return () => clearTimeout(t);
  }, [loading]);

  const handleSelect = (role: Role) => {
    if (phase !== "idle") return;

    const card = cardRefs.current[role.key];
    const row = rowRef.current;
    if (!card || !row) return;

    const cardRect = card.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();

    const dx = (rowRect.left + rowRect.width / 2) - (cardRect.left + cardRect.width / 2);
    const dy = (rowRect.top + rowRect.height / 2) - (cardRect.top + cardRect.height / 2);

    setSelected(role.key);
    setPhase("glowing");

    setTimeout(() => {
      setPhase("centering");
      setFlyStyle({
        transform: `translate(${dx}px, ${dy}px) scale(1.08)`,
        transition: "transform 420ms cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 20,
        position: "relative",
      });
    }, 280);

    setTimeout(() => {
      setPhase("fading-grid");
    }, 700);

    setTimeout(() => {
      setPhase("preparing");
      setFlyStyle({});
      setIsSwitching(false);

      setRole(role.key);
      onRoleSelect?.(role.key);
    }, 1000);

    setTimeout(() => {
      setPhase("collapsed");
    }, 1000 + COLLAPSE_DELAY_MS);
  };

  const reset = () => {
    setPhase("idle");
    setSelected(null);
    setFlyStyle({});
    setIsSwitching(false);
  };

  const selectedRoleObj = roles.find((r) => r.key === selected);

  if (loading || !entered) return null;

  const barShell = (children: React.ReactNode, compact = false) => (
    <div
      className={[
        "fixed left-0 right-0 z-40",
        "border-b border-white/10",
        "bg-[#0F0F75]/95 backdrop-blur-md",
        "shadow-[0_10px_30px_rgba(15,15,117,0.35)]",
        "transition-all duration-300",
        headerVisible ? "top-24" : "top-0",
      ].join(" ")}
      style={{
        animation: "barEntrance 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div
          className={[
            "flex items-center gap-6 transition-[padding,min-height] duration-300",
            compact ? "pt-4 pb-3 min-h-[56px]" : "pt-10 pb-8 min-h-[128px]",
          ].join(" ")}
        >
          <div className="flex-1 min-w-0">{children}</div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={viewProgrammeHref}
              className={[
                "group relative inline-flex items-center justify-center gap-2",
                "rounded-full font-semibold",
                "text-[#02026e] bg-white",
                "border border-[#02026e]/20",
                "shadow-[0_10px_30px_rgba(2,2,110,0.12)]",
                "transition-all duration-300",
                "hover:bg-white hover:border-[#02026e]/40",
                "hover:shadow-[0_14px_45px_rgba(2,2,110,0.18)]",
                "hover:scale-[1.04] active:scale-[0.98]",
                "focus:outline-none focus:ring-2 focus:ring-[#02026e]/40 focus:ring-offset-2",
                compact ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-base",
              ].join(" ")}
            >
              View Programme
            </a>

            <a
              href={getTicketsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "group relative inline-flex items-center justify-center gap-2",
                "rounded-full font-semibold text-white",
                "bg-gradient-to-r from-[#02026e] via-[#1140c4] to-[#02026e]",
                "bg-[length:200%_100%] bg-left",
                "border border-white/40",
                "shadow-[0_12px_35px_rgba(2,2,110,0.35)]",
                "transition-all duration-500 ease-out",
                "hover:bg-right hover:shadow-[0_18px_60px_rgba(17,64,196,0.45)]",
                "hover:scale-[1.05] active:scale-[0.97]",
                "focus:outline-none focus:ring-2 focus:ring-[#1140c4]/60 focus:ring-offset-2",
                compact ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-base",
              ].join(" ")}
            >
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute -left-[120%] top-0 h-full w-[60%] rotate-12 bg-white/20 blur-md transition-all duration-700 group-hover:left-[120%]" />
              </span>
              <span className="relative z-10">Get Tickets</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href={becomeSponsorHref}
              className={[
                "group relative inline-flex items-center justify-center gap-2",
                "rounded-full font-semibold text-[#1f1f1f]",
                "bg-gradient-to-r from-[#d4af00] via-[#fad202] to-[#d4af00]",
                "bg-[length:200%_100%] bg-left",
                "shadow-[0_12px_35px_rgba(250,210,2,0.30)]",
                "transition-all duration-500 ease-out",
                "hover:bg-right hover:shadow-[0_18px_60px_rgba(250,210,2,0.42)]",
                "hover:scale-[1.05] active:scale-[0.97]",
                "focus:outline-none focus:ring-2 focus:ring-[#fad202]/50 focus:ring-offset-2",
                compact ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-base",
              ].join(" ")}
            >
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute -left-[120%] top-0 h-full w-[60%] rotate-12 bg-white/25 blur-md transition-all duration-700 group-hover:left-[120%]" />
              </span>
              <span className="relative z-10">Become a Sponsor</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }
        @keyframes barEntrance {
          0% {
            opacity: 0;
            transform: translateY(-48px) scale(0.92);
            box-shadow: 0 10px 30px rgba(15,15,117,0.35);
          }
          35% {
            opacity: 1;
          }
          55% {
            transform: translateY(10px) scale(1.012);
            box-shadow: 0 10px 30px rgba(15,15,117,0.35), 0 0 0 10px rgba(0,153,102,0.20);
          }
          75% {
            transform: translateY(-4px) scale(0.998);
            box-shadow: 0 10px 30px rgba(15,15,117,0.35), 0 0 0 4px rgba(0,153,102,0.10);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            box-shadow: 0 10px 30px rgba(15,15,117,0.35), 0 0 0 0 rgba(0,153,102,0);
          }
        }
      `}</style>
    </div>
  );

  // ── Role already saved (just picked, or returning visitor) ───────────
  if (savedRole && !isSwitching && (phase === "collapsed" || phase === "idle")) {
    const currentRole = roles.find((r) => r.key === savedRole);
    if (!currentRole) return null;
    const Icon = currentRole.icon;

    return barShell(
      <div
        className="flex items-center justify-center gap-2.5 w-full"
        style={{ animation: "fadeInUp 300ms ease forwards" }}
      >
        <Icon className="h-6 w-6 text-[#009966]" strokeWidth={1.75} />

        <button
          type="button"
          onClick={() => {
            setIsSwitching(true);
            setPhase("idle");
            setSelected(null);
          }}
          className="text-xs font-semibold text-white/60 hover:text-white transition-colors duration-150 whitespace-nowrap"
        >
          Switch role
        </button>
      </div>,
      true
    );
  }

  // ── Preparing: shown right after a role is picked ─────────────────────
  if (phase === "preparing" && selectedRoleObj) {
    const Icon = selectedRoleObj.icon;

    return barShell(
      <div
        className="flex items-center justify-between gap-4 w-full"
        style={{ animation: "fadeInUp 300ms ease forwards" }}
      >
        <div className="flex items-center gap-5 min-w-0">
          <Icon className="h-12 w-12 shrink-0 text-[#009966]" strokeWidth={1.5} />

          <p className="text-2xl font-bold text-white whitespace-nowrap">
            You are a {selectedRoleObj.title}
          </p>

          <span className="hidden md:block h-8 w-px bg-white/25 shrink-0" />

          <p className="hidden md:block text-lg text-white/70 truncate">
            {selectedRoleObj.preparing}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <span className="flex items-center gap-2">
            <span className="block w-3 h-3 rounded-full bg-[#009966]" style={{ animation: "bounce 1s ease-in-out infinite" }} />
            <span className="block w-3 h-3 rounded-full bg-[#009966]" style={{ animation: "bounce 1s ease-in-out 0.15s infinite" }} />
            <span className="block w-3 h-3 rounded-full bg-[#009966]" style={{ animation: "bounce 1s ease-in-out 0.3s infinite" }} />
          </span>
          <span className="hidden sm:block text-lg text-white/55 whitespace-nowrap">
            Preparing your experience
          </span>

          <button
            type="button"
            onClick={reset}
            className="text-lg font-semibold text-white/60 hover:text-white transition-colors duration-150 whitespace-nowrap"
          >
            Change
          </button>
        </div>
      </div>
    );
  }

  // ── First-time visitor or switching: show all roles at once ──────────
  const showRow = phase !== "preparing";
  const rowFading = phase === "fading-grid";

  return barShell(
    <div className="flex flex-col items-center gap-4 w-full">
      <h2 className="w-full text-center text-3xl md:text-4xl font-extrabold text-white tracking-tight">
        Who will you be attending as?
      </h2>

      {showRow && (
        <div
          ref={rowRef}
          className="flex flex-wrap items-center justify-center gap-3 w-full transition-opacity duration-300"
          style={{ opacity: rowFading ? 0 : 1 }}
        >
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selected === role.key;
            const isFading = selected !== null && !isSelected;
            const isFlying = isSelected && (phase === "centering" || phase === "fading-grid");

            return (
              <button
                key={role.key}
                ref={(el) => { if (el) cardRefs.current[role.key] = el; }}
                type="button"
                onClick={() => handleSelect(role)}
                title={role.description}
                style={isFlying ? flyStyle : undefined}
                className={[
                  "group relative flex items-center gap-2.5 shrink-0",
                  "rounded-full pl-3 pr-5 py-2.5",
                  "text-base font-semibold whitespace-nowrap",
                  isFlying ? "" : "transition-all duration-300",
                  isSelected
                    ? "bg-[#009966]/20 text-white"
                    : "bg-white/5 text-white/75 hover:text-white hover:bg-white/10",
                  isFading ? "opacity-0 scale-95" : "opacity-100",
                ].join(" ")}
              >
                <Icon
                  className={`h-6 w-6 shrink-0 ${isSelected ? "text-[#009966]" : "text-white/80"}`}
                  strokeWidth={1.75}
                />
                {role.title}

                <HandDrawnUnderline
                  className={[
                    "pointer-events-none absolute left-3 right-3 -bottom-1 h-2.5",
                    "transition-opacity duration-300",
                    isSelected
                      ? "opacity-100 text-[#009966]"
                      : "opacity-0 group-hover:opacity-70 text-white",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>
      )}

      {isSwitching && phase === "idle" && (
        <button
          type="button"
          onClick={reset}
          className="text-sm font-medium text-white/55 hover:text-white transition-colors duration-150 whitespace-nowrap"
        >
          Keep current role
        </button>
      )}
    </div>
  );
}