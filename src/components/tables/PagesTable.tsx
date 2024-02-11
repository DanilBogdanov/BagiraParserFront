import {
  ActionIcon,
  Button,
  Group,
  LoadingOverlay,
  Switch,
  Table,
} from '@mantine/core';
import { ParserPage } from '@/types';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import PagesForm from '../forms/PagesForm';

type PagesTableProps = {
  pages?: ParserPage[];
  isLoading: boolean;
  actions: {
    changeStatus?: (page: ParserPage, isActive: boolean) => void;
    edit?: (page: ParserPage) => void;
    delete?: (page: ParserPage) => void;
  };
};

export default function PagesTable({
  pages,
  isLoading,
  actions,
}: PagesTableProps) {
  const tableRows = pages?.map((page, idx) => (
    <Table.Tr key={page.id}>
      <Table.Td>{idx + 1}</Table.Td>
      <Table.Td>
        <Switch
          checked={page.isActive}
          onChange={(event) =>
            actions.changeStatus &&
            actions.changeStatus(page, event.currentTarget.checked)
          }
        />
      </Table.Td>
      <Table.Td>{page.name}</Table.Td>
      <Table.Td>{page.url}</Table.Td>
      <Table.Td>
        <Group gap={'xs'}>
          <ActionIcon
            variant='subtle'
            color='green'
            onClick={() => openEditPageModal(page)}
          >
            <IconPencil />
          </ActionIcon>
          <ActionIcon
            variant='subtle'
            color='red'
            onClick={() => actions.delete && actions.delete(page)}
          >
            <IconTrash />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const openNewPageModal = () =>
    modals.openConfirmModal({
      title: 'Add Page',
      children: <PagesForm />,
      labels: { confirm: 'Create', cancel: 'Cancel' },
      centered: true,
    });

  const openEditPageModal = (page: ParserPage) =>
    modals.openConfirmModal({
      title: 'Edit Page',
      children: <PagesForm page={page} />,
      labels: { confirm: 'Edit', cancel: 'Cancel' },
      centered: true,
    });

  return (
    <>
      <Group justify='flex-end'>
        <Button variant='filled' onClick={() => openNewPageModal()}>
          Add
        </Button>
      </Group>
      <Table striped highlightOnHover pos={'relative'} withColumnBorders>
        <LoadingOverlay visible={isLoading} />
        <Table.Thead>
          <Table.Th w={50}>#</Table.Th>
          <Table.Th w={50}>Active</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Url</Table.Th>
          <Table.Th w={100}>Actions</Table.Th>
        </Table.Thead>
        <Table.Tbody>{tableRows}</Table.Tbody>
      </Table>
    </>
  );
}
