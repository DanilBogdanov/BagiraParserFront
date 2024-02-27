import {
  AppShellMain,
  AppShellNavbar,
  AppShellSection,
  ScrollArea,
  Skeleton,
  Title,
} from '@mantine/core';
import { useGoodMenuQuery } from '@/queries/pricesQuery';
import GoodsMenu from '@/components/menu/GoodsMenu';
import { usePricesStore } from '@/store/pricesStore';
import { BagiraGoodTable } from '@/components/tables';

export default function PricesPage() {
  const selectedGroup = usePricesStore((state) => state.selectedGroup);

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
      <AppShellMain>
        <Title order={3} m={'md'}>
          {selectedGroup?.name}
        </Title>
        {selectedGroup && <BagiraGoodTable parentId={selectedGroup.id} />}
      </AppShellMain>
    </>
  );
}
