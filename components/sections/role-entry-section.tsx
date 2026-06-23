"use client";

import { useState, useRef } from "react";
import {
  User, Mic, HandCoins, Store, Newspaper, Landmark, TrendingUp,
} from "lucide-react";

type RoleKey = "delegate" | "speaker" | "sponsor" | "exhibitor" | "media" | "government" | "investor";

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
    title: "Media",
    description: "Press access, interviews, and media accreditation.",
    preparing: "We're getting your press pass information, interview scheduling, and media kit ready for accreditation.",
    icon: Newspaper,
  },
  {
    key: "government",
    title: "Government",
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

type Phase = "idle" | "glowing" | "centering" | "fading-grid" | "preparing";

export function RoleEntrySection({
  onRoleSelect,
}: {
  onRoleSelect?: (role: RoleKey) => void;
}) {
  const [selected, setSelected] = useState<RoleKey | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [flyStyle, setFlyStyle] = useState<React.CSSProperties>({});

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

    setTimeout(() => {
      setPhase("fading-grid");
    }, 700);

    setTimeout(() => {
      setPhase("preparing");
      setFlyStyle({});
      onRoleSelect?.(role.key);
    }, 1000);
  };

  const reset = () => {
    setPhase("idle");
    setSelected(null);
    setFlyStyle({});
  };

  const selectedRole = roles.find((r) => r.key === selected);
  const showGrid = phase !== "preparing";
  const gridFading = phase === "fading-grid";

  return (
    <section className="w-full pt-8 pb-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 relative">

        {/* Header */}
        <div
          className="text-center mb-6 transition-opacity duration-200"
          style={{ opacity: phase === "idle" ? 1 : 0 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">I am…</h2>
          <p className="text-gray-600 mt-2">Different visitors have different goals. Choose your path.</p>
        </div>

        {/* Grid */}
        {showGrid && (
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-opacity duration-300"
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
                      ? "border-orange-500 bg-orange-50 scale-[1.08] shadow-[0_0_0_4px_rgba(249,115,22,0.15)]"
                      : "border-gray-200 bg-white hover:shadow-md hover:-translate-y-0.5",
                    isFading ? "opacity-0 scale-[0.97]" : "opacity-100",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-7 h-7 text-orange-600" />
                    <h3 className="font-semibold text-gray-900">{role.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </button>
              );
            })}
          </div>
        )}

        {/* Preparing screen */}
        {phase === "preparing" && selectedRole && (
          <div
            className="flex flex-col items-center text-center pt-4 pb-12 gap-6"
            style={{ animation: "fadeInUp 350ms ease forwards" }}
          >
            {/* Icon */}
            <div className="w-20 h-20 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center">
              <selectedRole.icon className="w-10 h-10 text-orange-600" />
            </div>

            {/* Role title */}
            <div>
              <p className="text-sm font-medium text-orange-600 uppercase tracking-widest mb-2">
                You are a
              </p>
              <h2 className="text-5xl font-bold text-gray-900 tracking-tight">
                {selectedRole.title}
              </h2>
            </div>

            {/* Role-specific paragraph */}
            <p className="text-gray-500 text-base max-w-md leading-relaxed">
              {selectedRole.preparing}
            </p>

            {/* Animated loader */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span
                className="block w-1.5 h-1.5 rounded-full bg-orange-400"
                style={{ animation: "bounce 1s ease-in-out infinite" }}
              />
              <span
                className="block w-1.5 h-1.5 rounded-full bg-orange-400"
                style={{ animation: "bounce 1s ease-in-out 0.15s infinite" }}
              />
              <span
                className="block w-1.5 h-1.5 rounded-full bg-orange-400"
                style={{ animation: "bounce 1s ease-in-out 0.3s infinite" }}
              />
              <span className="ml-1">Preparing your experience</span>
            </div>

            {/* Back button */}
            <button
              onClick={reset}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 bg-white hover:border-gray-300 hover:text-gray-900 hover:shadow-sm transition-all duration-150"
            >
              ← Choose a different role
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }
      `}</style>
    </section>
  );
}