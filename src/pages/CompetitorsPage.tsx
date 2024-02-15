import {
  useCompaniesQuery,
  useParserBrandsQuery,
} from '@/queries/competitorsQuery';
import { useCompetitorsStore } from '@/store/competitorsStore';
import { AppShell, NavLink, ScrollArea, Select, Skeleton } from '@mantine/core';

export default function CompetitorsPage() {
  const {
    selectedCompanyId,
    setSelectedCompanyId,
    selectedBrand,
    setSelectedBrand,
  } = useCompetitorsStore();

  const {
    data: companies,
    isSuccess: isCompaniesSuccess,
    isLoading: isCompaniesLoading,
  } = useCompaniesQuery();

  const {
    data: brands,
    isSuccess: isBrandsSuccess,
    isLoading: isBrandsLoading,
  } = useParserBrandsQuery(selectedCompanyId);

  return (
    <>
      <AppShell.Navbar>
        <AppShell.Section>
          {isCompaniesLoading && <Skeleton height={40}></Skeleton>}
          {isCompaniesSuccess && (
            <Select
              fw={700}
              value={selectedCompanyId.toString()}
              onChange={(id) => id && setSelectedCompanyId(+id)}
              data={companies.map((company) => ({
                value: company.id.toString(),
                label: company.name,
              }))}
            />
          )}
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          {isBrandsLoading &&
            Array(10)
              .fill('')
              .map((_, idx) => <Skeleton key={idx} height={30} mt={5} />)}
          {isBrandsSuccess &&
            brands.map((brand) => (
              <NavLink
                key={brand}
                label={brand}
                onClick={() => setSelectedBrand(brand)}
                active={brand === selectedBrand}
                variant='filled'
              />
            ))}
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main></AppShell.Main>
    </>
  );
}
