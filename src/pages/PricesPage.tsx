import {
  AppShellMain,
  AppShellNavbar,
  AppShellSection,
  ScrollArea,
  Skeleton,
} from '@mantine/core';
import { useGoodMenuQuery } from '@/queries/pricesQuery';
import GoodsMenu from '@/components/menu/GoodsMenu';

export default function PricesPage() {
  const {
    data: goodMenu,
    isLoading: isMenuLoading,
    isSuccess: isMenuSuccess,
  } = useGoodMenuQuery();

  return (
    <>
      <AppShellNavbar>
        <AppShellSection grow component={ScrollArea}>
          {isMenuLoading &&
            Array(10)
              .fill('')
              .map((_, idx) => <Skeleton key={idx} height={30} mt={5} />)}
          {isMenuSuccess && <GoodsMenu goodMenu={goodMenu} />}
        </AppShellSection>
      </AppShellNavbar>
      <AppShellMain></AppShellMain>
    </>
  );
}
