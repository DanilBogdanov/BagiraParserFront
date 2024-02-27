import { usePricesStore } from '@/store/pricesStore';
import { GoodMenu } from '@/types/prices';
import { NavLink } from '@mantine/core';

type GoodsMenuProps = {
  goodMenu: GoodMenu[];
};

export default function GoodsMenu({ goodMenu }: GoodsMenuProps) {
  const setSelectedGroup = usePricesStore((state) => state.setSelectedGroup);
  const selectedPath = usePricesStore((state) => state.selectedPath);
  const setSelectedPath = usePricesStore((state) => state.setSelectedPath);

  const getNavLinks = (menu: GoodMenu[]) =>
    menu.map((menuItem) => {
      const isActive = selectedPath.includes(`/${menuItem.id}/`);

      return (
        <NavLink
          mt={2}
          key={menuItem.id}
          label={menuItem.name}
          active={isActive}
          opened={isActive}
          variant='filled'
          onClick={() => {
            setSelectedGroup({ id: menuItem.id, name: menuItem.name });
            setSelectedPath(`${menuItem.path}${menuItem.id}/`);
          }}
        >
          {menuItem.children && getNavLinks(menuItem.children)}
        </NavLink>
      );
    });

  return getNavLinks(goodMenu);
}
