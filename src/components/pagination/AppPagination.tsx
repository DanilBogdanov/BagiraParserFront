import { PER_PAGE_VALUES } from '@/constants';
import { Pagination, SegmentedControl } from '@mantine/core';

type AppPaginationProps = {
  total: number;
  page: number;
  onPageChange: (page: number) => void;
  perPage: number;
  onPerPageChange: (perPage: number) => void;
};

export default function AppPagination({
  total,
  page,
  onPageChange,
  perPage,
  onPerPageChange,
}: AppPaginationProps) {
  return (
    <>
      {'Total:'} {total}
      <Pagination
        value={page}
        total={Math.ceil(total / perPage)}
        onChange={onPageChange}
        withEdges
      />
      <SegmentedControl
        value={perPage.toString()}
        data={PER_PAGE_VALUES}
        onChange={(value) => onPerPageChange(+value)}
        color='blue'
      />
    </>
  );
}
