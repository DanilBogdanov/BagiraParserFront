import { ParserGood } from '@/types/competitors';
import { Badge, Table } from '@mantine/core';

type ParserGoodTableRow = {
  idx: number;
  good: ParserGood;
};

export default function ParserGoodTableRow({ idx, good }: ParserGoodTableRow) {
  return (
    <Table.Tr>
      <Table.Td>{idx}</Table.Td>
      <Table.Td>{good.goodId}</Table.Td>
      <Table.Td>{`${good.name} ${good.weight}`}</Table.Td>
      <Table.Td>
        {good.salePrice ? (
          <>
            {good.salePrice}
            <Badge variant='light' color='red' td={'line-through'}>
              {good.price}
            </Badge>
          </>
        ) : (
          good.price
        )}
      </Table.Td>
    </Table.Tr>
  );
}
