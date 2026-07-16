"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Landmark, TrendingUp, Zap, BookOpen, Star, Monitor,
  Globe, Building2, Newspaper, Users, ArrowRight, X,
} from "lucide-react";
import { useRole, type RoleKey } from "@/context/RoleContext";

// Inline scroll hook — removes dependency on use-hide-on-scroll entirely
function useHeaderVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      setVisible(window.scrollY < last || window.scrollY < 80);
      last = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return visible;
}

type RoleConfig = { key: RoleKey; title: string; preparing: string; icon: any };

const roles: RoleConfig[] = [
  { key: "government-policymakers",        title: "Government & Policymakers",           preparing: "We're preparing policy briefs, strategic sessions, and bilateral engagement opportunities for your office.",        icon: Landmark  },
  { key: "investors-financial",            title: "Investors & Financial Institutions",   preparing: "We're curating the project pipeline, deal flow sessions, and founder introductions for your portfolio.",          icon: TrendingUp },
  { key: "energy-companies-utilities",     title: "Energy Companies & Utilities",         preparing: "We're assembling sponsorship packages, brand visibility options, and partnership opportunities for your sector.",  icon: Zap       },
  { key: "researchers-academia",           title: "Researchers & Academia",               preparing: "We're pulling together your speaker portal, submission guidelines, and research showcase opportunities.",          icon: BookOpen  },
  { key: "startups-entrepreneurs",         title: "Startups & Entrepreneurs",             preparing: "We're preparing the startup showcase, pitch opportunities, and investor matchmaking tools for you.",               icon: Star      },
  { key: "technology-solution-providers",  title: "Technology & Solution Providers",      preparing: "We're preparing your exhibitor guide, booth options, and lead generation tools.",                                 icon: Monitor   },
  { key: "development-partners-ngos",      title: "Development Partners & NGOs",          preparing: "We're curating development finance sessions, partnership roundtables, and impact-focused networking.",             icon: Globe     },
  { key: "industry-associations-chambers", title: "Industry Associations & Chambers",     preparing: "We're preparing industry roundtables, sector sessions, and association visibility opportunities.",                icon: Building2 },
  { key: "media-communications",           title: "Media & Communications",               preparing: "We're getting your press pass, interview scheduling, and media kit ready for accreditation.",                     icon: Newspaper },
  { key: "students-young-professionals",   title: "Students & Young Professionals",       preparing: "We're curating mentorship sessions, career fair opportunities, and networking highlights for you.",                icon: Users     },
];

// Timer-based entrance (non-homepage pages)
const ENTRANCE_DELAY_MS = 10000;
// How often the picker re-surfaces on non-homepage pages if the user
// dismissed it and still hasn't picked a role
const REPEAT_INTERVAL_MS = 30000;
const COLLAPSE_DELAY_MS = 2800;

// On the homepage, once the sentinel scrolls into view, we wait this long
// (while it stays in view) before revealing the picker.
const HOMEPAGE_SECTION_DWELL_MS = 5000;

// Id of a thin (e.g. 1px) sentinel element the homepage places at the TOP
// of the Conference Overview section — NOT a wrapper around the whole
// section. RoleSubNav watches this sentinel and reveals itself once it's
// been in view for HOMEPAGE_SECTION_DWELL_MS. Using a thin sentinel (rather
// than measuring visibility of the full section) means this works no matter
// how tall the section is.
export const ROLE_NAV_TRIGGER_ID = "role-nav-trigger";

