import {
  AppShellMain,
  AppShellNavbar,
  AppShellSection,
  Container,
  NavLink,
  ScrollArea,
  Skeleton,
} from '@mantine/core';
import { usePagesStore } from '@/store/pagesStore';
import PagesTable from '@/components/tables/PagesTable';
import {
  useCompaniesQuery,
  useCreatePageMutation,
  useDeletePageMutation,
  usePagesQuery,
  useStatusPageMutation,
  useUpdatePageMutation,
} from '@/queries/pagesQueries';

export default function PagesPage() {
  const { selectedCompanyId, setSelectedCompanyId } = usePagesStore();
  const { data: parserCompanies, isSuccess, isLoading } = useCompaniesQuery();

  const { data: parserPages, isLoading: pagesIsLoading } =
    usePagesQuery(selectedCompanyId);

  const statusPageMutation = useStatusPageMutation(selectedCompanyId);
  const createPageMutation = useCreatePageMutation(selectedCompanyId);
  const updatePageMutation = useUpdatePageMutation(selectedCompanyId);
  const deletePageMutation = useDeletePageMutation(selectedCompanyId);

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
              add: (name, url) =>
                createPageMutation.mutate({
                  id: 0,
                  name,
                  url,
                  parserCompanyId: selectedCompanyId,
                  isActive: true,
                }),
              changeStatus: (page, isActive) =>
                statusPageMutation.mutate({
                  parserCompanyId: page.parserCompanyId,
                  pageId: page.id,
                  isActive,
                }),
              edit: updatePageMutation.mutate,
              delete: deletePageMutation.mutate,
            }}
          />
        </Container>
      </AppShellMain>
    </>
  );
}
