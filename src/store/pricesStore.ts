import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type PricesStore = {
  selectedGroup: number | null;
  setSelectedGroup: (id: number) => void;
  selectedPath: string;
  setSelectedPath: (path: string) => void;
};

export const usePricesStore = create<PricesStore>()(
  persist(
    immer((set) => ({
      selectedGroup: null,
      setSelectedGroup: (id: number) =>
        set((state) => {
          state.selectedGroup = id;
        }),
      selectedPath: '',
      setSelectedPath: (path: string) =>
        set((state) => {
          state.selectedPath = path;
        }),
    })),
    { name: 'prices-store', version: 1 }
  )
);
