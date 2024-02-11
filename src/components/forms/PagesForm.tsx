import { ParserPage } from '@/types';
import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

type PagesFormProps = {
  page?: ParserPage;
};

export default function PagesForm({ page }: PagesFormProps) {
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
      <form>
        <TextInput
          withAsterisk
          label='Name'
          placeholder='Enter name'
          {...form.getInputProps('name')}
        />
        <TextInput
          withAsterisk
          label='Url'
          placeholder='Enter url'
          {...form.getInputProps('url')}
        />
        <Button type='submit'></Button>
      </form>
    </>
  );
}
