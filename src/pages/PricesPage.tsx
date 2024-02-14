import { AppShellAside, AppShellSection, ScrollArea } from '@mantine/core';

export default function PricesPage() {
  return (
    <AppShellAside style={{ left: 0, right: 'unset' }}>
      <AppShellSection grow component={ScrollArea}></AppShellSection>
    </AppShellAside>
  );
}
