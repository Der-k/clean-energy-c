"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type RoleKey =
  | "government-policymakers"
  | "investors-financial"
  | "energy-companies-utilities"
  | "researchers-academia"
  | "startups-entrepreneurs"
  | "technology-solution-providers"
  | "development-partners-ngos"
  | "industry-associations-chambers"
  | "media-communications"
  | "students-young-professionals";

type RoleContextValue = {
  role: RoleKey | null;
  visitorUuid: string | null;
  setRole: (role: RoleKey) => Promise<void>;
  clearRole: () => void;
  loading: boolean;
};

const RoleContext = createContext<RoleContextValue | null>(null);

const STORAGE_ROLE_KEY = "visitor_role";

// Migration map: old role keys → nearest new equivalent
// Anyone with a stale role in localStorage gets silently upgraded.
const ROLE_MIGRATION: Record<string, RoleKey> = {
  "delegate":   "students-young-professionals",
  "speaker":    "researchers-academia",
  "sponsor":    "energy-companies-utilities",
  "exhibitor":  "technology-solution-providers",
  "media":      "media-communications",
  "government": "government-policymakers",
  "investor":   "investors-financial",
};

function migrateRole(raw: string | null): RoleKey | null {
  if (!raw) return null;
  // Already a valid new key
  const validRoles: RoleKey[] = [
    "government-policymakers", "investors-financial", "energy-companies-utilities",
    "researchers-academia", "startups-entrepreneurs", "technology-solution-providers",
    "development-partners-ngos", "industry-associations-chambers",
    "media-communications", "students-young-professionals",
  ];
  if (validRoles.includes(raw as RoleKey)) return raw as RoleKey;
  // Map old key to new one
  return ROLE_MIGRATION[raw] ?? null;
}
const STORAGE_UUID_KEY = "visitor_uuid";

function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getOrCreateUUID(): string {
  let uuid = localStorage.getItem(STORAGE_UUID_KEY);
  if (!uuid) {
    uuid = generateUUID();
    localStorage.setItem(STORAGE_UUID_KEY, uuid);
  }
  return uuid;
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<RoleKey | null>(null);
  const [visitorUuid, setVisitorUuid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const uuid = getOrCreateUUID();
      setVisitorUuid(uuid);
      const raw = localStorage.getItem(STORAGE_ROLE_KEY);
      const savedRole = migrateRole(raw);
      if (savedRole) {
        setRoleState(savedRole);
        // Write migrated key back so localStorage stays clean
        if (raw !== savedRole) localStorage.setItem(STORAGE_ROLE_KEY, savedRole);
      } else if (raw) {
        // Unrecognised key with no migration — clear it
        localStorage.removeItem(STORAGE_ROLE_KEY);
      }
    } catch {
      // localStorage unavailable
    } finally {
      setLoading(false);
    }
  }, []);

  const setRole = useCallback(
    async (newRole: RoleKey) => {
      setRoleState(newRole);
      try {
        localStorage.setItem(STORAGE_ROLE_KEY, newRole);
      } catch {
        // ignore
      }

      let uuid = visitorUuid;
      if (!uuid) {
        try {
          uuid = getOrCreateUUID();
          setVisitorUuid(uuid);
        } catch {
          return;
        }
      }

      try {
        fetch("/api/visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorUuid: uuid, role: newRole }),
        }).catch(() => {});
      } catch {
        // ignore
      }
    },
    [visitorUuid]
  );

  const clearRole = useCallback(() => {
    setRoleState(null);
    try {
      localStorage.removeItem(STORAGE_ROLE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <RoleContext.Provider value={{ role, visitorUuid, setRole, clearRole, loading }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole() must be used inside <RoleProvider>");
  return ctx;
}