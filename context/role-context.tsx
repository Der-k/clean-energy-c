"use client";

import { createContext, useContext, useState } from "react";

export type RoleKey =
  | "delegate"
  | "speaker"
  | "sponsor"
  | "exhibitor"
  | "media"
  | "government"
  | "investor";

const RoleContext = createContext<{
  role: RoleKey | null;
  setRole: (role: RoleKey) => void;
} | null>(null);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<RoleKey | null>(null);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used inside RoleProvider");
  return ctx;
}