import { NavLink } from '@mantine/core';
import { useAppStore } from '@/store/store';
import { AppPages } from '@/types';

export default function AppBar() {
  const activePage = useAppStore((state) => state.activePage);
  const setActivePage = useAppStore((state) => state.setActivePage);

  return (
    <>
      <NavLink
        label='Prices'
        active={activePage === AppPages.Prices}
        onClick={() => setActivePage(AppPages.Prices)}
      />
      <NavLink
        label='Competitors'
        active={activePage === AppPages.Competitors}
        onClick={() => setActivePage(AppPages.Competitors)}
      />
      <NavLink
        label='Pages'
        active={activePage === AppPages.Pages}
        onClick={() => setActivePage(AppPages.Pages)}
      />
    </>
  );
}
