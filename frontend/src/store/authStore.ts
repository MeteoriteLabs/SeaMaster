import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      account: null,
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null, account: null }),
      setAccount: (account) => set({ account }),
    }),
    {
      name: "auth",
    }
  )
);

export default useAuthStore;
