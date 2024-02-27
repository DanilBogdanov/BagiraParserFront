import { useCompaniesQuery } from '@/queries/competitorsQuery';
import { useBagiraGoodQuery } from '@/queries/pricesQuery';
import { BagiraGood } from '@/types/prices';
import { Box, Group, LoadingOverlay, Table } from '@mantine/core';
import BagiraGoodTableRow from './BagiraGoodTableRow';
import { ParserCompany } from '@/types/competitors';
import AppPagination from '@/components/pagination/AppPagination';
import { usePricesStore } from '@/store/pricesStore';

type BagiraGoodTableProps = {
  parentId: number;
};

export default function BagiraGoodTable({ parentId }: BagiraGoodTableProps) {
  const perPage = usePricesStore((state) => state.perPage);
  const setPerPage = usePricesStore((state) => state.setPerPage);
  const activePage = usePricesStore((state) => state.activePage);
  const setActivePage = usePricesStore((state) => state.setActivePage);

  const {
    data: bagiraGoods,
    isSuccess: isBagiraGoodsSuccess,
    isLoading: isBagiraGoodsLoading,
  } = useBagiraGoodQuery({
    parentId,
    take: perPage,
    skip: perPage * (activePage - 1),
  });

  const { data: competitors, isSuccess: isCompetitorsSuccess } =
    useCompaniesQuery();

  const tableRows = (goods: BagiraGood[], competitors: ParserCompany[]) => {
    return goods.map((good, idx) => (
      <BagiraGoodTableRow
        key={good.id}
        good={good}
        idx={idx}
        competitors={competitors}
      />
    ));
  };

  return (
    <>
      <Box pos={'relative'}>
        <LoadingOverlay visible={isBagiraGoodsLoading} />
        {isCompetitorsSuccess && (
          <Table striped highlightOnHover withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={30}>#</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Price</Table.Th>
                {competitors.map((competitor) => (
                  <Table.Th key={competitor.id}>{competitor.name}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {isBagiraGoodsSuccess &&
                tableRows(bagiraGoods.result, competitors)}
            </Table.Tbody>
          </Table>
        )}
      </Box>
      <Group justify='end' m={'md'}>
        {isBagiraGoodsSuccess && (
          <AppPagination
            total={bagiraGoods.total}
            page={activePage}
            onPageChange={setActivePage}
            perPage={perPage}
            onPerPageChange={setPerPage}
          />
        )}
      </Group>
    </>
  );
}
