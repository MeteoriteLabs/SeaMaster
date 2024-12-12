import { create } from "zustand";

type LoadingState = {
  loading: boolean;
  setLoading: (state: boolean) => void;
};

const useLoadingStore = create<LoadingState>((set) => ({
  loading: false,
  setLoading: (state) => set({ loading: state }),
}));

export default useLoadingStore;
