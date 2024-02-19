import { DEFAULT_PER_PAGE } from '@/constants';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type CompetitorsStore = {
  selectedCompanyId: number;
  setSelectedCompanyId: (id: number) => void;
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;
  perPage: number;
  setPerPage: (perPage: number) => void;
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
      setSelectedBrand: (brand: string | null) =>
        set((state) => {
          state.selectedBrand = brand;
        }),
      perPage: DEFAULT_PER_PAGE,
      setPerPage: (perPage: number) =>
        set((state) => {
          state.perPage = perPage;
        }),
    })),
    { name: 'competitorsStore', version: 1 }
  )
);
