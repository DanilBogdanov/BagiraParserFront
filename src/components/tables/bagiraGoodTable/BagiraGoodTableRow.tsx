import { ParserCompany } from '@/types/competitors';
import { BagiraGood } from '@/types/prices';
import { Badge, Group, Text, Table, Tooltip, ThemeIcon } from '@mantine/core';
import { IconArrowDown, IconArrowUp, IconPoint } from '@tabler/icons-react';

type BagiraGoodTableRowProps = {
  good: BagiraGood;
  idx: number;
  competitors: ParserCompany[];
};

export default function BagiraGoodTableRow({
  good,
  idx,
  competitors,
}: BagiraGoodTableRowProps) {
  const competitorPrice = (competitorId: number) => {
    const parserGood = good.parserGoods.find(
      (parserGood) => parserGood.parserCompanyId === competitorId
    );

    if (parserGood) {
      const priceDif = parserGood.salePrice
        ? parserGood.salePrice - good.price
        : parserGood.price - good.price;

      const icon =
        priceDif === 0 ? (
          <IconPoint />
        ) : priceDif > 0 ? (
          <IconArrowUp />
        ) : (
          <IconArrowDown />
        );

      const color = priceDif === 0 ? 'gray' : priceDif > 0 ? 'green' : 'red';

      const price = parserGood.salePrice ? (
        <>
          {parserGood.salePrice}
          <Badge variant='light' color='red' td={'line-through'}>
            {parserGood.price}
          </Badge>
        </>
      ) : (
        parserGood.price
      );

      return (
        <Table.Td key={competitorId}>
          <Group align='center'>
            <Tooltip label={priceDif} openDelay={500} position='bottom'>
              <ThemeIcon size={'sm'} variant='subtle' color={color}>
                {icon}
              </ThemeIcon>
            </Tooltip>
            <Tooltip
              label={new Date(parserGood.lastUpdated).toLocaleString()}
              openDelay={500}
              position='bottom'
            >
              <Text size='sm'>{price}</Text>
            </Tooltip>
          </Group>
        </Table.Td>
      );
    } else {
      return <Table.Td key={competitorId}>-</Table.Td>;
    }
  };

  return (
    <Table.Tr key={good.id}>
      <Table.Td>{idx + 1}</Table.Td>
      <Table.Td>{good.name}</Table.Td>
      <Table.Td>{good.price}</Table.Td>
      {competitors.map((competitor) => competitorPrice(competitor.id))}
    </Table.Tr>
  );
}
