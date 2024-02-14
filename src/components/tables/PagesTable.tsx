import { Button, Group, LoadingOverlay, Table, Text } from '@mantine/core';
import PagesForm from '../forms/PagesForm';
import TableRow from './TableRow';
import { modals } from '@mantine/modals';
import { ParserPage } from '@/types';

type PagesTableProps = {
  pages?: ParserPage[];
  isLoading: boolean;
  actions: {
    add: (name: string, url: string) => void;
    changeStatus: (page: ParserPage, isActive: boolean) => void;
    edit: (page: ParserPage) => void;
    delete: (page: ParserPage) => void;
  };
};

export default function PagesTable({
  pages,
  isLoading,
  actions,
}: PagesTableProps) {
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

  const deletePageModal = (page: ParserPage) =>
    modals.openConfirmModal({
      title: 'Удалить страницу?',
      children: <Text size='sm'>{page.name}</Text>,
      centered: true,
      labels: { confirm: 'Удалить', cancel: 'Отмена' },
      confirmProps: { color: 'red' },
      onConfirm: () => actions.delete(page),
    });

  const tableRows = pages?.map((page, idx) => (
    <TableRow
      key={page.id}
      idx={idx + 1}
      page={page}
      onChangeStatus={actions.changeStatus}
      onEdit={(page) => openEditPageModal(page)}
      onDelete={(page) => deletePageModal(page)}
    />
  ));

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
          <Table.Th w={60}>Active</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Url</Table.Th>
          <Table.Th w={100}>Actions</Table.Th>
        </Table.Thead>
        <Table.Tbody>{tableRows}</Table.Tbody>
      </Table>
    </>
  );
}
