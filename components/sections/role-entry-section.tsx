"use client";

import { useState } from "react";
import { useRole } from "@/context/role-context";
import {
  User,
  Mic,
  HandCoins,
  Store,
  Newspaper,
  Landmark,
  TrendingUp,
} from "lucide-react";

type RoleKey =
  | "delegate"
  | "speaker"
  | "sponsor"
  | "exhibitor"
  | "media"
  | "government"
  | "investor";

type Role = {
  key: RoleKey;
  title: string;
  description: string;
  href: string;
  icon: any;
};



const roles: Role[] = [
  {
    key: "delegate",
    title: "Delegate",
    description: "Attend sessions, network, and explore the full programme.",
    href: "/delegate",
    icon: User,
  },
  {
    key: "speaker",
    title: "Speaker",
    description: "Apply to speak or join expert panel discussions.",
    href: "/speaker",
    icon: Mic,
  },
  {
    key: "sponsor",
    title: "Sponsor",
    description: "Explore branding, visibility, and partnership packages.",
    href: "/sponsor",
    icon: HandCoins,
  },
  {
    key: "exhibitor",
    title: "Exhibitor",
    description: "Showcase solutions and meet potential buyers.",
    href: "/exhibitor",
    icon: Store,
  },
  {
    key: "media",
    title: "Media",
    description: "Press access, interviews, and media accreditation.",
    href: "/media",
    icon: Newspaper,
  },
  {
    key: "government",
    title: "Government",
    description: "Policy engagement and strategic collaboration.",
    href: "/government",
    icon: Landmark,
  },
  {
    key: "investor",
    title: "Investor",
    description: "Discover projects and investment opportunities.",
    href: "/investor",
    icon: TrendingUp,
  },
];

export function RoleEntrySection({
  onRoleSelect,
}: {
  onRoleSelect?: (role: RoleKey) => void;
}) {
  const [selected, setSelected] = useState<RoleKey | null>(null);

  const { setRole } = useRole();

  const handleSelect = (role: Role) => {
    setSelected(role.key);

    // Save globally
    setRole(role.key);

    // Optional callback
    onRoleSelect?.(role.key);

    

  };


  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            I am...
          </h2>
          <p className="text-gray-600 mt-2">
            Different visitors have different goals. Choose your path.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive = selected === role.key;

            return (
              <button
                key={role.key}
                onClick={() => handleSelect(role)}
                className={`
                  text-left p-5 rounded-xl border transition-all duration-200
                  hover:shadow-md hover:-translate-y-0.5
                  ${
                    isActive
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 bg-white"
                  }
                `}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-gray-900">
                    {role.title}
                  </h3>
                </div>

                <p className="text-sm text-gray-600">
                  {role.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}