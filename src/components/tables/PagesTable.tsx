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
    add?: (name: string, url: string) => void;
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
    openPageModal({
      title: 'Add Page',
      onSubmit: (name, url) => actions.add && actions.add(name, url),
    });

  const openEditPageModal = (page: ParserPage) =>
    openPageModal({
      title: 'Edit Page',
      page,
      onSubmit: (name, url) =>
        actions.edit && actions.edit({ ...page, name, url }),
    });

  const openPageModal = ({
    title,
    page,
    onSubmit,
  }: {
    title: string;
    page?: ParserPage;
    onSubmit: (name: string, url: string) => void;
  }) =>
    modals.open({
      title,
      children: (
        <PagesForm
          page={page}
          onSubmit={(name, url) => {
            onSubmit(name, url);
            modals.closeAll();
          }}
        />
      ),
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
