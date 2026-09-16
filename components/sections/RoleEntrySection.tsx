"use client";

import { useState, useRef } from "react";
import {
  Landmark, TrendingUp, Zap, BookOpen, Star, Monitor,
  Globe, Building2, Newspaper, Users,
} from "lucide-react";
import { useRole, type RoleKey } from "@/context/RoleContext";

type Role = {
  key: RoleKey;
  title: string;
  description: string;
  preparing: string;
  icon: any;
};

const roles: Role[] = [
  {
    key: "government-policymakers",
    title: "Government & Policymakers",
    description: "Policy engagement and strategic collaboration.",
    preparing: "We're preparing the policy briefs, strategic sessions, and bilateral engagement opportunities relevant to your office.",
    icon: Landmark,
  },
  {
    key: "investors-financial",
    title: "Investors & Financial Institutions",
    description: "Discover projects and investment opportunities.",
    preparing: "We're curating the project pipeline, deal flow sessions, and founder introductions most aligned with your portfolio.",
    icon: TrendingUp,
  },
  {
    key: "energy-companies-utilities",
    title: "Energy Companies & Utilities",
    description: "Explore partnerships, visibility, and industry positioning.",
    preparing: "We're assembling the sponsorship packages, brand visibility options, and partnership opportunities tailored for your sector.",
    icon: Zap,
  },
  {
    key: "researchers-academia",
    title: "Researchers & Academia",
    description: "Present findings and engage with applied energy research.",
    preparing: "We're pulling together your speaker portal, submission guidelines, and research showcase opportunities.",
    icon: BookOpen,
  },
  {
    key: "startups-entrepreneurs",
    title: "Startups & Entrepreneurs",
    description: "Pitch, connect, and grow in the clean energy ecosystem.",
    preparing: "We're preparing the startup showcase, pitch opportunities, and investor matchmaking tools for you.",
    icon: Star,
  },
  {
    key: "technology-solution-providers",
    title: "Technology & Solution Providers",
    description: "Showcase solutions and meet potential buyers.",
    preparing: "We're preparing your exhibitor guide, booth options, and lead generation tools to help you make the most of the floor.",
    icon: Monitor,
  },
  {
    key: "development-partners-ngos",
    title: "Development Partners & NGOs",
    description: "Engage on sustainable development and energy access.",
    preparing: "We're curating the development finance sessions, partnership roundtables, and impact-focused networking for you.",
    icon: Globe,
  },
  {
    key: "industry-associations-chambers",
    title: "Industry Associations & Chambers",
    description: "Represent your sector and shape industry dialogue.",
    preparing: "We're preparing the industry roundtables, sector sessions, and association visibility opportunities for you.",
    icon: Building2,
  },
  {
    key: "media-communications",
    title: "Media & Communications",
    description: "Press access, interviews, and media accreditation.",
    preparing: "We're getting your press pass information, interview scheduling, and media kit ready for accreditation.",
    icon: Newspaper,
  },
  {
    key: "students-young-professionals",
    title: "Students & Young Professionals",
    description: "Learn, network, and launch your clean energy career.",
    preparing: "We're curating the mentorship sessions, career fair opportunities, and networking highlights most relevant to you.",
    icon: Users,
  },
];

type Phase = "idle" | "glowing" | "centering" | "fading-grid" | "preparing";

