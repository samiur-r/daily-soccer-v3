import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  count: number;
}

type StoreActions = {
  increment: () => void;
  decrement: () => void;
};

const useStore = create<StoreState & StoreActions>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
    }),
    {
      name: "store",
      getStorage: () => localStorage,
    }
  )
);

export default useStore;