export function RoleSubNav({
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
  const headerVisible = useHeaderVisible();
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const [entered, setEntered] = useState(false);
  const [selected, setSelected] = useState<RoleKey | null>(null);
  const [preparing, setPreparing] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // --- Entrance trigger ---
  // Homepage: reveal 5s after the Conference Overview section scrolls into
  // view (the 5s timer cancels/resets if the user scrolls away before it fires).
  // Everywhere else: reveal after a fixed delay, same as before.
  useEffect(() => {
    if (loading) return;

    if (isHomepage) {
      // Retry a few times in case the sentinel isn't in the DOM yet on the
      // very first paint (e.g. it's inside something that mounts async).
      let attempts = 0;
      let cancelled = false;
      let dwellTimer: ReturnType<typeof setTimeout> | null = null;
      let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
      let observer: IntersectionObserver | null = null;

      const setup = () => {
        if (cancelled) return;
        const target = document.getElementById(ROLE_NAV_TRIGGER_ID);

        if (!target) {
          attempts += 1;
          if (attempts < 20) {
            // try again shortly — DOM may not have the sentinel yet
            fallbackTimer = setTimeout(setup, 250);
          } else {
            // Give up waiting for the sentinel; fall back to a fixed delay
            // so the nav still shows up eventually.
            fallbackTimer = setTimeout(() => setEntered(true), ENTRANCE_DELAY_MS);
          }
          return;
        }

        // IMPORTANT: `target` should be a thin sentinel (e.g. a 1px div) placed
        // at the top of the Conference Overview section — not a wrapper around
        // the whole section. Wrapping the whole section and requiring a visible
        // percentage (the old `threshold: 0.3` approach) never fires for tall
        // sections, since the visible ratio of a tall element rarely reaches 30%.
        observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              // Start (or restart) the 5s dwell countdown once the sentinel is in view
              dwellTimer = setTimeout(() => {
                setEntered(true);
                observer?.disconnect();
              }, HOMEPAGE_SECTION_DWELL_MS);
            } else if (dwellTimer) {
              // User scrolled away before the dwell time elapsed — cancel it
              clearTimeout(dwellTimer);
              dwellTimer = null;
            }
          },
          { threshold: 0 }
        );

        observer.observe(target);
      };

      setup();

      return () => {
        cancelled = true;
        observer?.disconnect();
        if (dwellTimer) clearTimeout(dwellTimer);
        if (fallbackTimer) clearTimeout(fallbackTimer);
      };
    }

    const t = setTimeout(() => setEntered(true), ENTRANCE_DELAY_MS);
    return () => clearTimeout(t);
  }, [loading, isHomepage]);

  // --- Regular re-surfacing on non-homepage pages ---
  // If the user dismissed the prompt and still hasn't picked a role,
  // bring the full picker back periodically instead of leaving it hidden.
  useEffect(() => {
    if (isHomepage) return;
    if (!entered) return;
    if (savedRole) return;
    if (!dismissed) return;

    const t = setInterval(() => {
      setDismissed(false);
    }, REPEAT_INTERVAL_MS);

    return () => clearInterval(t);
  }, [isHomepage, entered, savedRole, dismissed]);

  const handleSelect = (key: RoleKey) => {
    setSelected(key);
    setPreparing(true);
    setRole(key);
    setTimeout(() => {
      setPreparing(false);
      setCollapsed(true);
      setIsSwitching(false);
    }, COLLAPSE_DELAY_MS);
  };

  if (loading || !entered) return null;

  const ctaButtons = (compact = false) => (
    <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 shrink-0 w-full md:w-auto">
      <a href={viewProgrammeHref} className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold whitespace-nowrap text-[#02026e] bg-white border border-[#02026e]/20 shadow-[0_10px_30px_rgba(2,2,110,0.12)] transition-all duration-300 hover:border-[#02026e]/40 hover:shadow-[0_14px_45px_rgba(2,2,110,0.18)] hover:scale-[1.04] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#02026e]/40 focus:ring-offset-2 ${compact ? "px-3.5 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm" : "px-4 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base"}`}>
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute -left-[120%] top-0 h-full w-[60%] rotate-12 bg-[#02026e]/10 blur-md transition-all duration-700 group-hover:left-[120%]" />
        </span>
        <span className="relative z-10">View Programme</span>
      </a>
      <a href={getTicketsHref} target="_blank" rel="noopener noreferrer" className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold text-white whitespace-nowrap bg-gradient-to-r from-[#02026e] via-[#1140c4] to-[#02026e] bg-[length:200%_100%] bg-left border border-white/40 shadow-[0_12px_35px_rgba(2,2,110,0.35)] transition-all duration-500 ease-out hover:bg-right hover:shadow-[0_18px_60px_rgba(17,64,196,0.45)] hover:scale-[1.05] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-[#1140c4]/60 focus:ring-offset-2 ${compact ? "px-3.5 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm" : "px-4 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base"}`}>
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute -left-[120%] top-0 h-full w-[60%] rotate-12 bg-white/20 blur-md transition-all duration-700 group-hover:left-[120%]" />
        </span>
        <span className="relative z-10">Get Tickets</span>
        <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
      <a href={becomeSponsorHref} className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold text-[#1f1f1f] whitespace-nowrap bg-gradient-to-r from-[#d4af00] via-[#fad202] to-[#d4af00] bg-[length:200%_100%] bg-left shadow-[0_12px_35px_rgba(250,210,2,0.30)] transition-all duration-500 ease-out hover:bg-right hover:shadow-[0_18px_60px_rgba(250,210,2,0.42)] hover:scale-[1.05] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-[#fad202]/50 focus:ring-offset-2 ${compact ? "px-3.5 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm" : "px-4 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base"}`}>
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute -left-[120%] top-0 h-full w-[60%] rotate-12 bg-white/25 blur-md transition-all duration-700 group-hover:left-[120%]" />
        </span>
        <span className="relative z-10">Become a Sponsor</span>
        <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </div>
  );

  const shell = (children: React.ReactNode, compact = false) => (
    <div className={`fixed left-0 right-0 z-40 border-b border-white/10 bg-[#0F0F75]/95 backdrop-blur-md shadow-[0_10px_30px_rgba(15,15,117,0.35)] transition-all duration-300 ${headerVisible ? "top-24" : "top-0"}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-6 ${compact ? "py-3 min-h-[56px]" : "pt-8 pb-6 md:pt-10 md:pb-8 min-h-[128px]"}`}>
          <div className="flex-1 min-w-0">{children}</div>
          {ctaButtons(compact)}
        </div>
      </div>
      <style>{`
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
      `}</style>
    </div>
  );

  // Returning visitor or just collapsed after picking
  if ((savedRole && !isSwitching && collapsed) || (savedRole && !isSwitching && !preparing)) {
    const current = roles.find(r => r.key === savedRole);
    if (!current) {
      // Saved role is from old schema — clear localStorage and show picker
      try { localStorage.removeItem("visitor_role"); } catch {}
      return null;
    }
    return shell(
      <div className="flex items-center justify-center gap-3 w-full">
        <current.icon className="h-6 w-6 text-[#009966]" strokeWidth={1.75} />
        <span className="text-sm font-semibold text-white/80 hidden sm:block">{current.title}</span>
        <button onClick={() => { setIsSwitching(true); setCollapsed(false); setSelected(null); }}
          className="text-xs font-semibold text-white/60 hover:text-white transition-colors whitespace-nowrap">
          Switch role
        </button>
      </div>,
      true
    );
  }

  // Preparing
  if (preparing && selected) {
    const current = roles.find(r => r.key === selected);
    return shell(
      <div className="flex items-center gap-4 w-full">
        {current && <current.icon className="h-8 w-8 sm:h-12 sm:w-12 shrink-0 text-[#009966]" strokeWidth={1.5} />}
        <p className="text-lg sm:text-2xl font-bold text-white">{current?.title}</p>
        <span className="flex items-center gap-1.5">
          {[0, 0.15, 0.3].map((delay, i) => (
            <span key={i} className="block w-2.5 h-2.5 rounded-full bg-[#009966]" style={{ animation: `bounce 1s ease-in-out ${delay}s infinite` }} />
          ))}
        </span>
      </div>
    );
  }

  // Dismissed
  if (dismissed && !savedRole && !isSwitching) {
    return shell(
      <div className="flex items-center justify-center w-full">
        <button onClick={() => setDismissed(false)} className="text-sm font-semibold text-white/60 hover:text-white transition-colors underline underline-offset-4">
          Who will you be attending as?
        </button>
      </div>
    );
  }

  // Full picker
  return shell(
    <div className="relative flex flex-col items-center gap-3 w-full">
      <button
        type="button"
        onClick={() => isSwitching ? setIsSwitching(false) : setDismissed(true)}
        className="absolute -top-1 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

      <h2 className="w-full text-center text-xl sm:text-3xl font-extrabold text-white tracking-tight px-10">
        Who will you be attending as?
      </h2>

     <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 w-full max-w-5xl mx-auto">
  {roles.map((role) => (
    <button
      key={role.key}
      type="button"
      onClick={() => handleSelect(role.key)}
      className={`group flex items-center gap-2.5 rounded-full pl-3 pr-5 py-2.5 sm:pl-4 sm:pr-6 sm:py-3 text-sm sm:text-base font-semibold whitespace-nowrap transition-all duration-200 ${
        selected === role.key
          ? "bg-[#009966]/20 text-white border border-white scale-[1.05]"
          : "bg-white/5 text-white/75 border border-transparent hover:text-white hover:bg-white/10 hover:border-white hover:scale-[1.05]"
      }`}
    >
      <role.icon className={`h-6 w-6 sm:h-7 sm:w-7 shrink-0 transition-all duration-200 group-hover:scale-110 ${selected === role.key ? "text-[#009966]" : "text-white/80 group-hover:text-white"}`} strokeWidth={1.75} />
      {role.title}
    </button>
  ))}
</div>

      {isSwitching && (
        <button onClick={() => setIsSwitching(false)} className="text-sm text-white/55 hover:text-white transition-colors">
          Keep current role
        </button>
      )}
    </div>
  );
}