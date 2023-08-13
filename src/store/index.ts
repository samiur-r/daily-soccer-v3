import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  rightMenuContent: string | undefined;
}

type StoreActions = {
  updateRightMenuContent: (content: string) => void;
};

const useStore = create<StoreState & StoreActions>()(
  persist(
    (set) => ({
      rightMenuContent: undefined,
      updateRightMenuContent: (content) =>
        set(() => ({ rightMenuContent: content })),
    }),
    {
      name: "store",
      getStorage: () => localStorage,
    }
  )
);

export default useStore;
