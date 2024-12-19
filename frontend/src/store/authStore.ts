import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { parse, serialize } from "cookie";

interface AuthState {
  token: string | null;
  user: {
    id: string;
    username: string;
    email: string;
    documentId: string;
  } | null;
  account: {
    id: string;
  } | null;
  role: string | null;
  setAuth: (
    token: string,
    user: {
      id: string;
      username: string;
      email: string;
      documentId: string;
    }
  ) => void;
  setAccount: (account: { id: string }) => void;
  setRole: (role: string) => void;
  clearAuth: () => void;
}

// Custom storage that uses both cookies and localStorage
const cookieAndLocalStorage = {
  getItem: (key: string): string | null => {
    // Check cookies first
    if (typeof document !== "undefined") {
      const cookies = parse(document.cookie);
      if (cookies[key]) return cookies[key];
    }
    // Fallback to localStorage
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    // Set in cookies
    if (typeof document !== "undefined") {
      document.cookie = serialize(key, value, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        secure: process.env.NODE_ENV === "production", // Secure cookies in production
      });
    }
    // Set in localStorage
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string) => {
    // Remove from cookies
    if (typeof document !== "undefined") {
      document.cookie = serialize(key, "", {
        path: "/",
        expires: new Date(0),
      });
    }
    // Remove from localStorage
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(key);
    }
  },
};

// Zustand store with combined storage
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      account: null,
      role: null,
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () =>
        set({ token: null, user: null, account: null, role: null }),
      setAccount: (account) => set({ account }),
      setRole: (role) => set({ role }),
    }),
    {
      name: "auth", // Key for storage
      storage: createJSONStorage(() => cookieAndLocalStorage),
    }
  )
);

export default useAuthStore;
