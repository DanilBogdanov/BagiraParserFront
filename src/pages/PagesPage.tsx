import {
  AppShellMain,
  AppShellNavbar,
  AppShellSection,
  Container,
  NavLink,
  ScrollArea,
  Skeleton,
} from '@mantine/core';
import PagesTable from '@/components/tables/PagesTable';
import { usePagesStore } from '@/store/pagesStore';
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

  const {
    data: companies,
    isSuccess: isCompaniesSuccess,
    isLoading: isCompaniesLoading,
  } = useCompaniesQuery();
  const { data: pages, isLoading: isPagesLoading } =
    usePagesQuery(selectedCompanyId);

  const statusPageMutation = useStatusPageMutation(selectedCompanyId);
  const createPageMutation = useCreatePageMutation(selectedCompanyId);
  const updatePageMutation = useUpdatePageMutation(selectedCompanyId);
  const deletePageMutation = useDeletePageMutation(selectedCompanyId);

  return (
    <>
      <AppShellNavbar>
        <AppShellSection grow component={ScrollArea}>
          {isCompaniesLoading && (
            <>
              <Skeleton height={30} mt={10}></Skeleton>
              <Skeleton height={30} mt={10}></Skeleton>
              <Skeleton></Skeleton>
            </>
          )}
          {isCompaniesSuccess &&
            companies.map((company) => (
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
            pages={pages}
            isLoading={isPagesLoading}
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
