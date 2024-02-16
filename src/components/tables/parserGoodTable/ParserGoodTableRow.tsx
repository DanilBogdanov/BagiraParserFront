import { ParserGood } from '@/types/competitors';
import { Table } from '@mantine/core';

type ParserGoodTableRow = {
  idx: number;
  good: ParserGood;
};

export default function ParserGoodTableRow({ idx, good }: ParserGoodTableRow) {
  return (
    <Table.Tr>
      <Table.Td>{idx}</Table.Td>
      <Table.Td>{good.goodId}</Table.Td>
      <Table.Td>{good.name}</Table.Td>
      <Table.Td>
        {good.price}/{good.salePrice}
      </Table.Td>
    </Table.Tr>
  );
}
