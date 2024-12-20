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

const cookieStorage = {
  getItem: (key: string): string | null => {
    if (typeof document !== "undefined") {
      const cookies = parse(document.cookie);
      return cookies[key] || null;
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    if (typeof document !== "undefined") {
      document.cookie = serialize(key, value, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === "production",
      });
    }
  },
  removeItem: (key: string) => {
    if (typeof document !== "undefined") {
      document.cookie = serialize(key, "", {
        path: "/",
        expires: new Date(0),
      });
    }
  },
};

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
      name: "auth",
      storage: createJSONStorage(() => cookieStorage),
    }
  )
);

export default useAuthStore;
