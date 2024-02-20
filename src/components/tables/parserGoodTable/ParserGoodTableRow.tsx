import { ParserGood } from '@/types/competitors';
import { ActionIcon, Badge, Table } from '@mantine/core';
import { IconLink } from '@tabler/icons-react';

type ParserGoodTableRow = {
  idx: number;
  good: ParserGood;
  onSetLink: (good: ParserGood) => void;
};

export default function ParserGoodTableRow({
  idx,
  good,
  onSetLink,
}: ParserGoodTableRow) {
  return (
    <Table.Tr>
      <Table.Td>{idx}</Table.Td>
      <Table.Td>
        <ActionIcon
          variant='subtle'
          color={good.goodId ? 'green' : 'red'}
          onClick={() => onSetLink(good)}
        >
          <IconLink />
        </ActionIcon>
      </Table.Td>
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
      <Table.Td>{new Date(good.lastUpdated).toLocaleString()}</Table.Td>
    </Table.Tr>
  );
}
