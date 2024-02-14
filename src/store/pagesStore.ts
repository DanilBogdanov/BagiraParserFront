import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type PagesStore = {
  selectedCompanyId: number | null;
  setSelectedCompanyId: (id: number) => void;
};

export const usePagesStore = create<PagesStore>()(
  persist(
    immer((set) => ({
      selectedCompanyId: null,
      setSelectedCompanyId: (id: number) =>
        set((state) => {
          state.selectedCompanyId = id;
        }),
    })),
    { name: 'pagesStore', version: 1 }
  )
);
