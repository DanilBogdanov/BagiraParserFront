import { useParserGoodsQuery } from '@/queries/competitorsQuery';
import { LoadingOverlay, Table } from '@mantine/core';
import ParserGoodTableRow from './ParserGoodTableRow';

type ParserGoodTableProps = {
  companyId: number;
  brand: string;
};

export default function ParserGoodTable({
  companyId,
  brand,
}: ParserGoodTableProps) {
  const { data: goods, isLoading: isGoodsLoading } = useParserGoodsQuery({
    parserCompanyId: companyId,
    brand: brand,
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
    </>
  );
}
