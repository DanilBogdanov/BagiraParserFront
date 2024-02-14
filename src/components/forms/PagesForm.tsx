import { ParserPage } from '@/types';
import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

type PagesFormProps = {
  page?: ParserPage;
  onSubmit: (name: string, url: string) => void;
};

export default function PagesForm({ page, onSubmit }: PagesFormProps) {
  const form = useForm({
    initialValues: {
      name: page?.name ?? '',
      url: page?.url ?? '',
    },

    validate: {
      name: (value) => (value ? null : 'Обязательное поле'),
      url: (value) => (value ? null : 'Обязательное поле'),
    },
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) => onSubmit(values.name, values.url))}
      >
        <TextInput
          withAsterisk
          label='Name'
          placeholder='Enter name'
          {...form.getInputProps('name')}
        />
        <TextInput
          mt={'sm'}
          withAsterisk
          label='Url'
          placeholder='Enter url'
          {...form.getInputProps('url')}
        />
        <Group justify='flex-end' mt={'md'}>
          <Button type='submit'>Save</Button>
        </Group>
      </form>
    </>
  );
}
