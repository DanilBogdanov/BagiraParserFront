import {
  AppShellHeader,
  AppShellNavbar,
  Burger,
  Flex,
  Group,
} from '@mantine/core';
import AppLogo from './AppLogo';
import AppBar from './appBar/AppBar';

type AppHeaderProps = {
  isBurgerOpened: boolean;
  toggleBurger: () => void;
};

export default function AppHeader({
  isBurgerOpened,
  toggleBurger,
}: AppHeaderProps) {
  return (
    <>
      <AppShellHeader>
        <Group h='100%' px='md'>
          <Group h='100%' justify='space-between' style={{ flex: 1 }}>
            <AppLogo />
            <Flex h='100%' visibleFrom='xs'>
              <AppBar />
            </Flex>
          </Group>
          <Burger
            opened={isBurgerOpened}
            onClick={toggleBurger}
            hiddenFrom='xs'
          />
        </Group>
      </AppShellHeader>
      <AppShellNavbar>
        <AppBar />
      </AppShellNavbar>
    </>
  );
}
