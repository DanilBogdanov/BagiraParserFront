import {
  AppShellMain,
  AppShellNavbar,
  AppShellSection,
  Container,
  NavLink,
  ScrollArea,
  Skeleton,
} from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getParserCompanies } from '@/api/competitorsApi';
import { getParserPages, setParserPageStatus } from '@/api/parserPagesApi';
import { usePagesStore } from '@/store/pagesStore';
import PagesTable from '@/components/tables/PagesTable';

export default function PagesPage() {
  const queryClient = useQueryClient();
  const { selectedCompanyId, setSelectedCompanyId } = usePagesStore();
  const {
    data: parserCompanies,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['parser-companies'],
    queryFn: getParserCompanies,
    staleTime: 1000 * 60 * 10,
  });

  const { data: parserPages, isLoading: pagesIsLoading } = useQuery({
    queryKey: ['parser-pages', selectedCompanyId],
    enabled: !!selectedCompanyId,
    staleTime: 1000 * 60 * 10,
    queryFn: selectedCompanyId
      ? () => getParserPages(selectedCompanyId)
      : undefined,
  });

  const statusPageMutation = useMutation({
    mutationFn: ({
      parserCompanyId,
      pageId,
      isActive,
    }: {
      parserCompanyId: number;
      pageId: number;
      isActive: boolean;
    }) => setParserPageStatus(parserCompanyId, pageId, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['parser-pages', selectedCompanyId],
      });
    },
  });

  return (
    <>
      <AppShellNavbar>
        <AppShellSection grow component={ScrollArea}>
          {isLoading && (
            <>
              <Skeleton height={30} mt={10}></Skeleton>
              <Skeleton height={30} mt={10}></Skeleton>
              <Skeleton></Skeleton>
            </>
          )}
          {isSuccess &&
            parserCompanies.map((company) => (
              <NavLink
                key={company.id}
                label={company.name}
                onClick={() => setSelectedCompanyId(company.id)}
                active={company.id === selectedCompanyId}
                variant='filled'
              />
            ))}
        </AppShellSection>
      </AppShellNavbar>
      <AppShellMain>
        <Container>
          <PagesTable
            pages={parserPages}
            isLoading={pagesIsLoading}
            actions={{
              add: undefined,
              changeStatus: (page, isActive) =>
                statusPageMutation.mutate({
                  parserCompanyId: page.parserCompanyId,
                  pageId: page.id,
                  isActive,
                }),
              edit: undefined,
              delete: undefined,
            }}
          />
        </Container>
      </AppShellMain>
    </>
  );
}
