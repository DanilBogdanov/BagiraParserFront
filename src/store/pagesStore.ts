import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type PagesStore = {
  selectedCompanyId: number;
  setSelectedCompanyId: (id: number) => void;
};

export const usePagesStore = create<PagesStore>()(
  persist(
    immer((set) => ({
      selectedCompanyId: 1,
      setSelectedCompanyId: (id: number) =>
        set((state) => {
          state.selectedCompanyId = id;
        }),
    })),
    { name: 'pagesStore', version: 1 }
  )
);
