import { AppPages } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type AppStore = {
  activePage: AppPages;
  setActivePage: (page: AppPages) => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    immer((set) => ({
      activePage: AppPages.Prices,
      setActivePage: (page: AppPages) =>
        set((state) => {
          state.activePage = page;
        }),
    })),
    { name: 'appStore', version: 1 }
  )
);
