import { DataType } from "@/types/data";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  data: Array<DataType>;
  currentPage: number;
}

type StoreActions = {
  setCurrentPage: (page: number) => void;
  setData: (data: DataType[]) => void;
  fetchNextPage: () => void;
  revalidate: () => void;
};

const useStore = create<StoreState & StoreActions>()(
  persist(
    (set, get) => ({
      data: [],
      currentPage: 0,

      setCurrentPage: (page: number) => {
        set(() => ({
          currentPage: page,
        }));
      },
      setData: (data: DataType[]) => {
        set(() => ({
          data: data,
        }));
      },
      fetchNextPage: async () => {
        const page = get().currentPage;
        const response = await fetch(
          `http://localhost:3000/api/data?page=${page + 1}`
        );
        const { data: newData } = await response.json();
        set((state) => ({
          data: [...state.data, ...newData],
          currentPage: state.currentPage + 1,
        }));
      },

      revalidate: async () => {
        const response = await fetch("http://localhost:3000/api/data?page=1");
        const { data } = await response.json();
        set({ data, currentPage: 1 });
      },
    }),
    {
      name: "store",
      getStorage: () => localStorage,
    }
  )
);

export default useStore;
