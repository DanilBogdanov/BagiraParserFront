import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type Group = {
  id: number;
  name: string;
};

type PricesStore = {
  selectedGroup: Group | null;
  setSelectedGroup: (group: Group) => void;
  selectedPath: string;
  setSelectedPath: (path: string) => void;
};

export const usePricesStore = create<PricesStore>()(
  persist(
    immer((set) => ({
      selectedGroup: null,
      setSelectedGroup: (group: Group) =>
        set((state) => {
          state.selectedGroup = group;
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
