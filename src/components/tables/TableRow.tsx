import { Table, Switch, Group, ActionIcon } from '@mantine/core';
import { ParserPage } from '@/types';
import { IconPencil, IconTrash } from '@tabler/icons-react';

type TableRowProps = {
  idx: number;
  page: ParserPage;
  onEdit: (page: ParserPage) => void;
  onDelete: (page: ParserPage) => void;
  onChangeStatus: (page: ParserPage, isActive: boolean) => void;
};

export default function TableRow({
  idx,
  page,
  onEdit,
  onDelete,
  onChangeStatus,
}: TableRowProps) {
  return (
    <Table.Tr>
      <Table.Td>{idx}</Table.Td>
      <Table.Td>
        <Switch
          checked={page.isActive}
          onChange={(event) =>
            onChangeStatus(page, event.currentTarget.checked)
          }
          onLabel='ON'
          offLabel='OFF'
        />
      </Table.Td>
      <Table.Td>{page.name}</Table.Td>
      <Table.Td>{page.url}</Table.Td>
      <Table.Td>
        <Group gap={'xs'}>
          <ActionIcon
            variant='subtle'
            color='green'
            onClick={() => onEdit(page)}
          >
            <IconPencil />
          </ActionIcon>
          <ActionIcon
            variant='subtle'
            color='red'
            onClick={() => onDelete(page)}
          >
            <IconTrash />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
}
