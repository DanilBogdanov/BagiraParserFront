import {
  Group,
  Button,
  Title,
  Image,
  Select,
  OptionsFilter,
  ComboboxItem,
  LoadingOverlay,
  Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useBagiraGoodNamesQuery } from '@/queries/competitorsQuery';
import { ParserGood } from '@/types/competitors';

type SetLinkFormProps = {
  good: ParserGood;
  onSubmit: (good: ParserGood, goodId: number | null) => void;
};

export default function SetLinkForm({ good, onSubmit }: SetLinkFormProps) {
  const {
    data: names,
    isSuccess: isSuccessNames,
    isLoading: isNamesLoading,
  } = useBagiraGoodNamesQuery();

  const form = useForm({
    initialValues: {
      goodId: good.goodId ? good.goodId.toString() : null,
    },
  });

  const optionsFilter: OptionsFilter = ({ options, search, limit }) => {
    const splittedSearch = search.toLowerCase().trim().split(' ');
    const results: ComboboxItem[] = [];

    if (search) {
      for (let i = 0; i < options.length; i += 1) {
        if (results.length === limit) {
          break;
        }

        const item = options[i] as ComboboxItem;
        const words = item.label.toLowerCase().trim().split(' ');
        const wordsHasSearch = splittedSearch.every((searchWord) =>
          words.some((word) => word.includes(searchWord))
        );

        if (wordsHasSearch) {
          results.push(item);
        }
      }
    }

    return results;
  };

  return (
    <Group gap={0}>
      {good.imgUrl && (
        <Group justify='center'>
          {good.imgUrl && (
            <Image w={250} h={250} radius={'md'} src={good.imgUrl} />
          )}
        </Group>
      )}
      <Stack w={400}>
        <Title order={5} mb={'md'}>
          {good.brand}
        </Title>
        <Title order={6} mb={'md'}>
          {`${good.name} ${good.weight}`}
        </Title>
        <form
          onSubmit={form.onSubmit((values) =>
            onSubmit(good, values.goodId ? +values.goodId : null)
          )}
        >
          <LoadingOverlay visible={isNamesLoading} />
          {isSuccessNames && (
            <Select
              searchable
              clearable
              filter={optionsFilter}
              placeholder='not linked'
              label='Select goods'
              limit={10}
              data={names.map((name) => ({
                value: name.id.toString(),
                label: name.name,
              }))}
              {...form.getInputProps('goodId')}
            />
          )}
          <Group justify='flex-end' mt={'md'}>
            <Button type='submit'>Save</Button>
          </Group>
        </form>
      </Stack>
    </Group>
  );
}
