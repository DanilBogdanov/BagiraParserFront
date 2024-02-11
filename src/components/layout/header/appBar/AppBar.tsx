import { NavLink } from '@mantine/core';
import { useAppStore } from '@/store/appStore';
import { AppPages } from '@/types';

type AppBarProps = {
  onSelect?: (page: AppPages) => void;
};

export default function AppBar({ onSelect }: AppBarProps) {
  const activePage = useAppStore((state) => state.activePage);
  const setActivePage = useAppStore((state) => state.setActivePage);

  const onLinkClick = (page: AppPages) => {
    setActivePage(page);
    onSelect && onSelect(page);
  };

  return (
    <>
      {Object.values(AppPages).map((page) => (
        <NavLink
          key={page}
          label={page}
          active={activePage === page}
          onClick={() => onLinkClick(page)}
          variant='filled'
        />
      ))}
    </>
  );
}
