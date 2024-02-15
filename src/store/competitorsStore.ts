import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type CompetitorsStore = {
  selectedCompanyId: number;
  setSelectedCompanyId: (id: number) => void;
  selectedBrand: string | null;
  setSelectedBrand: (brand: string) => void;
};

export const useCompetitorsStore = create<CompetitorsStore>()(
  persist(
    immer((set) => ({
      selectedCompanyId: 1,
      setSelectedCompanyId: (id: number) =>
        set((state) => {
          state.selectedCompanyId = id;
        }),
      selectedBrand: null,
      setSelectedBrand: (brand: string) =>
        set((state) => {
          state.selectedBrand = brand;
        }),
    })),
    { name: 'competitorsStore', version: 1 }
  )
);
