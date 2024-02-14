import { AppShell } from '@mantine/core';
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
          width: { xs: 200, md: 300 },
          breakpoint: 'xs',
          collapsed: { desktop: false, mobile: false },
        }}
      >
        <AppHeader
          isBurgerOpened={burgerOpened}
          toggleBurger={toggleBurger}
        ></AppHeader>
        {children}
      </AppShell>
    </>
  );
}
