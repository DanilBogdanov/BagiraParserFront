import { useEffect, useState } from 'react';
import { Group, LoadingOverlay, Table } from '@mantine/core';
import AppPagination from '@/components/pagination/AppPagination';
import ParserGoodTableRow from './ParserGoodTableRow';
import { useParserGoodsQuery } from '@/queries/competitorsQuery';
import { useCompetitorsStore } from '@/store/competitorsStore';

type ParserGoodTableProps = {
  companyId: number;
  brand: string;
};

export default function ParserGoodTable({
  companyId,
  brand,
}: ParserGoodTableProps) {
  const perPage = useCompetitorsStore((state) => state.perPage);
  const setPerPage = useCompetitorsStore((state) => state.setPerPage);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => setActivePage(1), [brand]);

  const {
    data: goods,
    isSuccess: isGoodsSuccess,
    isLoading: isGoodsLoading,
  } = useParserGoodsQuery({
    parserCompanyId: companyId,
    brand: brand,
    take: perPage,
    skip: perPage * (activePage - 1),
  });

  const tableRows = goods?.result.map((good, idx) => (
    <ParserGoodTableRow key={good.id} idx={idx + 1} good={good} />
  ));

  return (
    <>
      <Table striped highlightOnHover pos={'relative'} withColumnBorders>
        <LoadingOverlay visible={isGoodsLoading} />
        <Table.Thead>
          <Table.Th w={50}>#</Table.Th>
          <Table.Th w={50}>Link</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Updated</Table.Th>
        </Table.Thead>
        <Table.Tbody>{tableRows}</Table.Tbody>
      </Table>
      <Group justify='end' m={'md'}>
        {isGoodsSuccess && (
          <AppPagination
            total={goods.total}
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
