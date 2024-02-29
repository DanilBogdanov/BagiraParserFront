import { useEffect, useState } from 'react';
import { Box, Group, LoadingOverlay, Table } from '@mantine/core';
import AppPagination from '@/components/pagination/AppPagination';
import ParserGoodTableRow from './ParserGoodTableRow';
import SetLinkForm from '@/components/forms/SetLinkForm';
import {
  useParserGoodsQuery,
  useSetLinkToBagiraMutation,
} from '@/queries/competitorsQuery';
import { useCompetitorsStore } from '@/store/competitorsStore';
import { modals } from '@mantine/modals';
import { ParserGood } from '@/types/competitors';

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
  const setLinkToBagira = useSetLinkToBagiraMutation();

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

  const openParserGoodModal = (good: ParserGood) => {
    modals.open({
      title: 'Set link to bagira good',
      children: (
        <SetLinkForm
          good={good}
          onSubmit={(parserGood, goodId) => {
            setLinkToBagira.mutate({ parserGood, goodId });
            modals.closeAll();
          }}
        />
      ),
      centered: true,
      size: 'auto',
    });
  };

  const tableRows = goods?.result.map((good, idx) => (
    <ParserGoodTableRow
      key={good.id}
      idx={idx + 1}
      good={good}
      onSetLink={openParserGoodModal}
    />
  ));

  return (
    <>
      <Box pos={'relative'}>
        <LoadingOverlay visible={isGoodsLoading} />
        <Table striped highlightOnHover withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={30}>#</Table.Th>
              <Table.Th w={50}>Link</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Updated</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{tableRows}</Table.Tbody>
        </Table>
      </Box>
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
