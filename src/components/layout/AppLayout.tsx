import { AppShell, AppShellMain } from '@mantine/core';
import AppHeader from './header/AppHeader';
import { useDisclosure } from '@mantine/hooks';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [burgerOpened, { toggle: toggleBurger }] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'xs',
          collapsed: { desktop: true, mobile: !burgerOpened },
        }}
      >
        <AppHeader
          isBurgerOpened={burgerOpened}
          toggleBurger={toggleBurger}
        ></AppHeader>
        <AppShellMain>{children}</AppShellMain>
      </AppShell>
    </>
  );
}