export function RoleEntrySection({
  onRoleSelect,
}: {
  onRoleSelect?: (role: RoleKey) => void;
}) {
  const { role: savedRole, loading, setRole, clearRole } = useRole();

  const [selected, setSelected] = useState<RoleKey | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [flyStyle, setFlyStyle] = useState<React.CSSProperties>({});
  const [isSwitching, setIsSwitching] = useState(false);

  const cardRefs = useRef<Partial<Record<RoleKey, HTMLButtonElement>>>({});
  const gridRef = useRef<HTMLDivElement>(null);

  const handleSelect = (role: Role) => {
    if (phase !== "idle") return;

    const card = cardRefs.current[role.key];
    const grid = gridRef.current;
    if (!card || !grid) return;

    const cardRect = card.getBoundingClientRect();
    const gridRect = grid.getBoundingClientRect();

    const dx = (gridRect.left + gridRect.width / 2) - (cardRect.left + cardRect.width / 2);
    const dy = (gridRect.top + gridRect.height / 2) - (cardRect.top + cardRect.height / 2);

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

    setTimeout(() => setPhase("fading-grid"), 700);

    setTimeout(() => {
      setPhase("preparing");
      setFlyStyle({});
      setIsSwitching(false);
      setRole(role.key);
      onRoleSelect?.(role.key);
    }, 1000);
  };

  const reset = () => {
    setPhase("idle");
    setSelected(null);
    setFlyStyle({});
    setIsSwitching(false);
  };

  const selectedRole = roles.find((r) => r.key === selected);

  // Loading state — prevent flash of picker
  if (loading) {
    return (
      <section className="w-full pt-8 pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex justify-center py-12">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span className="block w-1.5 h-1.5 rounded-full bg-[#009966]" style={{ animation: "bounce 1s ease-in-out infinite" }} />
            <span className="block w-1.5 h-1.5 rounded-full bg-[#009966]" style={{ animation: "bounce 1s ease-in-out 0.15s infinite" }} />
            <span className="block w-1.5 h-1.5 rounded-full bg-[#009966]" style={{ animation: "bounce 1s ease-in-out 0.3s infinite" }} />
          </div>
        </div>
        <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }`}</style>
      </section>
    );
  }

  // Returning visitor
  if (savedRole && !isSwitching && phase === "idle") {
    const currentRole = roles.find((r) => r.key === savedRole);
    if (!currentRole) return null;
    const Icon = currentRole.icon;

    return (
      <section className="w-full pt-8 pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center text-center pt-4 pb-12 gap-6" style={{ animation: "fadeInUp 350ms ease forwards" }}>
            <div className="w-20 h-20 rounded-full bg-[#009966]/10 border border-[#009966]/30 flex items-center justify-center">
              <Icon className="w-10 h-10 text-[#009966]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#009966] uppercase tracking-widest mb-2">Welcome back</p>
              <h2 className="text-4xl font-bold text-[#02026e] tracking-tight">{currentRole.title}</h2>
            </div>
            <p className="text-zinc-500 text-base max-w-md leading-relaxed">{currentRole.preparing}</p>
            <button
              onClick={() => setIsSwitching(true)}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-[#02026e] bg-white hover:border-[#02026e]/40 hover:shadow-sm transition-all duration-150"
            >
              ← Choose a different role
            </button>
          </div>
        </div>
        <style>{`
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </section>
    );
  }

  // Picker (first visit or switching)
  const showGrid = phase !== "preparing";
  const gridFading = phase === "fading-grid";

  return (
    <section className="w-full pt-8 pb-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 relative">

        <div className="text-center mb-6 transition-opacity duration-200" style={{ opacity: phase === "idle" ? 1 : 0 }}>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#02026e]">
            {isSwitching ? "Choose a new role" : "I am…"}
          </h2>
          <p className="text-xl font-bold text-black mt-2">Different visitors have different goals. Choose your path.</p>
        </div>

        {showGrid && (
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 transition-opacity duration-300"
            style={{ opacity: gridFading ? 0 : 1 }}
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
                  onClick={() => handleSelect(role)}
                  style={isFlying ? flyStyle : undefined}
                  className={[
                    "text-left p-5 rounded-xl border",
                    isFlying ? "" : "transition-all duration-300",
                    isSelected
                      ? "border-[#009966] bg-[#009966]/5 scale-[1.08] shadow-[0_0_0_4px_rgba(0,153,102,0.15)]"
                      : "border-[#02026e]/10 bg-white hover:border-[#02026e]/40 hover:-translate-y-1 hover:shadow-[0_0_40px_12px_rgba(2,2,110,0.18),0_0_80px_24px_rgba(2,2,110,0.10)]",
                    isFading ? "opacity-0 scale-[0.97]" : "opacity-100",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`w-7 h-7 ${isSelected ? "text-[#009966]" : "text-[#02026e]"}`} />
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">{role.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-500">{role.description}</p>
                </button>
              );
            })}
          </div>
        )}

        {isSwitching && phase === "idle" && (
          <div className="mt-6 flex justify-center">
            <button onClick={reset} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-zinc-500 bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-150">
              ← Keep my current role
            </button>
          </div>
        )}

        {phase === "preparing" && selectedRole && (
          <div className="flex flex-col items-center text-center pt-4 pb-12 gap-6" style={{ animation: "fadeInUp 350ms ease forwards" }}>
            <div className="w-20 h-20 rounded-full bg-[#009966]/10 border border-[#009966]/30 flex items-center justify-center">
              <selectedRole.icon className="w-10 h-10 text-[#009966]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#009966] uppercase tracking-widest mb-2">You are a</p>
              <h2 className="text-4xl font-bold text-[#02026e] tracking-tight">{selectedRole.title}</h2>
            </div>
            <p className="text-zinc-500 text-base max-w-md leading-relaxed">{selectedRole.preparing}</p>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#009966]" style={{ animation: "bounce 1s ease-in-out infinite" }} />
              <span className="block w-1.5 h-1.5 rounded-full bg-[#009966]" style={{ animation: "bounce 1s ease-in-out 0.15s infinite" }} />
              <span className="block w-1.5 h-1.5 rounded-full bg-[#009966]" style={{ animation: "bounce 1s ease-in-out 0.3s infinite" }} />
              <span className="ml-1">Preparing your experience</span>
            </div>
            <button onClick={reset} className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-[#02026e] bg-white hover:border-[#02026e]/40 hover:shadow-sm transition-all duration-150">
              ← Choose a different role
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      `}</style>
    </section>
  );
}