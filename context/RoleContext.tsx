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
  | "delegate"
  | "speaker"
  | "sponsor"
  | "exhibitor"
  | "media"
  | "government"
  | "investor";

type RoleContextValue = {
  /** Current role, or null if not yet chosen */
  role: RoleKey | null;
  /** Stable UUID for this browser/device — persists across sessions */
  visitorUuid: string | null;
  /** Call this when the user picks or changes a role */
  setRole: (role: RoleKey) => Promise<void>;
  /** Call this to clear the role (e.g. reset button) */
  clearRole: () => void;
  /** True while the initial localStorage read is happening */
  loading: boolean;
};

const RoleContext = createContext<RoleContextValue | null>(null);

const STORAGE_ROLE_KEY = "visitor_role";
const STORAGE_UUID_KEY = "visitor_uuid";

/** Generates a v4-style UUID using the Web Crypto API */
function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Gets or creates the visitor UUID from localStorage */
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

  // On mount: read persisted role + UUID from localStorage
  useEffect(() => {
    try {
      const uuid = getOrCreateUUID();
      setVisitorUuid(uuid);

      const savedRole = localStorage.getItem(STORAGE_ROLE_KEY) as RoleKey | null;
      if (savedRole) setRoleState(savedRole);
    } catch {
      // localStorage may be unavailable (private browsing edge cases)
    } finally {
      setLoading(false);
    }
  }, []);

  const setRole = useCallback(
    async (newRole: RoleKey) => {
      // 1. Update local state immediately (instant UI response)
      setRoleState(newRole);

      // 2. Persist to localStorage
      try {
        localStorage.setItem(STORAGE_ROLE_KEY, newRole);
      } catch {
        // ignore localStorage errors
      }

      // 3. Ensure we have a UUID
      let uuid = visitorUuid;
      if (!uuid) {
        try {
          uuid = getOrCreateUUID();
          setVisitorUuid(uuid);
        } catch {
          return; // Can't save without a UUID
        }
      }

      // 4. Fire-and-forget POST to /api/visitor — saves to DB silently.
      //    We don't await this or show errors to the user; it's analytics.
      try {
        fetch("/api/visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorUuid: uuid, role: newRole }),
        }).catch(() => {
          // Silently ignore network errors — role is already saved locally
        });
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

/** Use this hook in any component to read or set the visitor's role */
export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error("useRole() must be used inside <RoleProvider>");
  }
  return ctx;
}