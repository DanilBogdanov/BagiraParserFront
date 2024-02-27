import { DEFAULT_PER_PAGE } from '@/constants';
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
  perPage: number;
  setPerPage: (perPage: number) => void;
  activePage: number;
  setActivePage: (page: number) => void;
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
      perPage: DEFAULT_PER_PAGE,
      setPerPage: (perPage: number) =>
        set((state) => {
          state.perPage = perPage;
        }),
      activePage: 1,
      setActivePage: (page: number) =>
        set((state) => {
          state.activePage = page;
        }),
    })),
    { name: 'prices-store', version: 1 }
  )
);
