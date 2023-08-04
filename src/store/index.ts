import { MatchType } from "@/types/match";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  matches: Array<MatchType>;
  currentPage: number;
  totalItems: number;
  isLoading: boolean;
}

type StoreActions = {
  setCurrentPage: (page: number) => void;
  setTotalItems: (count: number) => void;
  setMatches: (matches: MatchType[]) => void;
  fetchNextPage: () => void;
  revalidate: () => void;
};

const useStore = create<StoreState & StoreActions>()(
  persist(
    (set, get) => ({
      matches: [],
      currentPage: 0,
      totalItems: 0,
      isLoading: false,

      setCurrentPage: (page: number) => {
        set(() => ({
          currentPage: page,
        }));
      },
      setTotalItems: (count: number) => {
        set(() => ({
          totalItems: count,
        }));
      },
      setMatches: (matches: MatchType[]) => {
        set(() => ({
          matches: matches,
        }));
      },
      fetchNextPage: async () => {
        set(() => ({
          isLoading: true,
        }));
        const page = get().currentPage;
        const response = await fetch(
          `http://localhost:3000/api/matches?page=${page + 1}`
        );
        const { data: newData } = await response.json();
        set((state) => ({
          matches: [...state.matches, ...JSON.parse(newData)],
          currentPage: state.currentPage + 1,
          isLoading: false,
        }));
      },
      revalidate: () => {
        set({ matches: [], currentPage: 0, totalItems: 0 });
      },
    }),
    {
      name: "store",
      getStorage: () => localStorage,
    }
  )
);

export default useStore;
